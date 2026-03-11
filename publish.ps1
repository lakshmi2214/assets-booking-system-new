# Run the sync script to update mockData.js and media
python sync_db_to_mock.py

# Stage the updated mock data and any new images
git add frontend/src/mockData.js
git add frontend/public/media/*

# Commit and Push
git commit -m "Update assets from local database"
git push origin main

Write-Host "`nSuccessfully published updated assets to GitHub and Vercel!`" -ForegroundColor Green
Write-Host "Vercel will redeploy automatically in a few minutes." -ForegroundColor Cyan
