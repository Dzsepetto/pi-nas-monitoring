
$ErrorActionPreference = "Stop"

$SCRIPTS_ROOT = Split-Path $PSScriptRoot -Parent

Import-Module (
    Join-Path $SCRIPTS_ROOT "common/DeployCommon.psm1"
) -Force

try {
    Start-Deployment `
        -Name "web" `
        -ConfigPath (Join-Path $PSScriptRoot ".env") `
        -LocalScript (Join-Path $PSScriptRoot "setup-web.sh") `
        -SourceKey "LOCAL_DIST" `
        -RemoteKey "REMOTE_DIST" `
        -RequiredFile "index.html" `
        -ScriptsRoot $SCRIPTS_ROOT
}
catch {
    exit 1
}
