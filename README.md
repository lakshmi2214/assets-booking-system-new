# Assets Booking & Tracking - Django Starter
This is a minimal starter template for an Assets Booking & Tracking system using Django.
Steps to run:
1. Create and activate a virtualenv.
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
2. Install requirements:
   pip install -r requirements.txt
3. Create the project DB and run migrations:
   python manage.py migrate
4. Create superuser:
   python manage.py createsuperuser
5. Run server:
   python manage.py runserver 8050

## Full Stack Setup (Frontend + Backend)

To run the complete application with separate frontend and backend URLs:

### Automatic Start
Run the included script:
`.\run_project.ps1`

### Manual Start
1. **Backend** (running on port 8050):
   ```bash
   cd backend
   python manage.py runserver 8050
   ```
   URL: http://127.0.0.1:8050/admin

2. **Frontend** (running on port 3000):
   ```bash
   cd frontend
   npm start
   ```
   URL: http://localhost:3000

The frontend is configured to talk to the backend at http://127.0.0.1:8050.

---

## 🌎 Live Production Links
- **Frontend (Website)**: [https://asset-booking-frontendn.vercel.app](https://asset-booking-frontendn.vercel.app)
- **Backend (API)**: [https://asset-booking-backend.vercel.app](https://asset-booking-backend.vercel.app)

