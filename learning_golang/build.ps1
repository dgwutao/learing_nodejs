# build.ps1
$ErrorActionPreference = "Stop"

# 切到脚本所在目录（项目根），保证 ./src 和 dist 的相对路径始终正确
Push-Location $PSScriptRoot

try {
    $module  = "myapp"        # 二进制名，按需改
    $pkg     = "./src"        # 入口包：main.go 在 src 下就是 ./src
    $dist    = "dist"
    $ldflags = "-s -w"        # 要用 pprof 就删掉这行

    if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
    New-Item -ItemType Directory -Path $dist | Out-Null

    $oldGOOS   = $env:GOOS
    $oldGOARCH = $env:GOARCH
    $oldCGO    = $env:CGO_ENABLED

    $targets = @(
        @{ OS = "windows"; Arch = "amd64"; Out = "$module-windows-amd64.exe" },
        @{ OS = "linux";   Arch = "amd64"; Out = "$module-linux-amd64"     }
    )

    try {
        $env:CGO_ENABLED = "0"   # 交叉编译必须：纯静态，不依赖系统 libc

        foreach ($t in $targets) {
            $env:GOOS   = $t.OS
            $env:GOARCH = $t.Arch
            $out = Join-Path $dist $t.Out

            Write-Host ">>> compile $($t.OS)/$($t.Arch) → $out" -ForegroundColor Cyan
            go build "-ldflags=$ldflags" -o $out $pkg
            if ($LASTEXITCODE -ne 0) {
                throw "compile failed: $($t.OS)/$($t.Arch) (exit $LASTEXITCODE)"
            }
            Write-Host "    build completed" -ForegroundColor Green
        }
    }
    finally {
        # 恢复环境变量，避免污染后续命令
        if ($null -eq $oldGOOS)   { Remove-Item Env:GOOS   -ErrorAction SilentlyContinue } else { $env:GOOS   = $oldGOOS }
        if ($null -eq $oldGOARCH) { Remove-Item Env:GOARCH -ErrorAction SilentlyContinue } else { $env:GOARCH = $oldGOARCH }
        if ($null -eq $oldCGO)    { Remove-Item Env:CGO_ENABLED -ErrorAction SilentlyContinue } else { $env:CGO_ENABLED = $oldCGO }
    }

    Write-Host "`noutputs :" -ForegroundColor Yellow
    Get-ChildItem $dist | Select-Object Name, @{N="size(MB)";E={[math]::Round($_.Length/1MB,2)}}, LastWriteTime | Format-Table
}
finally {
    Pop-Location
}