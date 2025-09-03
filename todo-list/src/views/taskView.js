import { showNewTaskDialog, showTaskDialog } from "./dialogView.js";

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

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("page__button");
    addTaskBtn.id = "openTaskDialog";
    addTaskBtn.textContent = "Add Task";

    headerText.appendChild(pageTitle);
    headerText.appendChild(pageText);
    header.appendChild(headerText);
    header.appendChild(addTaskBtn);

    // Tasks container
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects");

    const tasksHeader = document.createElement("h2");
    tasksHeader.classList.add("projects-header");
    tasksHeader.textContent = "Tasks";
    projectsContainer.appendChild(tasksHeader);

    project.tasks.forEach((task) => {
      // Pass project.id as second parameter
      const taskEl = this.renderTask(task, project.id);
      projectsContainer.appendChild(taskEl);
    });

    section.appendChild(header);
    section.appendChild(projectsContainer);

    const mainContainer = document.querySelector(".container") || document.body;
    mainContainer.appendChild(section);

    addTaskBtn.addEventListener("click", () => showNewTaskDialog(project.id));
  },

  renderTask(task, projectId) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.dataset.taskId = task.id;
    taskDiv.dataset.projectId = projectId;

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

    taskDiv.addEventListener("click", () => {
      const taskId = taskDiv.dataset.taskId;
      const projectIdFromData = taskDiv.dataset.projectId;

      console.log("Clicked task:", {
        taskId: taskId,
        projectId: projectIdFromData,
        fullTaskObject: task,
      });

      showTaskDialog(taskId, projectIdFromData);
    });

    return taskDiv;
  },
};
