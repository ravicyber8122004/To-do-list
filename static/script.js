async function fetchTasks() {
  const res = await fetch('/tasks');
  const data = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  data.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong>
        <span class="task-meta">${task.category} • ${task.timestamp}</span>
      </div>
      <button onclick="deleteTask(${i})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const timestamp = new Date().toLocaleString();

  if (!title.trim()) return;

  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, category, timestamp })
  });

  document.getElementById('title').value = '';
  fetchTasks();
}

async function deleteTask(index) {
  await fetch(`/tasks/${index}`, { method: 'DELETE' });
  fetchTasks();
}

window.onload = fetchTasks;
