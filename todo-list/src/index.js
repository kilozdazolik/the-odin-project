import { taskController } from "./controllers/TaskController.js";
import { projectController } from "./controllers/projectController.js";
import { projectView } from "./views/projectView.js";
import { navbar } from "./views/navbar.js";
import "./styles/main.css";
import { taskView } from "./views/taskView.js";

projectController.addProject("Home Reno");
projectController.addProject("Office Redesign");
projectController.addProject("Lol");
projectController.addProject("Asd");

projectController.addTaskToProject(
  0,
  "Do homework",
  "Math + English",
  "low",
  "2025-09-01"
);

projectController.addTaskToProject(
  0,
  "Do programming",
  "Math + English",
  "medium",
  "2025-09-10"
);

projectController.addTaskToProject(
  0,
  "Do painting",
  "Math + English",
  "high",
  "2025-09-10"
);

navbar.render();
projectView.render(projectController.projects);

document.getElementById("projects").addEventListener("click", () => {
  projectView.render(projectController.projects);
});

document.addEventListener("click", function (event) {
  const projectId = event.target.closest(".project")?.dataset.id;

  const project = projectController.getProjectById(projectId);
  if (project) {
    taskView.renderProject(project);
  }
});
