let BaseUrl = `https://ecommerce.routemisr.com/api/v1`;
let containerCart = document.getElementsByClassName("container-Cart")[0];
let token = localStorage.getItem("token");
let containTotalPrice = document.getElementsByClassName('totalPrice')
let numOfItem=document.getElementsByClassName('numOfItem')
let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");
let logoutBtn = document.getElementById("logoutBtn");
let cartIcon = document.getElementById("cartIcon");
// ==================getcart ======================
async function getCart() {
  let response = await fetch(`${BaseUrl}/cart`, {
    method: "GET",
    headers: {
      token: token
    }
  });
  let { data } = await response.json();
  return data.products;
}
(async () => {
  let result = await getCart();
  displayCart(result);
   calcTotalPrice(result)
})();

//======calcTotalPrice=====
function calcTotalPrice(products) {
  let total = 0
  products.map((item)=>{
    total+=item.price*item.count
  })
  containTotalPrice[0].innerHTML= `${total} LE`;
  containTotalPrice[1].innerHTML=`${total} LE`
 
}
  
// ============display cart ================================
function displayCart(arr) {
  containerCart.innerHTML = ``;
  arr.map((item) => {
    let div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("bg-mainSecondColor");

    div.classList.add("my-3");

    console.log(item.product.title.split(" ").splice(0, 2).join(" "));
    div.innerHTML = `      <div class=" w-25 p-3  center-center">
      <img class="w-100" src=${item.product.imageCover} alt="">
     </div>
      <div class=" center-center flex-column flex-grow-1 ">
        <p class="text-muted fw-semibold">${item.product.category.name}</p>
        <p class="fw-semibold">${item.product.title
          .split(" ")
          .splice(0, 2)
          .join(" ")}</p>
      </div>
      <div class="  flex-grow-1 d-flex justify-content-evenly align-items-center">
        <p onclick="decreaseCount('${item.product._id}','${
          item.count
        }')" class="fs-4 cursor-pointer">-</p>
        <p class="fw-bold containCout rounded-2">${item.count}</p>
        <p onclick="increaseCount('${item.product._id}','${
      item.count
    }')" class="fs-4 cursor-pointer">+</p>

      </div>
      <div class=" center-center flex-grow-1">
        <p class="fw-semibold">
          <span class="text-danger">${item.price}</span
          ><span class="fw-semibold"> L.E</span>
        </p>  
       </div>
       <div class=" center-center flex-grow-1">
        <button  onclick="deleteProduct('${
          item.product._id
        }')" class="btn btn-close"></button>
       </div>
       `;

    containerCart.append(div);
  });
  numOfItem[0].innerHTML=`${arr.length} items`
  numOfItem[1].innerHTML=`ITEMS ${arr.length}`

}

//=====increase count ===============
async function increaseCount(id, count) {
count++


  const response = await fetch(`${BaseUrl}/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      count: count++
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
  (async () => {
    let result = await getCart();
    displayCart(result);
    calcTotalPrice(result)
  })();

  return data;
}
//=====decrease count ===============
async function decreaseCount(id, count) {
  if (count==1) {
    deleteProduct(id)
    return
  }


  const response = await fetch(`${BaseUrl}/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      count: count-1
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
  (async () => {
    let result = await getCart();
    displayCart(result);
    calcTotalPrice(result)

  })();

  return data;
}
// ==============delete product============
async function deleteProduct(id) {
  swal.fire({
    title: "Product Deleted!",
    text: "You clicked the button!",
    icon: "warning",
  });

  const response = await fetch(`${BaseUrl}/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Request failed with status " + response.status);
  }

  const data = await response.json();
  (async () => {
    let result = await getCart();
    displayCart(result);
    calcTotalPrice(result)

  })();

  return data;
}


logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  registerBtn.classList.add("d-none");
  loginBtn.classList.add("d-none");
  logoutBtn.classList.remove("d-none");
  location.href='http://127.0.0.1:5500/login/login.html'

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