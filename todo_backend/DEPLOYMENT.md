# Deploy Django Backend to Render

## Prerequisites

- A GitHub account
- Your backend code pushed to a GitHub repository

## Step-by-Step Deployment Instructions

### 1. Push Your Code to GitHub (if not already done)

```bash
cd todo_backend
git init
git add .
git commit -m "Prepare for Render deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Sign Up / Log In to Render

- Go to https://render.com/
- Sign up or log in with your GitHub account

### 3. Create a New Web Service

1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Select your `todo-app` repository

### 4. Configure the Web Service

Fill in the following settings:

- **Name**: `todo-backend` (or your preferred name)
- **Region**: Choose the closest to you
- **Root Directory**: `todo_backend` (if your Django app is in a subfolder)
- **Environment**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn todo_backend.wsgi:application`
- **Instance Type**: `Free`

### 5. Add Environment Variables

Click **"Advanced"** and add the following environment variables:

| Key              | Value                                       |
| ---------------- | ------------------------------------------- |
| `PYTHON_VERSION` | `3.11.0`                                    |
| `DEBUG`          | `False`                                     |
| `FRONTEND_URL`   | `https://todo-app-frontend-somu.vercel.app` |
| `ALLOWED_HOSTS`  | `.onrender.com`                             |
| `SECRET_KEY`     | Click "Generate" or use a random string     |

**Note**: Don't add `DATABASE_URL` manually - it will be auto-added when you create the database.

### 6. Create PostgreSQL Database

1. Click **"New +"** button again
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `todo-db`
   - **Database**: `todo_db`
   - **User**: `todo_user`
   - **Region**: Same as your web service
   - **Instance Type**: `Free`
4. Click **"Create Database"**

### 7. Connect Database to Web Service

1. Go back to your **Web Service** settings
2. Click **"Environment"** tab
3. Add new environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Click "Insert from" → Select your database → Choose "Internal Database URL"

### 8. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Run migrations
   - Collect static files
   - Start your Django app

### 9. Get Your Backend URL

Once deployed, you'll get a URL like:

```
https://todo-backend-xxxx.onrender.com
```

### 10. Update Frontend to Use Production API

Update your frontend's API endpoint from `http://localhost:8000` to your new Render URL.

In your React app (`App.js`), update the API base URL:

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://todo-backend-xxxx.onrender.com";
```

Then in Vercel:

1. Go to your frontend project settings
2. Add environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-render-url.onrender.com`
3. Redeploy your frontend

---

## Alternative: One-Click Deploy with render.yaml

If your repository has the `render.yaml` file at the root:

1. Go to https://render.com/
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically create both the database and web service

---

## Troubleshooting

### Build Fails

- Check the build logs in Render dashboard
- Ensure `build.sh` is executable: `chmod +x build.sh`
- Verify all dependencies are in `requirements.txt`

### Database Connection Issues

- Ensure `DATABASE_URL` environment variable is set
- Check that the database and web service are in the same region

### CORS Errors

- Verify frontend URL is in `CORS_ALLOWED_ORIGINS` in `settings.py`
- Check `ALLOWED_HOSTS` includes `.onrender.com`

### Static Files Not Loading

- Ensure `collectstatic` runs in `build.sh`
- Check `STATIC_ROOT` is set correctly

---

## Important Notes

⚠️ **Free Tier Limitations**:

- Services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds (cold start)
- Database has 90 days of retention

🔄 **Auto-Deploy**:

- Render automatically redeploys when you push to your main branch

📊 **Monitoring**:

- Check logs in Render dashboard under "Logs" tab
- Monitor database usage under your database service

---

## Your Deployment URLs

- **Backend**: Will be `https://YOUR-SERVICE-NAME.onrender.com`
- **Frontend**: https://todo-app-frontend-somu.vercel.app
- **Database**: Internal URL (automatically configured)
