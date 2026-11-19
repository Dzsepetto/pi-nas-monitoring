
# ===== LOGGING =====

function Initialize-DeployLog {
    param([string]$Name, [string]$ScriptsRoot)

    $logDir = Join-Path $ScriptsRoot "logs"
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null

    $script:LogFile = Join-Path $logDir "$Name-deploy.log"

    Set-Content -LiteralPath $script:LogFile -Value "" -Encoding UTF8
}

function Write-DeployLog {
    param(
        [string]$Message,
        [string]$Level = "INFO"
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$timestamp] [$Level] $Message"

    Write-Host $line
    Add-Content -LiteralPath $script:LogFile -Value $line -Encoding UTF8
}

# ===== CONFIGURATION =====

function Read-DeployConfig {
    param([string]$Path)

    if (!(Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Configuration file not found: $Path"
    }

    $config = @{}

    foreach ($line in Get-Content -LiteralPath $Path) {
        $line = $line.Trim()

        if (!$line -or $line.StartsWith("#")) {
            continue
        }

        $parts = $line -split "=", 2

        if ($parts.Count -ne 2) {
            throw "Invalid configuration line."
        }

        $config[$parts[0].Trim()] = $parts[1].Trim()
    }

    return $config
}

# ===== COMMAND EXECUTION =====

function Invoke-DeployCommand {
    param(
        [string]$Command,
        [string[]]$Arguments
    )

    Write-DeployLog "Executing $Command"

    $previousPreference = $ErrorActionPreference

    try {
        $ErrorActionPreference = "Continue"

        & $Command @Arguments 2>&1 | ForEach-Object {
            $line = $_.ToString()
            Write-Host $line
            Add-Content -LiteralPath $script:LogFile -Value $line -Encoding UTF8
        }

        $exitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $previousPreference
    }

    if ($exitCode -ne 0) {
        throw "$Command failed with exit code $exitCode"
    }
}

# ===== VALIDATION =====

function Assert-DeployFiles {
    param(
        [string]$Source,
        [string]$Script,
        [string]$RequiredFile
    )

    if (!(Test-Path -LiteralPath $Source -PathType Container)) {
        throw "Source directory not found: $Source"
    }

    if (!(Test-Path -LiteralPath $Script -PathType Leaf)) {
        throw "Deploy script not found: $Script"
    }

    if ($RequiredFile) {
        $requiredPath = Join-Path $Source $RequiredFile

        if (!(Test-Path -LiteralPath $requiredPath -PathType Leaf)) {
            throw "Required file not found: $requiredPath"
        }
    }
    elseif (!(Get-ChildItem -LiteralPath $Source -Force |
              Select-Object -First 1)) {
        throw "Source directory is empty."
    }
}

# ===== LINUX SCRIPT CONVERSION =====

function Convert-ToLinuxScript {
    param([string]$Source)

    $tempFile = Join-Path ([System.IO.Path]::GetTempPath()) (
        [guid]::NewGuid().ToString() + ".sh"
    )

    $content = [System.IO.File]::ReadAllText($Source)
    $content = $content -replace "`r`n", "`n"
    $content = $content -replace "`r", "`n"

    $utf8 = New-Object System.Text.UTF8Encoding($false)

    [System.IO.File]::WriteAllText(
        $tempFile,
        $content,
        $utf8
    )

    return $tempFile
}

# ===== SSH / SCP =====

function Test-DeployConnection {
    param([string]$Target)

    Write-DeployLog "Checking SSH connection..."

    Invoke-DeployCommand -Command "ssh" -Arguments @(
        "-o", "ConnectTimeout=10",
        $Target,
        "echo SSH_OK"
    )
}

function Send-DeployDirectory {
    param(
        [string]$Target,
        [string]$LocalPath,
        [string]$RemotePath
    )

    Write-DeployLog "Preparing remote directory..."

    Invoke-DeployCommand -Command "ssh" -Arguments @(
        $Target,
        "mkdir -p '$RemotePath' && find '$RemotePath' -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +"
    )

    Write-DeployLog "Uploading directory..."

    $source = Join-Path $LocalPath "."

    Invoke-DeployCommand -Command "scp" -Arguments @(
        "-r",
        $source,
        "${Target}:${RemotePath}/"
    )
}

function Install-DeployScript {
    param(
        [string]$Target,
        [string]$LocalScript,
        [string]$RemoteScript
    )

    Write-DeployLog "Uploading deploy script..."

    $tempName = "deploy-" + [guid]::NewGuid().ToString() + ".sh"
    $remoteTemp = "/mnt/hdd/$tempName"
    $localTemp = Convert-ToLinuxScript -Source $LocalScript

    try {
        Invoke-DeployCommand -Command "scp" -Arguments @(
            $localTemp,
            "${Target}:${remoteTemp}"
        )

        Write-DeployLog "Installing deploy script..."

        $remoteDirectory = $RemoteScript.Substring(
            0, $RemoteScript.LastIndexOf("/")
        )

        $command = "sudo mkdir -p '$remoteDirectory' && sudo install -m 755 '$remoteTemp' '$RemoteScript' && rm -f '$remoteTemp'"

        Invoke-DeployCommand -Command "ssh" -Arguments @(
            "-tt",
            $Target,
            $command
        )
    }
    finally {
        Remove-Item -LiteralPath $localTemp -Force -ErrorAction SilentlyContinue
    }
}

function Start-RemoteDeploy {
    param(
        [string]$Target,
        [string]$RemoteScript
    )

    Write-DeployLog "Running remote deploy..."

    Invoke-DeployCommand -Command "ssh" -Arguments @(
        "-tt",
        $Target,
        "sudo bash '$RemoteScript'"
    )
}

# ===== MAIN DEPLOY WORKFLOW =====

function Start-Deployment {
    param(
        [string]$Name,
        [string]$ConfigPath,
        [string]$LocalScript,
        [string]$SourceKey,
        [string]$RemoteKey,
        [string]$RequiredFile,
        [string]$ScriptsRoot
    )

    Initialize-DeployLog -Name $Name -ScriptsRoot $ScriptsRoot

    try {
        Write-DeployLog "===== $Name DEPLOY START ====="

        $config = Read-DeployConfig -Path $ConfigPath

        $required = @(
            "PI_USER",
            "PI_HOST",
            $SourceKey,
            $RemoteKey,
            "REMOTE_SCRIPT"
        )

        foreach ($key in $required) {
            if ([string]::IsNullOrWhiteSpace($config[$key])) {
                throw "Missing configuration: $key"
            }
        }

        $target = "$($config['PI_USER'])@$($config['PI_HOST'])"
        $source = $config[$SourceKey]
        $remote = $config[$RemoteKey]
        $remoteScript = $config["REMOTE_SCRIPT"]

        # Validate configured remote paths before using them in shell commands.
        foreach ($path in @($remote, $remoteScript)) {
            if ($path -notmatch '^/[a-zA-Z0-9_./-]+$' -or
                $path -match '(^|/)\.\.(/|$)' -or
                $path -eq '/') {
                throw "Invalid remote path configuration."
            }
        }

        Write-DeployLog "Target: $target"

        Write-DeployLog "[1/5] Validating files..."

        Assert-DeployFiles `
            -Source $source `
            -Script $LocalScript `
            -RequiredFile $RequiredFile

        Write-DeployLog "[2/5] SSH connection..."
        Test-DeployConnection -Target $target

        Write-DeployLog "[3/5] Uploading application..."
        Send-DeployDirectory `
            -Target $target `
            -LocalPath $source `
            -RemotePath $remote

        Write-DeployLog "[4/5] Installing deploy script..."
        Install-DeployScript `
            -Target $target `
            -LocalScript $LocalScript `
            -RemoteScript $remoteScript

        Write-DeployLog "[5/5] Executing deployment..."
        Start-RemoteDeploy `
            -Target $target `
            -RemoteScript $remoteScript

        Write-DeployLog "===== DEPLOY COMPLETED SUCCESSFULLY ====="
    }
    catch {
        Write-DeployLog "DEPLOY FAILED: $($_.Exception.Message)" "ERROR"
        throw
    }
}

Export-ModuleMember -Function Start-Deployment
