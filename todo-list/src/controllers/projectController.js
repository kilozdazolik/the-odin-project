import { Project } from "../models/project.js";
import { taskController } from "./TaskController.js";

class ProjectController {
  constructor() {
    this.projects = [];
    this.id = 0;
  }

  addProject(title) {
    const newProject = new Project(this.id++, title);
    this.projects.push(newProject);
  }

  addTaskToProject(projectId, title, description, priority, dueDate) {
    const project = this.getProjectById(projectId);
    if (project) {
      const newTask = taskController.addTask(
        title,
        description,
        priority,
        dueDate
      );
      project.tasks.push(newTask);
    }
  }

  viewProjects() {
    console.log(this.projects);
  }

  getProjectById(id) {
    return this.projects.find((p) => p.id == id);
  }
}

export const projectController = new ProjectController();
