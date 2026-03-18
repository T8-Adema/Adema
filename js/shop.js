
const endpoint = "https://dummyjson.com/products";

const row1 = document.querySelector(".products-row-1");
const row2 = document.querySelector(".products-row-2");
const row3 = document.querySelector(".products-row-3");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData)
    .catch((err) => console.log(err));
}

function createProductCard(product, index) {
  const isSale = index % 3 === 0;
  const isSoldOut = index % 5 === 0;

  let priceMarkup = `<p class="product-price">€${product.price.toFixed(2)}</p>`;

  if (isSale) {
    const oldPrice = (product.price * 1.5).toFixed(2);

    priceMarkup = `
      <p class="product-price">
        <span class="old-price">€${oldPrice}</span>
        <span class="new-price">€${product.price.toFixed(2)}</span>
      </p>
    `;
  }

  return `
    <article class="product-card ${isSale ? "sale" : ""} ${isSoldOut ? "soldout" : ""}">
      ${isSoldOut ? `<span class="soldout-text">SOLD OUT</span>` : ""}
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        class="product-image"
      />

      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        ${priceMarkup}
      </div>
    </article>
  `;
}

function showData(data) {
  console.log(data);

  const perfumes = data.products.filter(
    (product) => product.category === "fragrances",
  );

  let repeatedProducts = [];

  while (repeatedProducts.length < 10) {
    repeatedProducts = repeatedProducts.concat(perfumes);
  }

  repeatedProducts = repeatedProducts.slice(0, 10);

  let markup1 = "";
  let markup2 = "";
  let markup3 = "";

  repeatedProducts.slice(0, 4).forEach((product, index) => {
    markup1 += createProductCard(product, index);
  });

  repeatedProducts.slice(4, 8).forEach((product, index) => {
    markup2 += createProductCard(product, index + 4);
  });

  repeatedProducts.slice(8, 10).forEach((product, index) => {
    markup3 += createProductCard(product, index + 8);
  });

  row1.innerHTML = markup1;
  row2.innerHTML = markup2;
  row3.innerHTML = markup3;
}

getData();
