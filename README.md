# 📝 Todo App

A modern, full-stack Kanban-style todo application with Google OAuth authentication, dark mode support, and real-time task management.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)
![Django](https://img.shields.io/badge/Django-5.2-092E20?logo=django)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)

## ✨ Features

### Task Management

- 📋 **Kanban Board** - Organize tasks in customizable columns
- ➕ **Create Tasks** - Add tasks to any column
- ✏️ **Edit Tasks** - Inline editing with click-to-edit
- ✅ **Mark Complete** - Toggle task completion status
- 🗑️ **Delete Tasks** - Remove tasks you no longer need

### Column Management

- 📁 **Custom Columns** - Create columns like "To Do", "In Progress", "Done"
- ✏️ **Rename Columns** - Edit column titles inline
- 🗑️ **Delete Columns** - Remove columns (and their tasks)

### User Experience

- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🔐 **Google OAuth** - Secure sign-in with Google account
- 💾 **Persistent Storage** - Data saved to database
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose             |
| ------------ | ------------------- |
| React 18     | UI Framework        |
| React Router | Navigation          |
| Google OAuth | Authentication      |
| CSS3         | Styling & Dark Mode |

### Backend

| Technology            | Purpose                |
| --------------------- | ---------------------- |
| Django 5.2            | Web Framework          |
| Django REST Framework | API                    |
| MySQL                 | Database (Production)  |
| SQLite                | Database (Development) |

## 🌐 Live Demo

| Component       | URL                                        |
| --------------- | ------------------------------------------ |
| **Frontend**    | https://todo-app-frontend-somu.vercel.app  |
| **Backend API** | https://somu050600.pythonanywhere.com/api/ |

## 📁 Project Structure

```
todo-app/
├── todo-frontend/          # React Frontend
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Styles including dark mode
│   │   └── index.js       # Entry point
│   └── package.json
│
├── todo_backend/           # Django Backend
│   ├── todo/              # Main Django app
│   │   ├── models.py      # Column & Task models
│   │   ├── views.py       # API endpoints
│   │   ├── serializers.py # DRF serializers
│   │   └── urls.py        # URL routing
│   ├── todo_backend/      # Django project settings
│   │   └── settings.py    # Configuration
│   └── requirements.txt   # Python dependencies
│
├── deploy.sh              # PythonAnywhere deploy script
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Python 3.11+
- Git

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

#### 2. Set up Backend

```bash
cd todo_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

#### 3. Set up Frontend

```bash
cd todo-frontend

# Install dependencies
npm install

# Create .env.local file
echo "REACT_APP_API_URL=http://localhost:8000" > .env.local

# Start development server
npm start
```

#### 4. Open in browser

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/

## 📡 API Endpoints

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/`                    | API overview                  |
| GET    | `/api/columns/`            | List all columns with tasks   |
| POST   | `/api/column-create/`      | Create a new column           |
| PUT    | `/api/column-update/<id>/` | Update column title           |
| DELETE | `/api/column-delete/<id>/` | Delete a column               |
| POST   | `/api/task-create/`        | Create a new task             |
| PUT    | `/api/task-update/<id>/`   | Update task (title/completed) |
| DELETE | `/api/task-delete/<id>/`   | Delete a task                 |

## 🗃️ Data Models

### Column

```python
{
    "id": 1,
    "title": "To Do",
    "order": 0,
    "tasks": [...]
}
```

### Task

```python
{
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "column": 1
}
```

## 🚢 Deployment

### Frontend (Vercel)

- Automatically deploys from GitHub
- Environment variable: `REACT_APP_API_URL`

### Backend (PythonAnywhere)

See [PYTHONANYWHERE_DEPLOYMENT.md](todo_backend/PYTHONANYWHERE_DEPLOYMENT.md) for detailed instructions.

**Quick deploy after changes:**

```bash
# On PythonAnywhere
~/todo-app/deploy.sh
# Then click "Reload" on Web tab
```

## 🔧 Environment Variables

### Frontend (.env.local)

```bash
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)

```bash
DEBUG=False
SECRET_KEY=your-secret-key
MYSQL_DATABASE=your_database
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_HOST=your_host
PYTHONANYWHERE_DOMAIN=your_username
FRONTEND_URL=https://your-frontend.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Somu**

- Frontend: [Vercel](https://todo-app-frontend-somu.vercel.app)
- Backend: [PythonAnywhere](https://somu050600.pythonanywhere.com)

---

⭐ Star this repo if you found it helpful!
