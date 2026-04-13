param(
  [string]$Repo = "mcorpai/content-rendering",
  [string]$Workflow = "render-longform.yml",
  [string]$OutDir = "downloads"
)

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$runId = gh run list --repo $Repo --workflow $Workflow --limit 1 --json databaseId --jq ".[0].databaseId"
if (-not $runId) {
  throw "No workflow run found for $Workflow"
}

gh run download $runId --repo $Repo --dir $OutDir
Write-Host "Downloaded artifacts for run $runId into $OutDir"
