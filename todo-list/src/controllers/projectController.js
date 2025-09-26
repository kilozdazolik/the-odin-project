import { Project } from "../models/project.js";
import { taskController } from "./TaskController.js";
import { storageService } from "../utils/StorageService.js";

class ProjectController {
  constructor() {
    this.projects = [];
    this.id = 0;
    this.loadFromStorage();
  }

  saveToStorage() {
    storageService.saveAppData(
      this.projects,
      this.id,
      taskController.tasks,
      taskController.Id
    );
  }

  loadFromStorage() {
    const data = storageService.loadAppData();

    this.projects = data.projects;
    this.id = data.projectId;

    // Restore tasks to TaskController
    taskController.tasks = data.tasks;
    taskController.Id = data.taskId;
  }

  clearStorage() {
    storageService.clear();
  }

  addProject(title) {
    const newProject = new Project(this.id++, title, []);
    this.projects.push(newProject);
    console.log("New project added:", newProject);
    this.saveToStorage();
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
      this.saveToStorage();
    }
  }

  deleteTaskFromProject(projectId, taskId) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.removeTask(taskId);
      taskController.deleteTask(taskId);
      this.saveToStorage();
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
    this.saveToStorage();
  }

  editProject(projectId, newTitle) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.title = newTitle;
      this.saveToStorage();
    }
  }

  viewProjects() {
    console.log(this.projects);
  }

  updateTaskInProject(
    projectId,
    taskId,
    newTitle,
    newDescription,
    newPriority,
    newDueDate
  ) {
    const project = this.getProjectById(projectId);
    if (project) {
      // Update the task in the TaskController
      taskController.updateTask(
        taskId,
        newTitle,
        newDescription,
        newPriority,
        newDueDate
      );

      // The task in the project should be automatically updated since it's a reference
      // to the same object in TaskController, but let's be explicit about it
      const taskInProject = project.tasks.find((task) => task.id === taskId);
      if (taskInProject) {
        taskInProject.title = newTitle;
        taskInProject.description = newDescription;
        taskInProject.priority = newPriority;
        taskInProject.dueDate = newDueDate;
      }
      this.saveToStorage();
    }
  }

  getAllTasks() {
    const allTasks = [];
    this.projects.forEach((project) => {
      project.tasks.forEach((task) => {
        allTasks.push({
          ...task,
          projectId: project.id,
          projectTitle: project.title,
        });
      });
    });
    return allTasks;
  }

  getProjectById(id) {
    return this.projects.find((p) => p.id == id);
  }
}

export const projectController = new ProjectController();
