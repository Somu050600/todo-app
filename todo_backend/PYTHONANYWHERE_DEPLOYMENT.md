# 🐍 PythonAnywhere Deployment Guide

Deploy your Django backend to PythonAnywhere - **always on, no cold starts!**

## 📋 Table of Contents

1. [Create Account](#step-1-create-account)
2. [Upload Your Code](#step-2-upload-your-code)
3. [Create Database](#step-3-create-database)
4. [Set Up Virtual Environment](#step-4-set-up-virtual-environment)
5. [Configure Environment Variables](#step-5-configure-environment-variables)
6. [Configure WSGI](#step-6-configure-wsgi)
7. [Configure Static Files](#step-7-configure-static-files)
8. [Run Migrations](#step-8-run-migrations)
9. [Reload and Test](#step-9-reload-and-test)
10. [Connect Frontend](#step-10-connect-frontend)

---

## Step 1: Create Account

1. Go to **https://www.pythonanywhere.com**
2. Click **"Pricing & signup"**
3. Select **"Create a Beginner account"** (Free!)
4. Sign up with your email
5. Verify your email

**Your username will be part of your URL**: `https://yourusername.pythonanywhere.com`

---

## Step 2: Upload Your Code

### Option A: Using Git (Recommended)

1. Go to **Dashboard** → **"Consoles"** → **"Bash"** (start a new console)

2. Clone your repository:

```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
```

3. Navigate to backend folder:

```bash
cd todo-app/todo_backend
```

### Option B: Upload Files Manually

1. Go to **Dashboard** → **"Files"**
2. Navigate to `/home/yourusername/`
3. Click **"Upload a file"** or use the file browser
4. Upload your entire `todo_backend` folder

---

## Step 3: Create Database

1. Go to **Dashboard** → **"Databases"**

2. Under **"MySQL"**, create a new database:

   - Set a **MySQL password** (remember this!)
   - Click **"Initialize MySQL"**

3. Once initialized, you'll see:

   - **Database host**: `yourusername.mysql.pythonanywhere-services.com`
   - **Username**: `yourusername`
   - **Database name**: Click **"Create a database"** and enter: `yourusername$todo_db`

4. **Important!** Note down:
   ```
   Host: yourusername.mysql.pythonanywhere-services.com
   Username: yourusername
   Password: (the password you set)
   Database: yourusername$todo_db
   ```

---

## Step 4: Set Up Virtual Environment

1. Open a **Bash console** (Dashboard → Consoles → Bash)

2. Create a virtual environment:

```bash
cd ~
mkvirtualenv --python=/usr/bin/python3.11 todo-venv
```

3. Your virtual environment is now active (you'll see `(todo-venv)` in the prompt)

4. Install dependencies:

```bash
cd ~/todo-app/todo_backend
pip install -r requirements.txt
```

**Note:** If you get errors with `mysqlclient`, it should work on PythonAnywhere as they have the MySQL libraries pre-installed.

---

## Step 5: Configure Environment Variables

1. Open a **Bash console**

2. Edit your `.env` file:

```bash
cd ~/todo-app/todo_backend
nano .env
```

3. Add these lines (replace with YOUR values):

```bash
DEBUG=False
SECRET_KEY=your-super-secret-key-change-this-to-something-random

# MySQL Database (PythonAnywhere)
MYSQL_DATABASE=yourusername$todo_db
MYSQL_USER=yourusername
MYSQL_PASSWORD=your-mysql-password
MYSQL_HOST=yourusername.mysql.pythonanywhere-services.com

# Allowed hosts
ALLOWED_HOSTS=yourusername.pythonanywhere.com
PYTHONANYWHERE_DOMAIN=yourusername

# Frontend URL for CORS
FRONTEND_URL=https://todo-app-frontend-somu.vercel.app
```

4. Save: `Ctrl+O`, Enter, `Ctrl+X`

**Generate a secret key:**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## Step 6: Configure WSGI

1. Go to **Dashboard** → **"Web"**

2. Click **"Add a new web app"**

3. Choose:

   - **Domain**: Click "Next" (accept the free domain)
   - **Framework**: Select **"Manual configuration"** (NOT Django!)
   - **Python version**: Select **Python 3.11**

4. After creation, scroll down to **"Code"** section:

   - **Source code**: `/home/yourusername/todo-app/todo_backend`
   - **Working directory**: `/home/yourusername/todo-app/todo_backend`

5. Click on **"WSGI configuration file"** link (e.g., `/var/www/yourusername_pythonanywhere_com_wsgi.py`)

6. **Delete all the content** and replace with:

```python
# =============================================================================
# WSGI Configuration for PythonAnywhere
# =============================================================================
import os
import sys
from dotenv import load_dotenv

# Add your project directory to the sys.path
project_home = '/home/yourusername/todo-app/todo_backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Load environment variables from .env file
env_path = os.path.join(project_home, '.env')
load_dotenv(env_path)

# Set the Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'todo_backend.settings'

# Import Django and get the WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

**⚠️ IMPORTANT:** Replace `yourusername` with your actual PythonAnywhere username!

7. Click **"Save"**

---

## Step 7: Configure Static Files

1. On the **Web** tab, scroll down to **"Static files"**

2. Click **"Enter URL"** and add:

   - **URL**: `/static/`
   - **Directory**: `/home/yourusername/todo-app/todo_backend/staticfiles`

3. In the **Bash console**, collect static files:

```bash
cd ~/todo-app/todo_backend
workon todo-venv
python manage.py collectstatic --noinput
```

---

## Step 8: Run Migrations

1. In the **Bash console**:

```bash
cd ~/todo-app/todo_backend
workon todo-venv
python manage.py migrate
```

2. (Optional) Create a superuser for admin access:

```bash
python manage.py createsuperuser
```

---

## Step 9: Reload and Test

1. Go to **Dashboard** → **"Web"**

2. Click the big green **"Reload"** button

3. Visit your URL: **https://yourusername.pythonanywhere.com/api/**

4. You should see your API overview!

---

## Step 10: Connect Frontend

### Update Vercel Environment Variable

1. Go to https://vercel.com/dashboard
2. Click on your **todo-app-frontend-somu** project
3. Go to **Settings** → **Environment Variables**
4. Update or add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://yourusername.pythonanywhere.com`
5. **Redeploy** your frontend

### Update Backend CORS (if needed)

Your `settings.py` should already include your Vercel URL in `CORS_ALLOWED_ORIGINS`. If not, update the `.env` file and reload the web app.

---

## 🧪 Testing

### Test API Directly

```bash
# Should return your columns (empty array if new)
curl https://yourusername.pythonanywhere.com/api/columns/

# Should return API overview
curl https://yourusername.pythonanywhere.com/api/
```

### Test from Frontend

1. Visit https://todo-app-frontend-somu.vercel.app
2. Open browser DevTools (F12) → Network tab
3. Create a column
4. You should see requests going to `yourusername.pythonanywhere.com`

---

## 🔧 Troubleshooting

### Problem: 500 Internal Server Error

**Check the error log:**

1. Go to **Web** tab
2. Click **"Error log"** link
3. Look for the actual error message

**Common causes:**

- Wrong path in WSGI file
- Missing environment variable
- Database connection issue

### Problem: Static Files Not Loading (CSS/JS missing)

1. Make sure you ran `collectstatic`
2. Check the static files path is correct in Web tab
3. Reload the web app

### Problem: Database Connection Error

1. Check your MySQL credentials in `.env`
2. Make sure the database name includes `$` (e.g., `yourusername$todo_db`)
3. Verify password is correct

### Problem: CORS Error

1. Check your frontend URL is in `CORS_ALLOWED_ORIGINS`
2. Check WSGI file loads `.env` properly
3. Reload the web app after changes

### Problem: "Module not found"

1. Make sure virtual environment is set correctly:
   - Go to **Web** tab
   - Under **Virtualenv**, enter: `/home/yourusername/.virtualenvs/todo-venv`
2. Reload the web app

---

## 📁 File Structure on PythonAnywhere

```
/home/yourusername/
├── .virtualenvs/
│   └── todo-venv/          # Your virtual environment
│
└── todo-app/
    └── todo_backend/
        ├── .env            # Environment variables
        ├── manage.py
        ├── requirements.txt
        ├── staticfiles/    # Collected static files
        ├── todo/           # Your Django app
        └── todo_backend/
            ├── settings.py
            ├── urls.py
            └── wsgi.py
```

---

## 🔄 Updating Your App

When you make changes to your code:

### If using Git:

```bash
# In PythonAnywhere Bash console
cd ~/todo-app
git pull origin main

# If you changed dependencies:
workon todo-venv
cd todo_backend
pip install -r requirements.txt

# If you changed models:
python manage.py migrate

# If you changed static files:
python manage.py collectstatic --noinput
```

Then click **"Reload"** on the Web tab.

### If uploading files manually:

1. Upload changed files via Files tab
2. Run migrations if needed
3. Click **"Reload"** on Web tab

---

## 📊 Free Tier Limits

| Feature           | Limit            |
| ----------------- | ---------------- |
| Web apps          | 1                |
| CPU seconds       | ~100/day         |
| Storage           | 512 MB           |
| Outbound internet | Whitelist only\* |
| Database          | MySQL only       |
| Custom domain     | ❌ (Paid only)   |
| Always on         | ✅ Yes!          |

\*Free tier can only make HTTP requests to whitelisted sites. Your frontend (Vercel) can reach your backend, but backend can't call external APIs.

---

## ✅ Deployment Checklist

- [ ] Created PythonAnywhere account
- [ ] Uploaded code (via Git or manually)
- [ ] Created MySQL database
- [ ] Created virtual environment
- [ ] Installed dependencies
- [ ] Created `.env` file with correct values
- [ ] Configured WSGI file
- [ ] Set up static files
- [ ] Ran migrations
- [ ] Reloaded web app
- [ ] Tested API endpoint
- [ ] Updated Vercel environment variable
- [ ] Tested frontend integration

---

## 🎉 Success!

Your backend is now live at:
**https://yourusername.pythonanywhere.com**

- ✅ Always on (no cold starts!)
- ✅ Free forever (within limits)
- ✅ MySQL database included

**Need to make the API endpoint match Render's?**
Your endpoints are:

- `https://yourusername.pythonanywhere.com/api/` - API overview
- `https://yourusername.pythonanywhere.com/api/columns/` - List columns
- etc.

Happy deploying! 🚀
