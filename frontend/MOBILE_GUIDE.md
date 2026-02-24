# Mobile App Conversion Guide

Your React frontend has been converted to a Mobile App project using **Capacitor**.
This allows you to build an Android APK (and iOS app on Mac) from your existing code.

## Prerequisites
- **Android Studio** (for Android) must be installed.
- **Node.js** (you definitely have this).

## How to Build and Run
I have added new scripts to your `package.json` to make this easy.

### 1. Build the Mobile Project
Whenever you make changes to your React code, run this command to update the mobile project:
```bash
cd frontend
npm run mobile:build
```
This runs `npm run build` and `npx cap sync` automatically.

### 2. Open in Android Studio
To compile the APK or run on an Emulator:
```bash
npm run mobile:open
```
This will launch Android Studio. From there, you can:
- specificy your Android SDK if asked.
- Click the **Run** button (green play icon) to launch the app on an Emulator or connected device.
- Go to `Build > Build Bundle(s) / APK(s) > Build APK(s)` to generate an installable file.

## Backend Connection
When running on an **Android Emulator**, the app cannot access `localhost:8050` directly.
I have updated `src/auth.js` to automatically use `http://10.0.2.2:8050` (which implies "the host computer's localhost") when running natively.

**Important for Physical Devices:**
If you install the APK on a real phone, `10.0.2.2` won't work. You must:
1. Find your computer's Local IP (e.g., `192.168.1.5`).
2. Update your `.env` or `auth.js` config, or just make sure your backend is accessible from that IP.
3. Start your backend with `python manage.py runserver 0.0.0.0:8050` (listening on all interfaces).
