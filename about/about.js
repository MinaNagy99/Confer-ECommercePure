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
    checkIsLogin()
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