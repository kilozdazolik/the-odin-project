import { Task } from "../models/task.js";

class TaskController {
  constructor() {
    this.tasks = [];
    this.nextId = 0;
  }

  addTask(title, description, note, prioirty, dueDate) {
    const newTask = new Task(
      this.nextId++,
      title,
      description,
      note,
      prioirty,
      dueDate
    );
    this.tasks.push(newTask);
    console.log("task added");
  }

  //Console help
  viewTasks() {
    console.log(this.tasks);
  }

  //TODO: Delete task
  deleteTask() {
    const id = prompt("give me id baby");
    this.tasks.splice(id, 1);
  }
  //TODO: Update task
}

export const taskController = new TaskController();
