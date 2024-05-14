import Logo from "../images/logo.webp";
import HeroImg1 from "../images/hero1.jpg";
import HeroImg2 from "../images/hero2.jpeg";

const logo = new Image();
const heroImg1 = new Image();
const heroImg2 = new Image();

logo.src = Logo;
heroImg1.src = HeroImg1;
heroImg2.src = HeroImg2;

document.querySelector(".logo").appendChild(logo);
document.querySelector(".hero-imgs").appendChild(heroImg1);
document.querySelector(".hero-imgs").appendChild(heroImg2);
