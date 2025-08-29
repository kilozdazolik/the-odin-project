import { Project } from "../models/project.js";
import { taskController } from "./TaskController.js";

class ProjectController {
  constructor() {
    this.projects = [];
    this.id = 0;
  }

  addProject(title) {
    const newProject = new Project(this.id++, title, []);
    this.projects.push(newProject);
    console.log("New project added:", newProject);
    return newProject;
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
      project.addTask(newTask);
    }
  }

  deleteTaskFromProject(projectId, taskId) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.removeTask(taskId);
      taskController.deleteTask(taskId);
    }
  }

  deleteProject(projectId) {
    console.log(
      "Before delete:",
      this.projects.map((p) => p.id)
    );
    this.projects = this.projects.filter((p) => p.id !== projectId);
    console.log(
      "After delete:",
      this.projects.map((p) => p.id)
    );
  }

  editProject(projectId, newTitle) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.title = newTitle;
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
