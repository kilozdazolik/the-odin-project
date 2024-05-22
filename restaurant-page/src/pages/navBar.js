import Logo from "../images/logo.webp";
import HeroImg1 from "../images/hero1.jpg";
import HeroImg2 from "../images/hero2.jpeg";
import createHomePage from "./homePage.js";
import createMenuPage from "./menuPage.js";
import createAboutPage from "./aboutPage.js";

function createNavBar() {
  const logo = new Image();
  const heroImg1 = new Image();
  const heroImg2 = new Image();

  logo.src = Logo;
  heroImg1.src = HeroImg1;
  heroImg2.src = HeroImg2;

  document.querySelector(".logo").appendChild(logo);
  document.querySelector(".hero-imgs").appendChild(heroImg1);
  document.querySelector(".hero-imgs").appendChild(heroImg2);

  document.querySelector(".home").addEventListener("click", () => {
    clearContent();
    createHomePage();
  });

  document.querySelector(".menu").addEventListener("click", () => {
    clearContent();
    createMenuPage();
  });

  document.querySelector(".about").addEventListener("click", () => {
    clearContent();
    createAboutPage();
  });
}

function clearContent() {
  const content = document.querySelector(".content");
  const pageContent = document.querySelector(".page");
  const imgBox = document.querySelector(".content-img");
  if (pageContent) {
    content.removeChild(pageContent);
    if (imgBox) {
      content.removeChild(imgBox);
    }
  }
}

export default createNavBar;
