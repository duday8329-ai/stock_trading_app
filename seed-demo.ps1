$ErrorActionPreference = "Stop"

$nodeDir = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
$toolsDir = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin"
$pnpm = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd"

if (!(Test-Path $pnpm)) {
  Write-Error "Bundled pnpm was not found. Install Node.js from https://nodejs.org, then run: npm install -g pnpm"
}

$env:PATH = "$nodeDir;$toolsDir;$env:PATH"
& $pnpm run seed
