# Linux amd64
$env:GOOS="linux"; $env:GOARCH="amd64"
go build -ldflags="-s -w" -o ../dist/myapp-linux-amd64 .

# Linux arm64
$env:GOOS="linux"; $env:GOARCH="arm64"
go build -ldflags="-s -w" -o ../dist/myapp-linux-arm64 .

# Windows amd64
$env:GOOS="windows"; $env:GOARCH="amd64"
go build -ldflags="-s -w" -o ../dist/myapp-windows-amd64.exe .