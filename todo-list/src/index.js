import { projectController } from "./controllers/projectController.js";
import { projectView } from "./views/projectView.js";
import { navbar } from "./views/navbar.js";
import "./styles/main.css";
import { taskView } from "./views/taskView.js";
import { storageService } from "./utils/StorageService.js";

// Make storageService available globally for testing
window.storageService = storageService;
window.projectController = projectController;

// Only create sample data if no data exists in localStorage
if (projectController.projects.length === 0) {
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

  projectController.addTaskToProject(
    1,
    "Design office layout",
    "Create floor plan for new office space",
    "high",
    "2025-09-15"
  );

  projectController.addTaskToProject(
    1,
    "Order furniture",
    "Select and order desks and chairs",
    "medium",
    "2025-09-20"
  );

  projectController.addTaskToProject(
    2,
    "Test application",
    "Run all tests and fix bugs",
    "low",
    "2025-09-25"
  );
}

navbar.render();
projectView.render(projectController.projects);

document.getElementById("projects").addEventListener("click", () => {
  projectView.render(projectController.projects);
});

document.getElementById("tasks").addEventListener("click", () => {
  const allTasks = projectController.getAllTasks();
  taskView.renderAllTasks(allTasks);
});

document.addEventListener("click", function (event) {
  // Handle project clicks
  const projectId = event.target.closest(".project")?.dataset.id;
  if (projectId) {
    const project = projectController.getProjectById(projectId);
    if (project) {
      taskView.renderProject(project);
    }
    return;
  }

  // Handle clickable task clicks (from My Tasks view)
  const clickableTask = event.target.closest(".clickable-task");
  if (clickableTask) {
    const projectId = clickableTask.dataset.projectId;
    const project = projectController.getProjectById(projectId);
    if (project) {
      taskView.renderProject(project);
    }
  }
});
