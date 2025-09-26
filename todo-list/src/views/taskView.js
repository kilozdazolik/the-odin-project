import {
  showNewTaskDialog,
  showEditTaskDialog,
  showDeleteTaskDialog,
} from "./dialogView.js";

export const taskView = {
  renderProject(project) {
    console.log("renderProject kapott projekt:", project);
    const existingSection = document.querySelector(".section-project");
    if (existingSection) existingSection.remove();

    const section = document.createElement("section");
    section.classList.add("section-project");

    // Header
    const header = document.createElement("div");
    header.classList.add("header");

    const headerText = document.createElement("div");
    headerText.classList.add("header-text");

    const pageTitle = document.createElement("h1");
    pageTitle.classList.add("page-title");
    pageTitle.textContent = `Project: ${project.title}`;

    const pageText = document.createElement("p");
    pageText.classList.add("page-text");
    pageText.textContent = `Manage all tasks related to your ${project.title} project.`;

    const taskBtnsContainer = document.createElement("div");
    taskBtnsContainer.classList.add("page-buttons");

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("page__button");
    addTaskBtn.id = "openTaskDialog";
    addTaskBtn.textContent = "Add Task";

    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("page__button");
    editTaskBtn.id = "editTask";
    editTaskBtn.textContent = "Edit Task";

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("page__button");
    deleteTaskBtn.id = "deleteTask";
    deleteTaskBtn.textContent = "Delete Task";

    taskBtnsContainer.appendChild(addTaskBtn);
    taskBtnsContainer.appendChild(editTaskBtn);
    taskBtnsContainer.appendChild(deleteTaskBtn);

    headerText.appendChild(pageTitle);
    headerText.appendChild(pageText);
    header.appendChild(headerText);
    header.appendChild(taskBtnsContainer);

    // Tasks container
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects");

    const tasksHeader = document.createElement("h2");
    tasksHeader.classList.add("projects-header");
    tasksHeader.textContent = "Tasks";
    projectsContainer.appendChild(tasksHeader);

    project.tasks.forEach((task) => {
      const taskEl = this.renderTask(task);
      projectsContainer.appendChild(taskEl);
    });

    section.appendChild(header);
    section.appendChild(projectsContainer);

    const mainContainer = document.querySelector(".container") || document.body;
    mainContainer.appendChild(section);

    addTaskBtn.addEventListener("click", () => showNewTaskDialog(project.id));
    editTaskBtn.addEventListener("click", () => showEditTaskDialog(project));
    deleteTaskBtn.addEventListener("click", () =>
      showDeleteTaskDialog(project)
    );
  },

  renderAllTasks(allTasks) {
    const existingSection = document.querySelector(".section-project");
    if (existingSection) existingSection.remove();

    const section = document.createElement("section");
    section.classList.add("section-project");

    // Header
    const header = document.createElement("div");
    header.classList.add("header");

    const headerText = document.createElement("div");
    headerText.classList.add("header-text");

    const pageTitle = document.createElement("h1");
    pageTitle.classList.add("page-title");
    pageTitle.textContent = "My Tasks";

    const pageText = document.createElement("p");
    pageText.classList.add("page-text");
    pageText.textContent = `All your tasks across all projects. Click on a task to go to its project.`;

    headerText.appendChild(pageTitle);
    headerText.appendChild(pageText);
    header.appendChild(headerText);

    // Tasks container
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("projects");

    const tasksHeader = document.createElement("h2");
    tasksHeader.classList.add("projects-header");
    tasksHeader.textContent = `All Tasks (${allTasks.length})`;
    tasksContainer.appendChild(tasksHeader);

    if (allTasks.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("empty-message");
      emptyMessage.textContent =
        "No tasks found. Create some projects and add tasks to see them here.";
      tasksContainer.appendChild(emptyMessage);
    } else {
      allTasks.forEach((task) => {
        const taskEl = this.renderTaskWithProject(task);
        tasksContainer.appendChild(taskEl);
      });
    }

    section.appendChild(header);
    section.appendChild(tasksContainer);

    const mainContainer = document.querySelector(".container") || document.body;
    mainContainer.appendChild(section);
  },

  renderTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
  <div class="task-details">
    <div class="task-priority ${task.priority}"></div>
    <div class="task-info">
      <p class="task-title">${task.title}</p>
      <p class="task-count">Due: ${task.dueDate || "No deadline"}</p>
    </div>
    </div>
  <div class="task-icon">
    <svg class="task__icon">
      <use xlink:href="img/sprite.svg#icon-circle-right"></use>
    </svg>
  </div>
`;
    return taskDiv;
  },

  renderTaskWithProject(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.classList.add("clickable-task");
    taskDiv.dataset.projectId = task.projectId;
    taskDiv.style.cursor = "pointer";

    taskDiv.innerHTML = `
  <div class="task-details">
    <div class="task-priority ${task.priority}"></div>
    <div class="task-info">
      <p class="task-title">${task.title}</p>
      <p class="task-count">Due: ${task.dueDate || "No deadline"}</p>
      <p class="task-project">Project: ${task.projectTitle}</p>
    </div>
    </div>
  <div class="task-icon">
    <svg class="task__icon">
      <use xlink:href="img/sprite.svg#icon-circle-right"></use>
    </svg>
  </div>
`;
    return taskDiv;
  },
};
