import "../styles.css";
import Guy from "../images/skin.png";

function createHomePage() {
  const content = document.querySelector(".content");
  const pageContent = document.createElement("div");
  pageContent.classList.add("page");

  const imgBox = document.createElement("div");
  imgBox.classList.add("content-img");
  content.appendChild(imgBox);
  const img = document.createElement("img");
  img.src = Guy;
  imgBox.appendChild(img);

  const headLine = document.createElement("h3");
  headLine.classList.add("content-heading");
  headLine.textContent = "Our Promise to You.";
  pageContent.appendChild(headLine);

  const boxContent = document.createElement("div");
  boxContent.classList.add("content-box");
  pageContent.appendChild(boxContent);

  const secondHeadLine = document.createElement("h4");
  secondHeadLine.classList.add("content-box-heading");
  secondHeadLine.textContent =
    "Welcome to Cluckin' Bell - Taste the Flavor of Los Santos!";
  boxContent.appendChild(secondHeadLine);

  // <ul> List items.
  const list = document.createElement("ul");
  list.classList.add("content-box-list");
  const data = [
    {
      title: "Experience the Authentic Taste:",
      text: "Step into the world of Los Santos and indulge in our mouthwatering chicken dishes inspired by the iconic Cluckin' Bell. Our recipes are crafted to capture the essence of the city's vibrant flavors.",
    },
    {
      title: "Savor Every Bite:",
      text: "From our crispy fried chicken to our juicy sandwiches, every item on our menu is prepared with care using the freshest ingredients to ensure maximum flavor and satisfaction.",
    },
    {
      title: "A Nostalgic Journey:",
      text: "Take a trip down memory lane as you enjoy our delicious offerings, reminiscent of the beloved fast-food joint from San Andreas.",
    },
  ];

  // Loop through the data and create li elements
  data.forEach((item) => {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = item.title;
    listItem.appendChild(span);
    listItem.appendChild(document.createTextNode(item.text));
    list.appendChild(listItem);
  });
  boxContent.appendChild(list);

  content.appendChild(pageContent);
}

export default createHomePage;
