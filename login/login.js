let form = document.getElementsByTagName("form")[0];
let email = document.getElementById("email");
let password = document.getElementById("password");
let error = document.getElementById("error");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  login()
});
console.log(form);

async function login() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }
  );
  const data = await response.json();
  console.log(data);
  if (data.message == "success") {
    localStorage.setItem("token", data.token);
    location.href = "../index.html";
  } else {
    error.innerHTML = "incorrect email or password";
  }
}
