const endpoint = "https://dummyjson.com/products";
const container = document.querySelector(".front-products");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log("hele data:", data);
      showData(data);
    });
}

function showData(data) {
  console.log("products:", data.products);

  const perfumes = data.products.filter(
    (product) => product.category === "fragrances",
  );

  console.log("perfumes:", perfumes);
  console.log("container:", container);

  let repeatedProducts = [];

  for (let i = 0; i < 3; i++) {
    repeatedProducts = repeatedProducts.concat(perfumes);
  }

  let markup = "";

  repeatedProducts.forEach((product) => {
    markup += `
      <article class="front-product-card">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="front-product-image"
        />
        <div class="front-product-info">
          <h3 class="front-product-title">${product.title}</h3>
          <p class="front-product-price">€${product.price.toFixed(2)}</p>
        </div>
      </article>
    `;
  });

  container.innerHTML = markup;
}

getData();
