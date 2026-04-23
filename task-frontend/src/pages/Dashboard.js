import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await API.post("tasks/", { title, completed: false });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`tasks/${id}/`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await API.put(`tasks/${task.id}/`, {
      title: task.title,
      completed: !task.completed,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 return (
  <div className="container">
    <h2>Dashboard</h2>

    <div className="input-group">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>
    </div>

    {tasks.map((t) => (
      <div key={t.id} className="task">
        <div className="task-header">
          <span>{t.title}</span>
          <span className={t.completed ? "done" : "pending"}>
            {t.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="task-actions">
          <button onClick={() => toggleComplete(t)}>Toggle</button>
          <button className="delete" onClick={() => deleteTask(t.id)}>
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default Dashboard;