export const taskView = {
  render(project) {
    const existingSection = document.querySelector(".section-project");
    if (existingSection) existingSection.remove();

    // Section
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

    // Iterate tasks
    project.tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      taskDiv.innerHTML = `
        <div class="project-details">
          <div class="project-title">${task.title}</div>
          <div class="project-count">Due: ${task.dueDate || "No deadline"}</div>
        </div>
        <div class="project-icon">
          <svg class="task__icon">
            <use xlink:href="img/sprite.svg#icon-circle-right"></use>
          </svg>
        </div>
      `;

      projectsContainer.appendChild(taskDiv);
    });

    // Assemble
    section.appendChild(header);
    section.appendChild(projectsContainer);

    const mainContainer = document.querySelector(".container") || document.body;
    mainContainer.appendChild(section);

    addTaskBtn.addEventListener("click", () => {
      console.log("Task dialog...");
    });
  },
};
