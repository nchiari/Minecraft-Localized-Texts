$project = Split-Path -Leaf (Get-Location)
$dest = "G:\Mi unidad\Nico - Trabajo\Dev MC\$project"

Copy-Item .\* $dest -Recurse -Force