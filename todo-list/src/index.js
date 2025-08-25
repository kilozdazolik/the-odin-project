import { taskController } from "./controllers/TaskController.js";
import { projectController } from "./controllers/projectController.js";
import { projectView } from "./views/projectView.js";
import { navbar } from "./views/navbar.js";
import "./styles/main.css";
import { taskView } from "./views/taskView.js";

const dialog = document.querySelector(".dialog");
const closeDialogBtn = document.getElementById("dialog-close");
const pushDialogBtn = document.getElementById("dialog-push");
const projectTitle = document.getElementById("ptitle");

projectController.addProject("Home Reno");
projectController.addProject("Office Redesign");
projectController.addProject("Lol");
projectController.addProject("Asd");
projectController.viewProjects();

projectController.addTaskToProject(
  0,
  "Do homework",
  "Math + English",
  "High",
  "2025-09-01"
);

projectController.addTaskToProject(
  0,
  "Do painting",
  "Math + English",
  "High",
  "2025-09-10"
);

navbar.render();

document.getElementById("projects").addEventListener("click", () => {
  projectView.render(projectController.projects);
});

function closeProjectDialog() {
  projectTitle.value = "";
  dialog.close();
}

closeDialogBtn.addEventListener("click", closeProjectDialog);

pushDialogBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = projectTitle.value.trim();
  if (!title) return;
  projectController.addProject(title);
  projectView.render(projectController.projects);
  closeProjectDialog();
});

document.addEventListener("click", function (event) {
  const projectId = event.target.closest(".project")?.dataset.id;

  const project = projectController.getProjectById(projectId);
  if (project) {
    taskView.render(project);
  }
});
