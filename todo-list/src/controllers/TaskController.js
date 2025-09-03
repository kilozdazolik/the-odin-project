import { Task } from "../models/task.js";

class TaskController {
  constructor() {
    this.tasks = [];
    this.Id = 0;
  }

  addTask(title, description, note, priority, dueDate) {
    const newTask = new Task(
      this.Id++,
      title,
      description,
      note,
      priority,
      dueDate
    );
    this.tasks.push(newTask);
    return newTask;
  }

  viewTasks() {
    console.log(this.tasks);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
  }

  updateTask(taskId, newTitle, newDescription, newPriority, newDueDate) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle ?? task.title;
      task.description = newDescription ?? task.description;
      task.priority = newPriority ?? task.priority;
      task.dueDate = newDueDate ?? task.dueDate;
    }
  }

  getTaskById(id) {
    return this.tasks.find((p) => p.id == id);
  }
}

export const taskController = new TaskController();
