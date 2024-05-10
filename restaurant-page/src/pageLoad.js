import homePage from "./pages/homePage.js";
import menuPage from "./pages/menuPage.js";
import aboutPage from "./pages/aboutPage.js";

const home = new homePage();
const menu = new menuPage();
const about = new aboutPage();

export default function pageload() {
  const contentDiv = document.querySelector(".content");
  contentDiv.append(home);
}
