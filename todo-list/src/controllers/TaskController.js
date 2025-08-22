import { Task } from "../models/task.js";

class TaskController {
  constructor() {
    this.tasks = [];
    this.Id = 0;
  }

  addTask(title, description, priority, dueDate) {
    const newTask = new Task(this.Id++, title, description, priority, dueDate);
    this.tasks.push(newTask);
    console.log("task added");
  }

  //Console help
  viewTasks() {
    console.log(this.tasks);
  }

  //TODO: Delete task
  deleteTask() {
    const id = Number(prompt("give me id"));
    this.tasks = this.tasks.filter((item) => item.id !== id);
    console.log(`Task with ID ${id} deleted`);
  }
  //TODO: Update task
  updateTask(newTitle, newDescription, newPrioirty, newDueDate) {}
}

export const taskController = new TaskController();
