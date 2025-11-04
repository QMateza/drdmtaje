"use strict";

let currentYear = new Date().getFullYear();
let date = document.getElementById("date_now");
date.textContent = currentYear;

/* global variables */
const backToTopButton = document.querySelector("#back-to-top");
const burger = document.querySelector(".burger");
let formValidity = true;
const form = document.getElementById("form");
const errorDiv = document.getElementById("errorMessage");

/* scroll function*/
function scrollFunction() {
  if (window.scrollY > 300) {
    //Show backToTopButton
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  } else {
    //Hide backToTopButton
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

function toggleMenu() {
  const nav = document.querySelector(".nav_links");
  const navLinks = document.querySelectorAll(".nav_links li");
  nav.classList.toggle("nav-active");

  //Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.5
      }s`;
    }
  });

  //Burger animation
  burger.classList.toggle("toggle");
}

// validate required fields
function validateRequired() {
  const inputElements = document.querySelectorAll("#contact .user_input");
  const elementCount = inputElements.length;
  let requiredValidity = true;
  let currentElement;

  try {
    for (let i = 0; i < elementCount; i++) {
      // validate all input elements in fieldset
      currentElement = inputElements[i];
      if (currentElement.value === "") {
        currentElement.style.background = "#ffe9e9";
        requiredValidity = false;
      } else {
        currentElement.style.background = "#ffffff";
      }
    }
    if (requiredValidity === false) {
      throw "Please complete all fields.";
    }
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";
  } catch (msg) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}

// Counters
function counters() {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target"); // ensure it's a number
            let count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc); // round up for smoother effect
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = `${target} +`;
            }
        };
        updateCount();
    });
}


// validate form
function validateForm(evt) {
  if (evt.preventDefault) {
    evt.preventDefault(); //prevent form from submitting
  } else {
    evt.returnValue = false; // prevent form from submitting in IE8
  }
  formValidity = true; // reset value for revalidation
  validateRequired();
  validateNumbers();
  isEmail();
  if (formValidity === true) {
    document.getElementById("form").submit();
  }
}

// validate number fields for older browsers
function validateNumbers() {
  let numberInputs = document.querySelectorAll("#contact input[type=number]");
  let elementCount = numberInputs.length;
  let numErrorDiv = document.getElementById("numErrorText");
  let numbersValidity = true;
  let currentElement;

  try {
    for (let i = 0; i < elementCount; i++) {
      // validate all input elements of type "number" in fieldset
      currentElement = numberInputs[i];
      if (isNaN(currentElement.value) || currentElement.value === "") {
        currentElement.style.background = "#ffe9e9";
        numbersValidity = false;
      } else {
        currentElement.style.background = "#ffffff";
      }
    }
    if (numbersValidity === false) {
      throw "Zip and Social Security values must be numbers.";
    }
    numErrorDiv.style.display = "none";
    numErrorDiv.innerHTML = "";
  } catch (msg) {
    formValidity = false;
  }
}

function isEmail() {
  let email = document.getElementById("email");
  let emailValue = email.value;
  let emailErrorDiv = document.getElementById("emailErrorMessage");
  let emailValidity = true;
  let pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  try {
    if (pattern.test(emailValue) === false) {
      email.style.background = "#ffe9e9";
      emailValidity = false;
    } else {
      email.style.background = "#ffffff";
    }
    if (emailValidity === false) {
      throw "Please enter valid email address.";
    }
    emailErrorDiv.style.display = "none";
    emailErrorDiv.innerHTML = "";
  } catch (msg) {
    emailErrorDiv.style.display = "block";
    emailErrorDiv.innerHTML = msg;
    formValidity = false;
  }
}

function isTelephone() {
  let telephone = document.getElementById("telephone");
  let telephoneValue = telephone.value;
  let telephoneErrorDiv = document.getElementById("telephoneErrorMessage");
  let telephoneValidity = true;
  let pattern = /^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/;

  try {
    if (!pattern.test(telephoneValue)) {
      telephone.style.background = "#ffe9e9";
      telephoneValidity = false;
    } else {
      telephone.style.background = "#ffffff";
    }
    if (telephoneValidity === false) {
      throw "Please enter valid telephone number.";
    }
    telephoneErrorDiv.style.display = "none";
    telephoneErrorDiv.innerHTML = "";
  } catch (msg) {
    telephoneErrorDiv.style.display = "block";
    telephoneErrorDiv.innerHTML = msg;
    formValidity = false;
  }
}

function createEventListeners() {
  if (window.addEventListener) {
    window.addEventListener("scroll", scrollFunction, false);
  } else if (window.attachEvent) {
    window.attachEvent("scroll", scrollFunction);
  }
  if (backToTopButton.addEventListener) {
    backToTopButton.addEventListener("click", smoothScrollBackToTop, false);
  } else if (backToTopButton.attachEvent) {
    backToTopButton.attachEvent("click", smoothScrollBackToTop);
  }
  //Toggle Nav
  if (burger.addEventListener) {
    burger.addEventListener("click", toggleMenu, false);
  } else if (burger.attachEvent) {
    burger.attachEvent("click", toggleMenu);
  }

//  if (form.addEventListener) {
//    form.addEventListener("submit", validateForm, false);
//  } else if (form.attachEvent) {
//    form.attachEvent("onsubmit", validateForm);
//  }

  if(window.addEventListener) {
    window.addEventListener("load", counters, false)
  } else if (window.attachEvent) {
    window.attachEvent("onload", counters);
  }
}

function setUpPage() {
  createEventListeners();
}

if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
  window.addEventListener("load", counters, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage);
}
