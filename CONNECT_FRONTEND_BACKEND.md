# Connecting Frontend (Vercel) to Backend (Render)

## Quick Overview

Your setup:

- **Frontend**: https://todo-app-frontend-somu.vercel.app (Already deployed on Vercel)
- **Backend**: Will be on Render (e.g., `https://todo-backend-xxxx.onrender.com`)

---

## Step 1: Deploy Backend to Render

Follow the instructions in `todo_backend/DEPLOYMENT.md` to deploy your Django backend.

Once deployed, you'll get a URL like: **`https://todo-backend-xxxx.onrender.com`**

Copy this URL - you'll need it!

---

## Step 2: Update Frontend Environment Variable on Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click on your **todo-app-frontend-somu** project
3. Click on **"Settings"** tab
4. Click on **"Environment Variables"** in the left sidebar
5. Add a new variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://todo-backend-xxxx.onrender.com` (your Render URL, **without trailing slash**)
   - **Environments**: Check all (Production, Preview, Development)
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click the three dots (...) on the latest deployment
9. Click **"Redeploy"** to apply the new environment variable

### Option B: Using Vercel CLI

```bash
cd todo-frontend

# Install Vercel CLI if not installed
npm i -g vercel

# Add environment variable
vercel env add REACT_APP_API_URL production
# Paste your backend URL when prompted: https://todo-backend-xxxx.onrender.com

# Redeploy
vercel --prod
```

---

## Step 3: Verify the Connection

1. Open your frontend: https://todo-app-frontend-somu.vercel.app
2. Open browser DevTools (F12)
3. Go to the **Network** tab
4. Try creating a todo or refreshing the page
5. You should see API requests going to your Render backend URL
6. Check for any errors in the Console tab

---

## Step 4: Update Backend CORS (If Needed)

If you see CORS errors, ensure your backend `settings.py` includes your frontend URL:

```python
CORS_ALLOWED_ORIGINS = [
    "https://todo-app-frontend-somu.vercel.app",
    "http://localhost:3000",  # for local development
]
```

This is already configured in your updated `settings.py`!

---

## Testing Locally with Production Backend

To test your local frontend with the production backend:

1. Create `.env.local` in your `todo-frontend` folder:

```bash
REACT_APP_API_URL=https://todo-backend-xxxx.onrender.com
```

2. Restart your React dev server:

```bash
npm start
```

---

## Common Issues & Solutions

### Issue 1: "Failed to fetch" or Network Error

**Solution**:

- Check if backend is awake (free tier sleeps after 15 min)
- Visit your backend URL directly to wake it up
- Wait 30-60 seconds for cold start

### Issue 2: CORS Error

**Solution**:

- Verify frontend URL is in `CORS_ALLOWED_ORIGINS`
- Redeploy backend after updating settings
- Check browser console for exact error

### Issue 3: Environment Variable Not Working

**Solution**:

- Ensure variable name is exactly `REACT_APP_API_URL`
- Must start with `REACT_APP_` for Create React App
- Redeploy frontend after adding variable
- Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Issue 4: Backend Returns 404

**Solution**:

- Check API endpoint URLs in your frontend code
- Verify backend URLs match: `/api/columns/`, `/api/task-create/`, etc.
- Check backend logs in Render dashboard

---

## Architecture Overview

```
┌─────────────────────────────────────┐
│   Vercel (Frontend)                 │
│   https://todo-app-frontend-somu    │
│   .vercel.app                       │
│                                     │
│   - React App                       │
│   - Env: REACT_APP_API_URL          │
└──────────────┬──────────────────────┘
               │
               │ HTTP Requests
               │ (with CORS)
               ▼
┌─────────────────────────────────────┐
│   Render (Backend)                  │
│   https://todo-backend-xxxx         │
│   .onrender.com                     │
│                                     │
│   - Django REST API                 │
│   - PostgreSQL Database             │
│   - CORS configured                 │
└─────────────────────────────────────┘
```

---

## Next Steps After Connection

1. ✅ Test all CRUD operations (Create, Read, Update, Delete)
2. ✅ Verify data persists in PostgreSQL
3. ✅ Test from different devices/browsers
4. 📊 Monitor backend logs in Render dashboard
5. 🔒 Consider adding authentication if needed
6. 🚀 Upgrade to paid tier if you need faster cold starts

---

## Useful Commands

```bash
# Check frontend build locally
cd todo-frontend
npm run build

# Test production build locally
npx serve -s build

# View backend logs
# Go to Render dashboard > Your service > Logs tab

# Restart backend service
# Go to Render dashboard > Your service > Manual Deploy > Clear build cache & deploy
```

---

## Environment Variables Reference

### Frontend (.env.local or Vercel)

```bash
REACT_APP_API_URL=https://todo-backend-xxxx.onrender.com
```

### Backend (Render Environment Variables)

```bash
DEBUG=False
SECRET_KEY=<your-secret-key>
DATABASE_URL=<auto-generated-by-render>
FRONTEND_URL=https://todo-app-frontend-somu.vercel.app
ALLOWED_HOSTS=.onrender.com
PYTHON_VERSION=3.11.0
```

---

## Support

If you run into issues:

1. Check browser console for frontend errors
2. Check Render logs for backend errors
3. Verify environment variables are set correctly
4. Test API endpoints directly using browser or Postman
5. Ensure both services are running (check Render dashboard)

Happy deploying! 🚀
