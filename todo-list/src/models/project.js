export class Project {
  constructor(id, title, tasks = []) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }

    addTask(task) {
    this.tasks.push(task);
  }

    removeTask(taskId) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
  }
}
