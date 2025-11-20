import { googleLogout } from '@react-oauth/google';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './App.css';
import { useTextareaPreciseCaret } from "./useTextareaPreciseCaret";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profilePhoto = queryParams.get('photo');
  const name = queryParams.get('name');

  const [columns, setColumns] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    column: '',
    completed: false
  });
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');
  const [originalColumnTitle, setOriginalColumnTitle] = useState('');
  const [columnInputs, setColumnInputs] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [originalTaskTitle, setOriginalTaskTitle] = useState('');
  const taskTextareaRef = useRef(null);
  const columnTextareaRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const { getCaretIndexFromClick } = useTextareaPreciseCaret();

  const fetchColumns = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/columns/`);
      const data = await response.json();
      setColumns(data);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchColumns();
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [fetchColumns]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const signoutHandler = () => {
    localStorage.clear();
    googleLogout();
    navigate('/');
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.column) return;

    try {
      const response = await fetch(`${API_URL}/api/task-create/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchColumns();
        setShowAddModal(false);
        setNewTask({ title: '', column: '', completed: false });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      await fetch(`${API_URL}/api/task-update/${task.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      fetchColumns();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/api/task-delete/${taskId}/`, {
        method: 'DELETE',
      });
      fetchColumns();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStartEditColumn = (column) => {
    setEditingColumn(column.id);
    setEditingColumnTitle(column.title);
    setOriginalColumnTitle(column.title);
    
    // Wait for textarea to render, then focus at end
    setTimeout(() => {
      if (columnTextareaRef.current) {
        const textarea = columnTextareaRef.current;
        textarea.focus();
        textarea.setSelectionRange(column.title.length, column.title.length);
        autoResizeTextarea({ target: textarea });
      }
    }, 0);
  };

  const handleSaveColumnTitle = async (columnId) => {
    const trimmedTitle = editingColumnTitle.trim();
    
    // Only make API call if the title has actually changed
    if (trimmedTitle === originalColumnTitle) {
      setEditingColumn(null);
      return;
    }

    if (!trimmedTitle) {
      setEditingColumn(null);
      return;
    }

    try {
      await fetch(`${API_URL}/api/column-update/${columnId}/`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title: trimmedTitle }),
      });
      fetchColumns();
      setEditingColumn(null);
    } catch (error) {
      console.error('Error updating column:', error);
    }
  };

  const handleColumnTitleKeyDown = (columnId, e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveColumnTitle(columnId);
    } else if (e.key === 'Escape') {
      setEditingColumn(null);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    if (!window.confirm('Are you sure you want to delete this column? All tasks in it will be deleted.')) {
      return;
    }

    try {
      await fetch(`${API_URL}/api/column-delete/${columnId}/`, {
        method: 'DELETE',
      });
      fetchColumns();
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const handleAddColumn = async (e) => {
    e.preventDefault();
    const title = newColumnTitle.trim();
    if (!title) return;

    try {
      const maxOrder = columns.length > 0 ? Math.max(...columns.map(c => c.order)) : -1;
      await fetch(`${API_URL}/api/column-create/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, order: maxOrder + 1 }),
      });
      fetchColumns();
      setShowAddColumnModal(false);
      setNewColumnTitle('');
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  const handleQuickAddTask = async (columnId, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const title = columnInputs[columnId]?.trim();
      if (!title) return;

      try {
        const response = await fetch(`${API_URL}/api/task-create/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            title,
            column: columnId,
            completed: false
          }),
        });

        if (response.ok) {
          fetchColumns();
          setColumnInputs({ ...columnInputs, [columnId]: '' });
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    } else if (e.key === 'Escape') {
      e.target.blur();
      setColumnInputs({ ...columnInputs, [columnId]: '' });
    }
  };

  const handleColumnInputChange = (columnId, value) => {
    setColumnInputs({ ...columnInputs, [columnId]: value });
  };

  const handleStartEditTask = (task, clickEvent) => {
    setEditingTask(task.id);
    setEditingTaskTitle(task.title);
    setOriginalTaskTitle(task.title);

    requestAnimationFrame(() => {
      const textarea = taskTextareaRef.current;
      if (!textarea) return;

      textarea.focus();

      if (clickEvent) {
        const pos = getCaretIndexFromClick(textarea, task.title, clickEvent);
        textarea.setSelectionRange(pos, pos);
      } else {
        textarea.setSelectionRange(task.title.length, task.title.length);
      }

      autoResizeTextarea({ target: textarea });
    });
  };

  const handleSaveTaskTitle = async (taskId) => {
    const trimmedTitle = editingTaskTitle.trim();
    
    // Only make API call if the title has actually changed
    if (trimmedTitle === originalTaskTitle) {
      setEditingTask(null);
      return;
    }

    if (!trimmedTitle) {
      setEditingTask(null);
      return;
    }

    try {
      await fetch(`${API_URL}/api/task-update/${taskId}/`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title: trimmedTitle }),
      });
      fetchColumns();
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskTitleKeyDown = (taskId, e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveTaskTitle(taskId);
    } else if (e.key === 'Escape') {
      setEditingTask(null);
      setEditingTaskTitle('');
    }
  };

  const autoResizeTextarea = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-logo">📋 Taskboard</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="header-right">
          {profilePhoto && name && (
            <div className="profile-info">
              <img src={profilePhoto} alt="Profile" className="profile-photo" />
              <span className="profile-name">{name}</span>
            </div>
          )}
          <button onClick={signoutHandler} className="signout-btn">
            Sign out
          </button>
        </div>
      </header>

      {/* Board */}
      <div className="board-container">
        <div className="columns-wrapper">
          {columns.map((column) => (
            <div key={column.id} className="column">
              <div className="column-header">
                <div className="column-title-wrapper">
                  {editingColumn === column.id ? (
                    <textarea
                      ref={columnTextareaRef}
                      value={editingColumnTitle}
                      onChange={(e) => {
                        setEditingColumnTitle(e.target.value);
                        autoResizeTextarea(e);
                      }}
                      onBlur={() => handleSaveColumnTitle(column.id)}
                      onKeyDown={(e) => handleColumnTitleKeyDown(column.id, e)}
                      onFocus={(e) => autoResizeTextarea(e)}
                      className="column-title-input"
                      rows="1"
                    />
                  ) : (
                    <>
                      <span className="column-title">{column.title}</span>
                      <span className="column-count">{column.tasks.length}</span>
                    </>
                  )}
                </div>
                <div className="column-actions">
                  <button
                    className="column-action-btn"
                    onClick={() => handleStartEditColumn(column)}
                    title="Rename column"
                  >
                    ✏️
                  </button>
                  <button
                    className="column-action-btn"
                    onClick={() => handleDeleteColumn(column.id)}
                    title="Delete column"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="tasks-list">
                {column.tasks.length === 0 ? (
                  <div className="empty-state">No tasks yet</div>
                ) : (
                  column.tasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task)}
                          className="task-checkbox"
                        />
                        {editingTask === task.id ? (
                          <textarea
                            ref={taskTextareaRef}
                            value={editingTaskTitle}
                            onChange={(e) => {
                              setEditingTaskTitle(e.target.value);
                              autoResizeTextarea(e);
                            }}
                            onBlur={() => handleSaveTaskTitle(task.id)}
                            onKeyDown={(e) => handleTaskTitleKeyDown(task.id, e)}
                            onFocus={(e) => autoResizeTextarea(e)}
                            className="task-title-input"
                            rows="1"
                          />
                        ) : (
                          <div
                            className={`task-title ${task.completed ? 'completed' : ''}`}
                            onClick={(e) => handleStartEditTask(task, e)}
                          >
                            {task.title}
                          </div>
                        )}
                      </div>
                      <button
                        className="task-delete-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id);
                        }}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Add Input */}
              <div className="column-quick-add">
                <input
                  type="text"
                  className="quick-add-input"
                  placeholder="+ Add task (Enter to save, Esc to cancel)"
                  value={columnInputs[column.id] || ''}
                  onChange={(e) => handleColumnInputChange(column.id, e.target.value)}
                  onKeyDown={(e) => handleQuickAddTask(column.id, e)}
                />
              </div>
            </div>
          ))}

          {/* Add Column Button */}
          <button className="add-column-btn" onClick={() => setShowAddColumnModal(true)}>
            <span style={{ fontSize: '1.5rem' }}>+</span>
            Add Column
          </button>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="floating-add-button"
        onClick={() => setShowAddModal(true)}
        title="Add new task"
      >
        +
      </button>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Task</h2>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Task Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter task title..."
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Column</label>
                  <select
                    className="form-select"
                    value={newTask.column}
                    onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
                    required
                  >
                    <option value="">Select a column...</option>
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-btn modal-btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn modal-btn-submit"
                  disabled={!newTask.title || !newTask.column}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Column Modal */}
      {showAddColumnModal && (
        <div className="modal-overlay" onClick={() => setShowAddColumnModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Column</h2>
            </div>
            <form onSubmit={handleAddColumn}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Column Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter column name..."
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-btn modal-btn-cancel"
                  onClick={() => {
                    setShowAddColumnModal(false);
                    setNewColumnTitle('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn modal-btn-submit"
                  disabled={!newColumnTitle.trim()}
                >
                  Add Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
