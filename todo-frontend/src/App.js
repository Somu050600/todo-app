import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import './App.css';

function App() {

  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    completed: false,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const signoutHandler = () => {
      localStorage.clear();
      googleLogout();
      navigate('/');
  }
  const fetchTasks = () => {
    console.log('Fetching...');

    fetch('http://127.0.0.1:8000/api/task-list/')
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  };

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log('Name:', name);
    console.log('Value:', value);

    setActiveItem({
      ...activeItem,
      title: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ITEM:', activeItem);

    var csrftoken = getCookie('csrftoken');

    var url = 'http://127.0.0.1:8000/api/task-create/';

    if (editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`;
      setEditing(false);
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(activeItem),
    })
      .then((response) => {
        fetchTasks();
        setActiveItem({
          id: null,
          title: '',
          completed: false,
        });
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  };

  const startEdit = (task) => {
    setActiveItem(task);
    setEditing(true);
  };

  const deleteItem = (task) => {
    var csrftoken = getCookie('csrftoken');

    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {
      fetchTasks();
    });
  };

  const strikeUnstrike = (task) => {
    task.completed = !task.completed;
    var csrftoken = getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ completed: task.completed, title: task.title }),
    }).then(() => {
      fetchTasks();
    });

    console.log('TASK:', task.completed);
  };

  return (
    <div className="container">
      <div id="task-container">
        <button onClick={signoutHandler} className='signout-btn'>Sign out</button>
        <div id="form-wrapper">
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
                <input
                  onChange={handleChange}
                  className="form-control"
                  id="title"
                  value={activeItem.title}
                  type="text"
                  name="title"
                  placeholder="Add task.."
                />
                <input
                  id="submit"
                  className="btn"
                  type="submit"
                  name="Add"
                />
            </div>
          </form>
        </div>

        <div id="list-wrapper">
          {todoList.map(function (task, index) {
            return (
              <div key={index} className="task-wrapper task-item flex-wrapper">
                <div
                  onClick={() => strikeUnstrike(task)}
                  style={{ flex: 7 }}
                >
                  {task.completed === false ? (
                    <span>{task.title}</span>
                  ) : (
                    <strike>{task.title}</strike>
                  )}
                </div>

                <div >
                  <button
                    onClick={() => startEdit(task)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>

                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => deleteItem(task)}
                    className="delete-btn"
                  >
                    —
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
