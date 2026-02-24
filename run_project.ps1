Write-Host "Starting Asset Booking System..."

# Start Backend
Write-Host "Launching Backend on Port 8050..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver 0.0.0.0:8050"

# Start Frontend
Write-Host "Launching Frontend on Port 3000..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "---------------------------------------------------"
Write-Host "Application is starting in separate windows."
Write-Host ""
Write-Host "Open these links in your browser:"
Write-Host "Frontend (User Interface): http://localhost:3000"
Write-Host "Backend (API & Admin):     http://127.0.0.1:8050/admin"
Write-Host "---------------------------------------------------"
Write-Host "Press any key to close this launcher..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
