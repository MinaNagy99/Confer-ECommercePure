let imgSlider = document.getElementById("imgSlider");
let nextImg = document.getElementById("nextImg");
let preImg = document.getElementById("preImg");
let containProducts = document.querySelector(".containProducts");
let containCategories = document.querySelector(".containCategories");
let searchValue = document.getElementById("search");
let sort = document.getElementById("sort");
let star = document.getElementById("star");
let BaseUrl = `https://ecommerce.routemisr.com/api/v1`;
let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");
let logoutBtn = document.getElementById("logoutBtn");
let cartIcon = document.getElementById("cartIcon");

async function getProduct() {
  let response = await fetch(`${BaseUrl}/products`);
  let { data } = await response.json();
  return data;
}
async function sorting(tirm) {
  if (tirm == "low") {
    let response = await fetch(`${BaseUrl}/products/?sort=price`);
    let { data } = await response.json();
    displayProducts(data);
    return;
  }
  if (tirm == "high") {
    let response = await fetch(`${BaseUrl}/products?sort=-price`);
    let { data } = await response.json();
    displayProducts(data);
    return;
  }
  if (tirm == "rating") {
    let response = await fetch(`${BaseUrl}/products?sort=rating`);
    let { data } = await response.json();
    displayProducts(data);
    return;
  }
}
sort.addEventListener("click", () => {
  sorting(sort.value);
});

function search(data, tirm) {
  document.documentElement.scrollTop = 1400;

  return data.filter((item) => {
    return item.title.toLowerCase().startsWith(tirm.toLowerCase());
  });
}
async function categoryFilter(id) {
  let products = await getProduct();
  let result = products.filter((item) => {
    return item.category._id == id;
  });
  displayProducts(result);
  document.documentElement.scrollTop = 1400;
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
    location.href='login/login.html'
  }

}

searchValue.addEventListener("input", async () => {
  let products = await getProduct();
  let searchResult = search(products, searchValue.value);
  displayProducts(searchResult);
});

//============display product =======================================
function displayProducts(products) {
  containProducts.innerHTML = "";
  products.map((elm) => {
    let productCard;
    productCard = document.createElement("div");
    let rating = document.createElement("div");
    rating.classList.add("rating");
    rating.innerHTML = `<i id="star" class="fa-solid fa-star">4</i>`;
    productCard.classList.add("col-md-3");
    productCard.classList.add("onhover2");
    productCard.prepend(rating);

    productCard.classList.add("g-2");

    productCard.innerHTML = `          <div
    class="item cursol-pointer p-3 bg-white border border-2 rounded-4 position-relative d-flex flex-column justify-content-center"
    onclick="setProductId('${elm._id}')"
  >
    <a
      class="style-none cursol-pointer"
      href="productDetails/productDetails.html"
    >
      <img
        class="w-100 img-product p-4 m-auto rounded-5"
        src="${elm.imageCover}"
        alt=""
      />
    </a>
    <p class="text-center beforeName">${elm.brand.name}</p>
    <p class="nameOfItem">
      ${elm.title.split(" ").splice(0, 3).join(" ")}
    </p>
    <p class="price">${elm.price} L.E</p>
    <div class="d-flex lineAddToCart w-100 border border-1  border-dark rounded-3">
      <div class="wishlist ">
        <i class="fa-regular fa-eye"></i>
      </div>

      <button onclick="addToCart('${
        elm._id
      }')"  class="btn btn-dark flex-grow-1">
        Add to cart
      </button>
      <div class="wishlist ">
        <i class="fa-regular fa-heart"></i>
      </div>
    </div>
  </div>`;
    containProducts.appendChild(productCard);
  });
}
// ===========call get product ====================
getProduct().then((data) => {
  displayProducts(data);
});
//---------------------------------------------------------
function setProductId(id) {
  localStorage.setItem("productId", `${id}`);
}

// =========== get categories=============
let categories;
async function getCategories() {
  let response = await fetch(`${BaseUrl}/categories`);
  const { data } = await response.json();
  categories = [...data];
  categories.map((elm) => {});

  dispalyCategories();
}
// ============= display categories================
function dispalyCategories() {
  categories.map((elm) => {
    let category = document.createElement("div");
    category.classList.add("col-md-3");
    category.innerHTML = `
              
   
    <div onclick="categoryFilter('${elm._id}')" class="item position-relative">
      <div class="layer-category d-flex justify-content-center align-items-center">
        <p class="fs-2  text-light fw-bold"> <span>${
          elm.name.split(" ")[0]
        } </span>${elm.name.split(" ").splice(1, 3).join(" ")}</p>
      </div>
      <img class="img-category w-100" src="${elm.image}" alt="">
    </div>
 

`;
    containCategories.append(category);
  });
}

getCategories();

// //----------------------------------------------------------------
let i = 1;
function next() {
  i++;
  if (i == 7) {
    i = 1;
  }
  $("#imgSlider").animate(
    {
      width: "0px",
      opacity: 0
    },
    "fast"
  );
  $("#imgSlider").animate(
    {
      width: "900px",
      opacity: 1
    },
    "fast"
  );
  $("#imgSlider").attr("src", `imgs/${i}.jpeg`);
}

function pre() {
  if (i == 1) {
    i = 7;
  }
  i--;
  $("#imgSlider").animate(
    {
      width: "0px",
      opacity: 0
    },
    "fast"
  );
  $("#imgSlider").animate(
    {
      width: "900px",
      opacity: 1
    },
    "fast"
  );
  $("#imgSlider").attr("src", `imgs/${i}.jpeg`);
}
function slideImgs() {
  setInterval(() => {
    next();
  }, 3000);
}
slideImgs();

nextImg.addEventListener("click", next);
preImg.addEventListener("click", pre);

window.addEventListener("scroll", () => {
  if (window.scrollY > 1500) {
    document.getElementsByClassName("btnUp")[0].classList.remove("d-none");
  } else {
    document.getElementsByClassName("btnUp")[0].classList.add("d-none");
  }
});
document.getElementsByClassName("btnUp")[0].addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});

logoutBtn.onclick = () => {
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
