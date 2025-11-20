# 🚀 Deployment Checklist

## ✅ What's Been Done

### Backend Files Created

- ✅ `requirements.txt` - All Python dependencies (Django, PostgreSQL, Gunicorn, etc.)
- ✅ `build.sh` - Render build script (executable)
- ✅ `render.yaml` - Render Blueprint configuration
- ✅ `.gitignore` - Ignore unnecessary files
- ✅ `settings.py` - Updated with:
  - ✅ Environment variables
  - ✅ PostgreSQL support
  - ✅ Production security settings
  - ✅ CORS configured for https://todo-app-frontend-somu.vercel.app
  - ✅ WhiteNoise for static files
  - ✅ Database URL parsing

### Documentation Created

- ✅ `DEPLOYMENT.md` - Detailed deployment guide
- ✅ `QUICK_START.md` - 5-step quick deploy guide
- ✅ `CONNECT_FRONTEND_BACKEND.md` - Frontend-Backend connection guide
- ✅ `README.md` - Project overview
- ✅ `DEPLOYMENT_CHECKLIST.md` - This file

---

## 📝 What You Need to Do

### Step 1: Push to GitHub (if not already)

```bash
cd "/Users/somu/Documents/Personal projects/todo-app"
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Deploy Backend to Render

👉 Follow: `todo_backend/QUICK_START.md`

**Key Actions:**

1. Sign up at https://render.com
2. Create PostgreSQL database
3. Create Web Service
4. Add environment variables
5. Deploy!

**Time Estimate**: ~10 minutes

### Step 3: Get Your Backend URL

After deployment, you'll get a URL like:

```
https://todo-backend-xxxx.onrender.com
```

**📋 Copy this URL!**

### Step 4: Update Frontend on Vercel

👉 Follow: `CONNECT_FRONTEND_BACKEND.md`

**Key Actions:**

1. Go to Vercel dashboard
2. Open your project settings
3. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://todo-backend-xxxx.onrender.com`
4. Redeploy frontend

**Time Estimate**: ~3 minutes

### Step 5: Test Everything

1. Visit https://todo-app-frontend-somu.vercel.app
2. Create a column
3. Add some tasks
4. Move tasks between columns
5. Edit and delete tasks
6. Refresh page - data should persist!

---

## 🎯 Quick Links

| Resource               | Link                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 📘 Quick Start Guide   | [`todo_backend/QUICK_START.md`](todo_backend/QUICK_START.md) |
| 📗 Detailed Deployment | [`todo_backend/DEPLOYMENT.md`](todo_backend/DEPLOYMENT.md)   |
| 📙 Connect Guide       | [`CONNECT_FRONTEND_BACKEND.md`](CONNECT_FRONTEND_BACKEND.md) |
| 🌐 Render Dashboard    | https://render.com/dashboard                                 |
| 🌐 Vercel Dashboard    | https://vercel.com/dashboard                                 |
| 🚀 Your Frontend       | https://todo-app-frontend-somu.vercel.app                    |

---

## 📊 Deployment Flow

```
┌──────────────────────────────────────────────────────────┐
│  STEP 1: Push Code to GitHub                            │
│  ✓ Backend with all config files                        │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│  STEP 2: Deploy to Render                               │
│  • Create PostgreSQL database                           │
│  • Create Web Service                                   │
│  • Set environment variables                            │
│  ✓ Get backend URL: https://todo-backend-xxxx.         │
│    onrender.com                                         │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│  STEP 3: Update Frontend on Vercel                      │
│  • Add REACT_APP_API_URL env variable                   │
│  • Point to backend URL from Step 2                     │
│  • Redeploy                                             │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│  STEP 4: Test & Celebrate! 🎉                           │
│  • Frontend talks to backend                            │
│  • Data persists in PostgreSQL                          │
│  • Full-stack app deployed!                             │
└──────────────────────────────────────────────────────────┘
```

---

## ⚡ Super Quick Deploy (For the Impatient)

```bash
# 1. Push to GitHub
git add . && git commit -m "Deploy config" && git push

# 2. Go to render.com
#    → New + → Blueprint
#    → Connect your repo
#    → Deploy (uses render.yaml)

# 3. Go to vercel.com
#    → Your project → Settings → Env Variables
#    → Add: REACT_APP_API_URL = <your-render-url>
#    → Redeploy

# 4. Done! 🚀
```

---

## 🆘 Need Help?

### Common Issues

- **Build fails**: Check `build.sh` is executable: `chmod +x build.sh`
- **CORS errors**: Frontend URL must be in `CORS_ALLOWED_ORIGINS`
- **Slow first load**: Free tier cold start (wait 30-60s)
- **Database errors**: Verify `DATABASE_URL` is set

### Where to Get Logs

- **Backend**: Render Dashboard → Your Service → Logs
- **Frontend**: Vercel Dashboard → Your Project → Logs
- **Browser**: Press F12 → Console tab

---

## 🎉 Success Criteria

You'll know everything is working when:

- ✅ Frontend loads without errors
- ✅ Can create/edit/delete columns
- ✅ Can create/edit/delete tasks
- ✅ Data persists after page refresh
- ✅ No CORS errors in console
- ✅ API calls show in Network tab

---

## 🔗 Your Deployment URLs

| Component | URL                                       | Status            |
| --------- | ----------------------------------------- | ----------------- |
| Frontend  | https://todo-app-frontend-somu.vercel.app | ✅ Deployed       |
| Backend   | `<your-render-url>`                       | ⏳ To be deployed |
| Database  | Internal (Render)                         | ⏳ To be created  |

---

**🚀 Start here**: [`todo_backend/QUICK_START.md`](todo_backend/QUICK_START.md)

Good luck with your deployment! 💪
