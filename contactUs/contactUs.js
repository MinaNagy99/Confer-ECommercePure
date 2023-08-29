let form = document.getElementById("formOfContactUs");
let subject = document.getElementById("subject");
let body = document.getElementById("body");

let name = document.getElementById("name");
let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");
let logoutBtn = document.getElementById("logoutBtn");
let cartIcon = document.getElementById("cartIcon");

logoutBtn.onclick = () => {
  console.log("sdfs");
  localStorage.removeItem("token");
  registerBtn.classList.add("d-none");
  loginBtn.classList.add("d-none");
  logoutBtn.classList.remove("d-none");
  checkIsLogin();
};

function checkIsLogin() {
  if (!localStorage.getItem("token")) {
    logoutBtn.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    registerBtn.classList.remove("d-none");
    cartIcon.classList.add("d-none");
  } else {
    logoutBtn.classList.remove("d-none");
    loginBtn.classList.add("d-none");
    registerBtn.classList.add("d-none");
    cartIcon.classList.remove("d-none");
  }
}
checkIsLogin();
function validationName() {
  let nameError = document.getElementById("nameError");
  let pattern = /^[A-Za-z ]+$/;
  if (pattern.test(name.value)) {
    nameError.classList.add("d-none");
    return true;
  } else {
    nameError.classList.remove("d-none");
    return false;
  }
}
name.addEventListener("input", validationName);
let email = document.getElementById("email");
function validationEmail() {
  let emailError = document.getElementById("emailError");
  let pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (pattern.test(email.value)) {
    emailError.classList.add("d-none");
    return true;
  } else {
    emailError.classList.remove("d-none");
    return false;
  }
}
email.addEventListener("input", validationEmail);

let mySubject = document.getElementById("subject");
function validationSubject() {
  let pattern = /^[A-Za-z0-9\s.,!?_-]+$/;
  let subjectError = document.getElementById("subjectError");
  if (pattern.test(mySubject.value)) {
    subjectError.classList.add("d-none");
    return true;
  } else {
    subjectError.classList.remove("d-none");
    return false;
  }
}
subject.addEventListener("input", validationSubject);
let myBody = document.getElementById("body");
function validationBody() {
  let bodyError = document.getElementById("bodyError");
  let pattern = /^[A-Za-z0-9\s.,!?_-]+$/;
  if (pattern.test(myBody.value)) {
    bodyError.classList.add("d-none");
    return true;
  } else {
    bodyError.classList.remove("d-none");
    return false;
  }
}
myBody.addEventListener("input", validationBody);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validationName() &&
    validationBody() &&
    validationSubject() &&
    validationEmail()
  ) {
    window.open(
      `mailto:minanagykhalefa@gmil.com?subject=${subject.value}&body=${body.value}`
    );
  } else {
  }
});
