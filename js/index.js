const endpoint = "https://dummyjson.com/products";
const container = document.querySelector(".front-products");

console.log("JS loaded");
console.log("container:", container);

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log("hele data:", data);
      showData(data);
    });
}

function createProductCard(product, index) {
  const isSale = index % 3 === 0;
  const isSoldOut = index % 5 === 0;

  let priceMarkup = `<p class="front-product-price">€${product.price.toFixed(2)}</p>`;

  if (isSale) {
    const oldPrice = (product.price * 1.5).toFixed(2);

    priceMarkup = `
      <p class="front-product-price">
        <span class="old-price">€${oldPrice}</span>
        <span class="new-price">€${product.price.toFixed(2)}</span>
      </p>
    `;
  }

  return `
    <article class="front-product-card ${isSale ? "sale" : ""} ${isSoldOut ? "soldout" : ""}">
      ${isSoldOut ? `<span class="soldout-text">SOLD OUT</span>` : ""}
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        class="front-product-image"
      />
      <div class="front-product-info">
        <h3 class="front-product-title">${product.title}</h3>
        ${priceMarkup}
      </div>
    </article>
  `;
}

function showData(data) {
  console.log("products:", data.products);

  const perfumes = data.products.filter(
    (product) => product.category === "fragrances",
  );

  console.log("perfumes:", perfumes);

  let repeatedProducts = [];

  for (let i = 0; i < 3; i++) {
    repeatedProducts = repeatedProducts.concat(perfumes);
  }

  console.log("repeatedProducts:", repeatedProducts);

  let markup = "";

  repeatedProducts.forEach((product, index) => {
    markup += createProductCard(product, index);
  });

  container.innerHTML = markup;
}

getData();
