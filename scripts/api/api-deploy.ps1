
$ErrorActionPreference = "Stop"

$SCRIPTS_ROOT = Split-Path $PSScriptRoot -Parent

Import-Module (
    Join-Path $SCRIPTS_ROOT "common/DeployCommon.psm1"
) -Force

try {
    Start-Deployment `
        -Name "api" `
        -ConfigPath (Join-Path $PSScriptRoot ".env") `
        -LocalScript (Join-Path $PSScriptRoot "deploy.sh") `
        -SourceKey "LOCAL_PUBLISH" `
        -RemoteKey "REMOTE_PUBLISH" `
        -ScriptsRoot $SCRIPTS_ROOT
}
catch {
    exit 1
}
