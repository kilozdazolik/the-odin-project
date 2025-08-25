const projectTitle = document.getElementById("ptitle");
const dialog = document.querySelector(".dialog");

export const projectView = {
  render(projects) {
    const existingSection = document.querySelector(".section-project");
    if (existingSection) existingSection.remove();

    const section = document.createElement("section");
    section.classList.add("section-project");

    const header = document.createElement("div");
    header.classList.add("header");

    const title = document.createElement("h1");
    title.classList.add("page-title");
    title.textContent = "My Projects";

    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("page__button");
    newProjectBtn.id = "openDialog";
    newProjectBtn.textContent = "New Project";

    header.appendChild(title);
    header.appendChild(newProjectBtn);

    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects");

    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
      projectDiv.dataset.id = project.id;

      projectDiv.innerHTML = `
        <div class="project-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"></path>
          </svg>
        </div>
        <div class="project-details">
          <div class="project-title">${project.title}</div>
          <div class="project-count">${
            project.tasks.length === 0
              ? "Empty"
              : project.tasks.length + " task"
          }</div>
        </div>
      `;

      projectsContainer.appendChild(projectDiv);
    });

    section.appendChild(header);
    section.appendChild(projectsContainer);

    const mainContainer = document.querySelector(".container") || document.body;
    mainContainer.appendChild(section);

    newProjectBtn.addEventListener("click", showProjectDialog);
  },
};

function showProjectDialog() {
  projectTitle.value = "";
  dialog.showModal();
}
