$ErrorActionPreference = 'Stop'
Write-Host 'FIX MOBIL - instalacion local' -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js no esta instalado. Instala Node.js LTS y vuelve a ejecutar.' }
$nodeVersion = (node -p "process.versions.node")
Write-Host "Node.js detectado: $nodeVersion"
if (-not (Test-Path '.env.local')) { Copy-Item '.env.example' '.env.local'; Write-Host 'Se creo .env.local. La vitrina publica ya funciona; completa Supabase solo si usaras el panel administrativo.' -ForegroundColor Yellow }
npm install
Write-Host 'Instalacion completada. Ejecuta: npm run dev' -ForegroundColor Green
