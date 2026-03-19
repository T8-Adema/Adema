document.addEventListener("DOMContentLoaded", async () => {
  const endpoint = "https://dummyjson.com/products";
  let allProducts = [];

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    allProducts = data.products.filter((p) => p.category === "fragrances");
    renderProducts(allProducts);
  } catch (err) {
    console.error("Fejl ved hentning af produkter:", err);
  }

  // Toggle dropdown
  const toggle = document.getElementById("sortToggle");
  const menu = document.getElementById("sortMenu");

  toggle.addEventListener("click", () => menu.classList.toggle("open"));

  // Sorteringsknapper
  document.querySelectorAll(".sort-menu p").forEach((item) => {
    item.addEventListener("click", () => {
      const type = item.dataset.sort;
      let sorted = [...allProducts];

      if (type === "price-low") sorted.sort((a, b) => a.price - b.price);
      if (type === "price-high") sorted.sort((a, b) => b.price - a.price);
      if (type === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
      if (type === "za") sorted.sort((a, b) => b.title.localeCompare(a.title));
      if (type === "rating") sorted.sort((a, b) => b.rating - a.rating);

      renderProducts(sorted);
    });
  });
});
