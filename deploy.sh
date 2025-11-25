#!/bin/bash
# =============================================================================
# PythonAnywhere Deploy Script
# =============================================================================
# Usage: Run this script after pushing changes to GitHub
#        ~/todo-app/deploy.sh
#
# After running, click "Reload" on the Web tab!
# =============================================================================

echo "🚀 Starting deployment..."

# Navigate to project
cd ~/todo-app

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Activate virtual environment
echo "🐍 Activating virtual environment..."
source ~/.virtualenvs/todo-venv/bin/activate

# Navigate to backend
cd todo_backend

# Install any new dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt --quiet

# Run database migrations
echo "🗄️ Running migrations..."
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput --quiet

echo ""
echo "✅ Deployment complete!"
echo ""
echo "⚠️  IMPORTANT: Now go to the Web tab and click 'Reload'"
echo "    https://www.pythonanywhere.com/user/somu050600/webapps/"
echo ""

