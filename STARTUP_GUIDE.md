# Startup Guide for Asset Booking System

To run the project locally, you need to start both the Backend (Django) and Frontend (React) servers.

## Quick Start (Windows)

1. Open PowerShell
2. Run the startup script:
   ```powershell
   ./run_project.ps1
   ```
   This will open two new windows for backend and frontend.

## Manual Startup

If you prefer to run them manually in separate terminals:

### 1. Start Backend
Open a terminal in the project root:
```bash
cd backend
python manage.py runserver 8050
```
**Note:** The backend MUST run on port **8050** for the frontend to connect.

### 2. Start Frontend
Open another terminal in the project root:
```bash
cd frontend
npm start
```
The frontend will open at http://localhost:3000

## Troubleshooting "Failed to Fetch"

If you see "Failed to Fetch" during login/signup:
1. Ensure the backend terminal is running and shows no errors.
2. Verify the backend is on port **8050**. (Check the startup logs).
3. Ensure no firewall is blocking `127.0.0.1`.
