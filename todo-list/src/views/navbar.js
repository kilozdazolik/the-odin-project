export const navbar = {
  render() {
    const container = document.querySelector(".container");
    const nav = document.createElement("nav");
    nav.classList.add("user-nav");

    nav.innerHTML = `
        <div class="left-section">
          <div class="logo">
            <svg class="logo__icon">
              <use xlink:href="img/sprite.svg#icon-database"></use>
            </svg>
            <p class="logo__text">TaskMaster</p>
          </div>
          <ul class="user-nav-items">
            <li class="user-nav__item"><a href="#" id="tasks">My Tasks</a></li>
            <li class="user-nav__item"><a href="#" id="projects">Projects</a></li>
          </ul>
        </div>
        <div class="right-section">
          <div class="user-widgets">
            <button class="notification__button">
              <svg class="notification__icon">
                <use xlink:href="img/sprite.svg#icon-bell"></use>
              </svg>
            </button>

            <div class="user-widgets__user">
              <img
                src="img/avatar.jpg"
                alt="User photo"
                class="user-widgets__user-photo"
              />
            </div>
          </div>
        </div>`;

    container.prepend(nav);
  },
};
