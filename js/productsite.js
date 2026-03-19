const params = new URLSearchParams(window.location.search);
const productId = params.get("id") || 1;
const isSale = params.get("sale") === "true";
const isSoldOut = params.get("soldout") === "true";

const productGrid = document.querySelector(".product-site-grid");
const image = document.querySelector(".product-site-image");
const breadcrumb = document.querySelector(".breadcrumb");
const title = document.querySelector(".product-description h1");
const description = document.querySelector(".product-text");
const price = document.querySelector(".product-site-price");
const infoContent = document.querySelectorAll(".product-dropdown-content p");
const addToCartButton = document.querySelector(".add-to-cart-button");

console.log("Product ID:", productId);

function getProductData() {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kunne ikke hente produktdata");
      }
      return response.json();
    })
    .then((product) => {
      console.log("JSON data:", product);
      showProduct(product);
    })
    .catch((error) => {
      console.log("Fejl:", error);

      if (title) title.textContent = "Product not found";
      if (description)
        description.textContent = "Kunne ikke hente produktdata.";
      if (productGrid) productGrid.style.visibility = "visible";
    });
}

function showProduct(product) {
  if (breadcrumb) {
    breadcrumb.textContent = `${product.category} - ${product.brand}`;
  }

  if (title) {
    title.textContent = product.title;
  }

  if (description) {
    description.textContent = product.description;
  }

  if (price) {
    if (isSale) {
      const oldPrice = (product.price * 1.5).toFixed(2);

      price.innerHTML = `
        <span class="old-price">€${oldPrice}</span>
        <span class="new-price">€${product.price.toFixed(2)}</span>
      `;
    } else {
      price.textContent = `€${product.price.toFixed(2)}`;
    }
  }

  if (addToCartButton) {
    if (isSoldOut) {
      addToCartButton.textContent = "SOLD OUT";
      addToCartButton.disabled = true;
    } else {
      addToCartButton.textContent = "Add to your cart";
      addToCartButton.disabled = false;
    }
  }

  if (infoContent[0]) {
    infoContent[0].innerHTML = `
      ${product.title} by ${product.brand}<br>
      Rating: ${product.rating}<br>
      Stock: ${product.stock}
    `;
  }

  if (infoContent[1]) {
    infoContent[1].innerHTML = `
      Alcohol, Fragrance, Limonene, Linalool, Citral
    `;
  }

  document.title = product.title;

  if (image) {
    image.onload = () => {
      if (productGrid) {
        productGrid.style.visibility = "visible";
      }
    };

    image.src = product.thumbnail;
    image.alt = product.title;
  } else {
    if (productGrid) {
      productGrid.style.visibility = "visible";
    }
  }
}

getProductData();
