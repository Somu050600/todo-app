# Quick Start Guide - Render Deployment

## 🚀 Deploy in 5 Steps

### 1️⃣ Push to GitHub

```bash
cd /Users/somu/Documents/Personal\ projects/todo-app
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2️⃣ Create Render Account

- Go to https://render.com/
- Sign up with GitHub

### 3️⃣ Deploy Database

1. Click "New +" → "PostgreSQL"
2. Name: `todo-db`
3. Click "Create Database"
4. **Copy the Internal Database URL** (you'll need it)

### 4️⃣ Deploy Web Service

1. Click "New +" → "Web Service"
2. Connect your repo
3. Settings:

   - **Root Directory**: `todo_backend`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn todo_backend.wsgi:application`

4. Environment Variables (click "Advanced"):

   ```
   DEBUG=False
   SECRET_KEY=<click Generate>
   DATABASE_URL=<paste Internal Database URL from step 3>
   ALLOWED_HOSTS=.onrender.com
   FRONTEND_URL=https://todo-app-frontend-somu.vercel.app
   PYTHON_VERSION=3.11.0
   ```

5. Click "Create Web Service"

### 5️⃣ Connect Frontend

1. Go to Vercel dashboard
2. Your project → Settings → Environment Variables
3. Add:
   - Key: `REACT_APP_API_URL`
   - Value: `https://YOUR-RENDER-URL.onrender.com` (from step 4)
4. Redeploy frontend

## ✅ Done!

Visit https://todo-app-frontend-somu.vercel.app

---

## 📝 Important Notes

- ⏱️ First request may take 30-60s (free tier cold start)
- 🔄 Auto-deploys on git push
- 📊 View logs: Render dashboard → Your service → Logs
- 🆓 Free tier includes PostgreSQL database

## 🐛 Troubleshooting

**Backend not responding?**

- Visit backend URL directly to wake it up
- Check logs in Render dashboard

**CORS errors?**

- Verify frontend URL in backend CORS settings
- Redeploy backend

**Database errors?**

- Check DATABASE_URL is set correctly
- Run migrations: Render dashboard → Manual Deploy

---

For detailed instructions, see `DEPLOYMENT.md`
