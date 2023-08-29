let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");
let phone = document.getElementById("phone");

let form = document.getElementsByTagName("form")[0];
let repasswordError = document.getElementById("repasswordError");
let emailError = document.getElementById('emailError')

form.addEventListener("submit", (e) => {
  e.preventDefault();

  register();

  if (password.value != repassword.value) {
    repasswordError.classList.remove("d-none");
  } else {
    repasswordError.classList.add("d-none");
    location.href="../login/login.html"
  }
});

async function register() {

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        rePassword: repassword.value,
        phone: phone.value
      })
    }
  );
  const data = await response.json();
  if (data.message=='success') {
    location.href="/login/login.html"
  }if (data.message=='Account Already Exists') {
    emailError.innerHTML='Account Already Exists'
  }

}
