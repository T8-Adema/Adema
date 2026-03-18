const endpoint = "https://dummyjson.com/products";
const container = document.querySelector(".front-products");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      showData(data);
    })
    .catch((err) => console.log(err));
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
      <a href="html/productsite.html?id=${product.id}&sale=${isSale}&soldout=${isSoldOut}">
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
      </a>
    </article>
  `;
}

function showData(data) {
  const perfumes = data.products.filter(
    (product) => product.category === "fragrances",
  );

  let repeatedProducts = [];

  for (let i = 0; i < 2; i++) {
    repeatedProducts = repeatedProducts.concat(perfumes);
  }

  let markup = "";

  repeatedProducts.forEach((product, index) => {
    markup += createProductCard(product, index);
  });

  container.innerHTML = markup;
}

getData();
