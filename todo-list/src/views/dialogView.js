import { projectController } from "../controllers/projectController";
import { projectView } from "../views/projectView.js";
import { taskController } from "../controllers/TaskController.js";
import { taskView } from "../views/taskView.js";

const dialog = document.querySelector(".dialog");
const dialogContent = dialog.querySelector(".dialog-content");

function closeDialog() {
  dialog.close();
}

export function showNewTaskDialog(projectId) {
  dialogContent.innerHTML = `
    <h2 class="dialog-header">New task</h2>
    <form class="dialog-form">
      <label class="dialog-input__title" for="ttitle">Task title</label>
      <input type="text" id="ttitle" name="ttitle" />
      <label class="dialog-input__description" for="tdescription">Task description</label>
      <textarea id="tdescription" name="tdescription"></textarea>
      <label class="dialog-input__priority" for="tpriority">Task priority</label>
      <select id="tpriority" name="tpriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label class="dialog-input__due-date" for="tdue-date">Due date</label>
      <input type="date" id="tdue-date" name="tdue-date" />
      <div class="dialog-buttons">
        <button class="page__button" id="dialog-push">Create</button>
        <button class="page__button dialog-close-btn" type="button">Cancel</button>
      </div>
    </form>
  `;

  dialogContent.querySelector("#dialog-push").addEventListener("click", (e) => {
    e.preventDefault();

    const title = dialogContent.querySelector("#ttitle").value.trim();
    const description = dialogContent
      .querySelector("#tdescription")
      .value.trim();
    const priority = dialogContent.querySelector("#tpriority").value;
    const dueDate = dialogContent.querySelector("#tdue-date").value;

    if (title) {
      projectController.addTaskToProject(
        projectId,
        title,
        description,
        priority,
        dueDate
      );

      const project = projectController.getProjectById(projectId);
      taskView.renderProject(project);
      closeDialog();
    }
  });
  dialogContent
    .querySelector(".dialog-close-btn")
    .addEventListener("click", closeDialog);
  dialog.showModal();
}

export function showTaskDialog(taskId, projectId) {
  const task = taskController.getTaskById(parseInt(taskId));

  if (!task) {
    console.error("Task not found:", taskId);
    return;
  }

  dialogContent.innerHTML = `
    <h2 class="dialog-header">${task.title}</h2>
    <div class="task-content">
      <div class="content-priority">
        <h3 class="content-header">priority</h3>
        <div class="priority-content">
          <div class="task-priority ${task.priority}"></div>
          <p class="priority">${task.priority}</p>
        </div>
      </div>
      <div class="content-description">
        <h3 class="content-header">description</h3>
        <p class="description">${
          task.description || "No description available"
        }</p>
      </div>
      <div class="content-date">
        <h3 class="content-header">Deadline</h3>
        <p class="count">Due: ${task.dueDate || "No deadline"}</p>
      </div>
    </div>
    <div class="dialog-buttons">
      <button class="page__button" id="dialog-edit-task">Edit</button>
      <button class="page__button delete-btn" id="dialog-delete-task">Delete</button>
      <button class="page__button dialog-close-btn" type="button">Close</button>
    </div>
  `;

  dialogContent
    .querySelector("#dialog-edit-task")
    .addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Edit task:", taskId);
      closeDialog();
      // TODO: Implement edit functionality
    });

  dialogContent
    .querySelector("#dialog-delete-task")
    .addEventListener("click", (e) => {
      e.preventDefault();

      const confirmDelete = confirm(
        `Are you sure you want to delete "${task.title}"?`
      );

      if (confirmDelete) {
        projectController.deleteTaskFromProject(
          parseInt(projectId),
          parseInt(taskId)
        );

        const updatedProject = projectController.getProjectById(
          parseInt(projectId)
        );
        if (updatedProject) {
          taskView.renderProject(updatedProject);
        }

        console.log("Task deleted:", taskId);
        closeDialog();
      }
    });

  dialogContent
    .querySelector(".dialog-close-btn")
    .addEventListener("click", closeDialog);

  dialog.showModal();
}

export function showNewProjectDialog() {
  dialogContent.innerHTML = `
    <h2 class="dialog-header">New project</h2>
    <form class="dialog-form">
      <label class="dialog-input__title" for="ptitle">Project title</label>
      <input type="text" id="ptitle" name="ptitle" />
      <div class="dialog-buttons">
        <button class="page__button" id="dialog-push">Create</button>
        <button class="page__button dialog-close-btn" type="button">Cancel</button>
      </div>
    </form>
  `;

  dialogContent.querySelector("#dialog-push").addEventListener("click", (e) => {
    e.preventDefault();
    const projectTitleInput = dialogContent.querySelector("#ptitle");
    const title = projectTitleInput.value.trim();
    if (title) {
      projectController.addProject(title);
      projectView.render(projectController.projects);
      closeDialog();
    }
  });
  dialogContent
    .querySelector(".dialog-close-btn")
    .addEventListener("click", closeDialog);
  dialog.showModal();
}

export function showDeleteProjectDialog(projects) {
  const optionsHtml = projects
    .map((p) => `<option value="${p.id}">${p.title}</option>`)
    .join("");

  dialogContent.innerHTML = `
    <h2 class="dialog-header">Delete project</h2>
    <form class="dialog-form">
      <label class="dialog-input__title" for="dselect">Select project to delete</label>
      <select id="dselect" name="dselect">
        ${optionsHtml}
      </select>
      <div class="dialog-buttons">
        <button class="page__button" id="dialog-delete-btn">Delete</button>
        <button class="page__button dialog-close-btn" type="button">Cancel</button>
      </div>
    </form>
  `;

  dialogContent
    .querySelector("#dialog-delete-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const selectEl = dialogContent.querySelector("#dselect");
      const selectedProjectId = parseInt(selectEl.value, 10);

      console.log(
        "Deleting project id:",
        selectedProjectId,
        typeof selectedProjectId
      );

      if (!isNaN(selectedProjectId)) {
        projectController.deleteProject(selectedProjectId);
        projectView.render(projectController.projects);
        closeDialog();
      }
    });

  dialogContent
    .querySelector(".dialog-close-btn")
    .addEventListener("click", closeDialog);
  dialog.showModal();
}

export function showEditProjectDialog(projects) {
  const optionsHtml = projects
    .map((p) => `<option value="${p.id}">${p.title}</option>`)
    .join("");

  dialogContent.innerHTML = `
    <h2 class="dialog-header">Edit project</h2>
    <form class="dialog-form">
      <label class="dialog-input__title" for="eselect">Select project to edit</label>
      <select id="eselect" name="eselect">
        ${optionsHtml}
      </select>
      <label class="dialog-input__title" for="etitle">New title</label>
      <input type="text" id="etitle" name="etitle" placeholder="Enter new project title" />
      <div class="dialog-buttons">
        <button class="page__button" id="dialog-edit-btn">Save</button>
        <button class="page__button dialog-close-btn" type="button">Cancel</button>
      </div>
    </form>
  `;

  dialogContent
    .querySelector("#dialog-edit-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const selectEl = dialogContent.querySelector("#eselect");
      const selectedProjectId = parseInt(selectEl.value, 10);
      const newTitle = dialogContent.querySelector("#etitle").value.trim();

      console.log(
        "editing project id:",
        selectedProjectId,
        typeof selectedProjectId
      );

      if (!isNaN(selectedProjectId)) {
        if (newTitle) {
          projectController.editProject(selectedProjectId, newTitle);
          projectView.render(projectController.projects);
          closeDialog();
        }
      }
    });

  dialogContent
    .querySelector(".dialog-close-btn")
    .addEventListener("click", closeDialog);

  dialog.showModal();
}
