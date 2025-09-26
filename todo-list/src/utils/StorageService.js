import { Project } from "../models/project.js";

class StorageService {
  constructor() {
    this.storageKey = "todoApp";
  }

  /**
   * Save data to localStorage
   * @param {Object} data - The data object containing projects, tasks, and IDs
   */
  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      console.log("Data saved to localStorage:", data);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  /**
   * Load data from localStorage
   * @returns {Object|null} - The parsed data object or null if no data exists
   */
  load() {
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        const data = JSON.parse(savedData);
        console.log("Data loaded from localStorage:", data);
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  /**
   * Clear all data from localStorage
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log("LocalStorage cleared");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  /**
   * Check if localStorage has saved data
   * @returns {boolean} - True if data exists, false otherwise
   */
  hasData() {
    try {
      return localStorage.getItem(this.storageKey) !== null;
    } catch (error) {
      console.error("Error checking localStorage:", error);
      return false;
    }
  }

  /**
   * Save projects and tasks data
   * @param {Array} projects - Array of project objects
   * @param {number} projectId - Next project ID
   * @param {Array} tasks - Array of task objects
   * @param {number} taskId - Next task ID
   */
  saveAppData(projects, projectId, tasks, taskId) {
    const data = {
      projects,
      projectId,
      tasks,
      taskId,
    };
    this.save(data);
  }

  /**
   * Load and restore projects and tasks data
   * @returns {Object} - Object containing restored projects, projectId, tasks, and taskId
   */
  loadAppData() {
    const data = this.load();
    if (!data) {
      return {
        projects: [],
        projectId: 0,
        tasks: [],
        taskId: 0,
      };
    }

    // Restore projects with proper Project instances
    const restoredProjects = data.projects
      ? data.projects.map((projectData) => {
          const project = new Project(projectData.id, projectData.title, []);
          // Restore tasks to the project
          if (projectData.tasks) {
            project.tasks = projectData.tasks;
          }
          return project;
        })
      : [];

    return {
      projects: restoredProjects,
      projectId: data.projectId || 0,
      tasks: data.tasks || [],
      taskId: data.taskId || 0,
    };
  }
}

// Export a singleton instance
export const storageService = new StorageService();
