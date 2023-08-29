let btnAddToCart = document.getElementById('addToCart')
let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");
let logoutBtn = document.getElementById("logoutBtn");
let cartIcon = document.getElementById("cartIcon");
let BaseUrl = `https://ecommerce.routemisr.com/api/v1`;

(async function getProductDetails() {
    let id = localStorage.getItem('productId')
    let response = await fetch(`${BaseUrl}/products/${id}`)
    let {data} = await response.json()
    displayData(data)
})()

console.log(btnAddToCart);
function displayData(data) {
    let title = document.getElementById('title')
    let description =document.getElementById('description')
    let price =document.getElementById('price')
    let img = document.getElementsByTagName('img')[0]
    title.innerHTML=`${data.title}`
    description.innerHTML=`${data.description.split(' ').splice(0,30).join(' ')}`
    price.innerHTML=`${data.price} LE`
    img.setAttribute('src',`${data.imageCover}`)



}

async function addToCart(id) {
  if (localStorage.getItem('token')) {
    Swal.fire("Product Added!", "You clicked the button!", "success");

    const response = await fetch(`${BaseUrl}/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: id
      }),
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    });
  
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
  
    const data = await response.json();
    console.log(data);
    return data;
  }else{
    location.href='../login/login.html'
  }

}

  btnAddToCart.addEventListener('click',()=>{
    console.log('asdsadsdadas');
    addToCart(localStorage.getItem('productId'))
  })

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