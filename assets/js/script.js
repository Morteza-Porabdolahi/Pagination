const products = [
  { price: 40000 },
  { price: 50000 },
  { price: 60000 },
  { price: 7000 },
  { price: 9000 },
  { price: 2000 },
  { price: 1000 },
  { price: 4000 },
  { price: 100000 },
  { price: 200000 },
  { price: 900000 },
  { price: 12000000 },
  { price: 8020000 },
  { price: 850000 },
  { price: 92000000 },
];
const perPageElem = document.querySelector(".per-page");
const productsContainer = document.querySelector(".products");
const paginationElem = document.querySelector(".pagination");

let perPage = 3;
let currentPage = 1;

perPageElem.addEventListener("change", setPerPage);
window.addEventListener("load", () => createPaginationElements(perPage));

function setPerPage(e) {
  perPage = +e.target.value;
  createPaginationElements(perPage);
}

function createPaginationElements(perPage) {
  const pages = Math.ceil(products.length / perPage);
  let currentLiElement, currentAnchor;

  paginationElem.innerHTML = "";

  for (let i = 1; i <= pages; i++) {
    currentLiElement = document.createElement("li");
    currentAnchor = `<a class="page-link" href="#">${i}</a>`;

    currentLiElement.className = i === 1 ? "page-item active" : "page-item";
    currentLiElement.innerHTML = currentAnchor;
    currentLiElement.addEventListener("click", (e) => setCurrentPage(e, i));

    paginationElem.append(currentLiElement);
  }
  sliceProducts(perPage, 1);
}

function setCurrentPage(e, i, liElements) {
  let lastElementActived = document.querySelector("li.active");
  let clickedLi = e.target.parentElement;

  currentPage = i;
  sliceProducts(perPage, currentPage);

  lastElementActived.classList.remove("active");
  clickedLi.classList.add("active");
}

function sliceProducts(perPage, currentPage) {
  const pages = Math.ceil(products.length / perPage);
  const startIndex = currentPage * perPage - perPage;
  const slicedProducts = products.slice(startIndex, startIndex + perPage);

  createProducts(slicedProducts);
}

function createProducts(slicedProducts) {
  let productElem, pTag, buyBtn;

  productsContainer.innerHTML = "";

  slicedProducts.forEach((product) => {
    productElem = document.createElement("section");
    pTag = document.createElement("p");
    buyBtn = document.createElement("button");

    buyBtn.textContent = "Buy";
    pTag.textContent = `$${product.price}`;

    productElem.className = "product";
    buyBtn.className = "product-btn";

    productElem.append(pTag, buyBtn);

    productsContainer.append(productElem);
  });
}
