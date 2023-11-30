("use strict");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const lastName = document.getElementById("last_name");
  const firstName = document.getElementById("first_name");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phone_number");
  const password = document.getElementById("pwd");
  const confPassword = document.getElementById("confirm_pwd");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
  });

  function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const passwordValue = password.value.trim();
    const confPasswordValue = confPassword.value.trim();

    if (firstNameValue === "") {
      setErrorFor(firstName, "* First name cannot be blank!");
    } else {
      setSuccessFor(firstName);
    }

    if (lastNameValue === "") {
      setErrorFor(lastName, "* Last name cannot be blank!");
    } else {
      setSuccessFor(lastName);
    }

    if (emailValue === "") {
      setErrorFor(email, "* Email cannot be blank!");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "* Email is not valid!");
    } else {
      setSuccessFor(email);
    }

    if (phoneNumberValue === "") {
      setErrorFor(phoneNumber, "* Phone number cannot be blank!");
    } else if (!isPhone(phoneNumberValue)) {
      setErrorFor(phoneNumber, "* Phone number is not valid!");
    } else {
      setSuccessFor(phoneNumber);
    }

    if (passwordValue === "") {
      setErrorFor(password, "* Password cannot be blank!");
    } else if (passwordValue.length <= 5) {
      setErrorFor(password, "* Password is too short!");
    } else {
      setSuccessFor(password);
    }

    if (confPasswordValue === "") {
      setErrorFor(confPassword, "* Confirm password cannot be blank!");
    } else if (passwordValue !== confPasswordValue) {
      setErrorFor(confPassword, "* Passwords does not match!");
    } else {
      setSuccessFor(confPassword);
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const span = formControl.querySelector(".span--" + input.id);

    span.innerText = message;
    span.className = "span--" + input.id + " error";
    formControl.className = "form-control error";
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    const span = formControl.querySelector(".span--" + input.id);

    span.innerText = "";
    formControl.className = "form-control success";
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function isPhone(number) {
    return /^\d{10}$/.test(number);
  }
});
