# Asset Booking System Runner
Write-Host "Starting Asset Booking System..." -ForegroundColor Cyan

# Start Backend
Write-Host "Starting Backend on http://127.0.0.1:8050..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver 8050"

# Start Frontend
Write-Host "Starting Frontend on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "Both services are starting in new windows." -ForegroundColor Yellow
