const url = "https://jsproject-5bdde-default-rtdb.firebaseio.com/products.json";
const products = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayProducts(data) {
  products.innerHTML = data
    .map(
      (product) =>
        ` <div class="product">
        <img src=${product.img}>
        <span class="name">
        ${product.name}
        </span>
        <span class="name">
        ${product.cat}
        </span>
        <span class="price">$${product.price}</span>
      </div>`
    )
    .join("");
}


function displayCats(data) {
    categoriesContainer.innerHTML = data
      .map(
        (cat) =>
          `<div class="cat">${cat}</div>`
      )
      .join("");
  }

(async () => {
  const data = await getData(url);
  displayProducts(data);
  getCategory(data);
  setPrice(data);
  searchInput.addEventListener("keyup", searchProducts);
})();

async function searchProducts(e) {
  const data = await getData(url);
  let value = e.target.value;
  if (value) {
    let search = data.filter((item) => item.name.includes(value));
    displayProducts(search);
  } else {
    displayProducts(data);
  }
}

function getCategory(data){
  let allCats = data.map(item=>item.cat);
const cats=["All",...allCats.filter((item,i)=>{
    return allCats.indexOf(item)===i;})]
   displayCats(cats);

categoriesContainer.addEventListener('click',selectedCategory);
}

async function selectedCategory(e){
    const data = await getData(url);
    let selected= e.target.textContent;
    if(selected==="All"){
     displayProducts(data);
    }else{
   let filteredData=  data.filter(item=>item.cat===selected);
   displayProducts(filteredData);

    }
}

function setPrice(data){
    let priceList=data.map(product=>product.price);
    console.log(priceList);
  let max=Math.max(...priceList);
let min=Math.min(...priceList);
priceRange.max=max;
priceRange.min=min;
priceRange.value=max;
priceValue.textContent="$"+max;
priceRange.addEventListener("input",searchPrice);
}

async function searchPrice(e){
    const data = await getData(url);
    priceValue.textContent="$"+e.target.value;
    displayProducts(data.filter((item)=>item.price<=e.target.value));
}

