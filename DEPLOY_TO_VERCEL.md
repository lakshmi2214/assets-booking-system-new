# How to Deploy Asset Booking System to Vercel

This guide explains how to deploy both the Frontend (React) and Backend (Django) to Vercel.

## ⚠️ Important Note on Database
The backend uses **SQLite** (`db.sqlite3`). Vercel's file system is **ephemeral** (read-only after build).
- **Your database will reset** every time the server restarts (which happens frequently).
- You will be able to add data, but it may disappear after a few hours or on the next deployment.
- **For a real production app**, you should connect your Django backend to an external database like **PostgreSQL** (e.g., Vercel Postgres, Neon, or Supabase).

---

## 🚀 Step 1: Deploy Backend (Django)

1. **Sign in to Vercel**: Go to [vercel.com](https://vercel.com) and sign in.
2. **Import Project**:
   - If using Git: Push your code to GitHub/GitLab/Bitbucket and import the repository.
   - Select the `backend` folder as the **Root Directory** during import (click "Edit" next to Root Directory).
3. **Configure Project**:
   - **Framework Preset**: Select "Other" (or "Django" if available, but "Other" works with the provided `vercel.json`).
   - **Environment Variables**:
     - `DJANGO_SECRET_KEY`: (Optional) Add a strong random string.
     - `DEBUG`: Set to `False`.
4. **Deploy**: Click **Deploy**.
5. **Get Backend URL**: Once deployed, copy the domain (e.g., `https://your-app-backend.vercel.app`).

### Verify Backend
Visit `https://your-app-backend.vercel.app/api/v1/` (or your specific API endpoint) to confirm it is running.

## 💾 Step 1.5: Permanent Database (Solution for "Data Loss" & "Login Issues")

**The Issue**: By default, Vercel "resets" the server every few minutes. Your login data and added assets vanish because they are stored in a temporary file.

**The Fix**: Use Vercel Postgres (Free).

1.  Go to your **Vercel Dashboard** -> Project `asset-booking-backend`.
2.  Click **Storage** tab -> **Connect Store** -> **Postgres** -> **Create New**.
3.  Accept defaults and click **Create**.
4.  Once created, click **Connect Project** and select `asset-booking-backend`.
5.  **Re-deploy**: Go to the **Deployments** tab, find the latest one, click the 3 dots (...) -> **Redeploy**.
6.  **Create Admin User**:
    - Now that you have a real DB, you need to create a superuser *once*.
    - Unfortunately, since we can't run console commands easily on Vercel, you might need to install `django-postgres` locally or use a customized management script. 
    - *Simpler Option*: Connect your local PC to this remote DB temporarily to run `python manage.py createsuperuser`. (See "Connect to Vercel Postgres" docs).

---

## 🎨 Step 2: Deploy Frontend (React)

1. **Dashboard**: Go back to your Vercel Dashboard.
2. **Add New Project**: Import the *same* repository again.
3. **Root Directory**: This time, select the `frontend` folder.
4. **Configure Project**:
   - **Framework Preset**: Vercel should auto-detect "Create React App".
   - **Environment Variables** (CRITICAL):
     - Name: `REACT_APP_API_URL`
     - Value: `https://asset-booking-backend.vercel.app`

## 🎉 Deployment Successful!

I have already performed these steps for you. Here are your live links:

- **Frontend (Website)**: [https://asset-booking-frontendn.vercel.app](https://asset-booking-frontendn.vercel.app)
- **Backend (API)**: [https://asset-booking-backend.vercel.app](https://asset-booking-backend.vercel.app)

### Notes
- The frontend is already configured to talk to this backend.
- Remember: The database is temporary (SQLite). Data will be lost on redeployment.
