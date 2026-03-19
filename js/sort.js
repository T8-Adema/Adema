document.addEventListener("DOMContentLoaded", async () => {
  const endpoint = "https://dummyjson.com/products";
  const toggle = document.getElementById("sortToggle");
  const menu = document.getElementById("sortMenu");

  const row1 = document.querySelector(".products-row-1");
  const row2 = document.querySelector(".products-row-2");
  const row3 = document.querySelector(".products-row-3");

  let allProducts = [];

  function renderProducts(products) {
    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";

    products.forEach((product, index) => {
      const card = document.createElement("article");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <p>Rating: ${product.rating}</p>
      `;

      if (index < 4) {
        row1.appendChild(card);
      } else if (index < 8) {
        row2.appendChild(card);
      } else {
        row3.appendChild(card);
      }
    });
  }

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    allProducts = data.products.filter((p) => p.category === "fragrances");
    renderProducts(allProducts);
  } catch (err) {
    console.error("Fejl ved hentning af produkter:", err);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  document.querySelectorAll(".sort-menu p").forEach((item) => {
    item.addEventListener("click", () => {
      const type = item.dataset.sort;
      let sorted = [...allProducts];

      if (type === "price-low") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (type === "price-high") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (type === "az") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (type === "za") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
      } else if (type === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
      }

      renderProducts(sorted);
      menu.classList.remove("open");
    });
  });
});
