/* ==========================================================================
   Blueprint — app logic
   Plain JS, in-memory state only (no localStorage), progressively enhances
   the semantic HTML already in index.html.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Nav toggle (mobile) ---------- */

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile nav after a link is chosen
  primaryNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && primaryNav.classList.contains("is-open")) {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Task board state ---------- */

  /** @type {{id:number, title:string, priority:'low'|'medium'|'high', done:boolean}[]} */
  let tasks = [
    { id: 1, title: "Sketch the low-fidelity wireframe", priority: "high", done: false },
    { id: 2, title: "Pick the type pairing", priority: "medium", done: true },
    { id: 3, title: "Wire up the mobile nav toggle", priority: "low", done: false },
  ];

  let nextId = tasks.length + 1;
  let currentFilter = "all"; // 'all' | 'active' | 'done'

  const taskForm = document.getElementById("taskForm");
  const taskTitleInput = document.getElementById("taskTitle");
  const taskPrioritySelect = document.getElementById("taskPriority");
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");
  const formError = document.getElementById("formError");

  const statTotal = document.getElementById("statTotal");
  const statActive = document.getElementById("statActive");
  const statDone = document.getElementById("statDone");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const clearDoneBtn = document.getElementById("clearDone");

  /* ---------- Rendering ---------- */

  function getVisibleTasks() {
    if (currentFilter === "active") return tasks.filter((t) => !t.done);
    if (currentFilter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }

  function render() {
    const visible = getVisibleTasks();

    taskList.innerHTML = "";

    visible.forEach((task) => {
      const li = document.createElement("li");

      const article = document.createElement("article");
      article.className = "task-card" + (task.done ? " is-done" : "");
      article.dataset.priority = task.priority;

      article.innerHTML = `
        <input
          type="checkbox"
          class="task-check"
          ${task.done ? "checked" : ""}
          aria-label="Mark \u201c${escapeHtml(task.title)}\u201d as ${task.done ? "active" : "done"}"
        />
        <div class="task-body">
          <p class="task-title">${escapeHtml(task.title)}</p>
          <div class="task-meta">
            <span class="priority-tag">${task.priority}</span>
          </div>
        </div>
        <button type="button" class="task-delete" aria-label="Delete \u201c${escapeHtml(task.title)}\u201d">
          &times;
        </button>
      `;

      article.querySelector(".task-check").addEventListener("change", () => toggleDone(task.id));
      article.querySelector(".task-delete").addEventListener("click", () => deleteTask(task.id));

      li.appendChild(article);
      taskList.appendChild(li);
    });

    emptyState.hidden = visible.length !== 0;
    emptyState.textContent =
      tasks.length === 0
        ? "Nothing on the board yet. Add your first task above."
        : `No ${currentFilter} tasks right now.`;

    updateStats();
  }

  function updateStats() {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    statTotal.textContent = String(total);
    statActive.textContent = String(total - done);
    statDone.textContent = String(done);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------- Actions ---------- */

  function addTask(title, priority) {
    tasks.push({ id: nextId++, title, priority, done: false });
    render();
  }

  function toggleDone(id) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter((t) => !t.done);
    render();
  }

  function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    render();
  }

  /* ---------- Events ---------- */

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskTitleInput.value.trim();

    if (!title) {
      formError.hidden = false;
      taskTitleInput.focus();
      return;
    }

    formError.hidden = true;
    addTask(title, taskPrioritySelect.value);
    taskForm.reset();
    taskPrioritySelect.value = "medium";
    taskTitleInput.focus();
  });

  taskTitleInput.addEventListener("input", () => {
    if (!formError.hidden) formError.hidden = true;
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  clearDoneBtn.addEventListener("click", clearCompleted);

  /* ---------- Init ---------- */

  render();
})();