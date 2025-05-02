const url = "https://striveschool-api.herokuapp.com/api/product/";

const displayProducts = function (arrayOfProducts) {
  const row = document.getElementById("products-container");
  row.innerHTML = "";

  arrayOfProducts.forEach((perfume) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm";

    const img = document.createElement("img");
    img.src = perfume.imageUrl;
    img.className = "bd-placeholder-img card-img-top";
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = perfume.name;

    const brand = document.createElement("p");
    brand.className = "card-text";
    brand.textContent = perfume.brand;

    const text = document.createElement("p");
    text.className = "card-text";
    text.classList.add("text-truncate");
    text.textContent = perfume.description;

    const price = document.createElement("p");
    price.className = "card-text";
    price.textContent = perfume.price + "€";

    const modifyBtn = document.createElement("button");
    modifyBtn.classList.add("btn");
    modifyBtn.classList.add("btn-info");
    modifyBtn.setAttribute("type", "button");
    modifyBtn.textContent = "Modify";

    const detailBtn = document.createElement("button");
    detailBtn.classList.add("btn");
    detailBtn.classList.add("btn-info");
    detailBtn.setAttribute("type", "button");
    detailBtn.textContent = "Details";

    cardBody.appendChild(title);
    cardBody.appendChild(brand);
    cardBody.appendChild(text);
    cardBody.appendChild(price);
    cardBody.appendChild(modifyBtn);
    cardBody.appendChild(detailBtn);

    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });
};

window.onload = () => {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzljZTFjMjUwNDAwMTUxYWI2NGUiLCJpYXQiOjE3NDYxNzIzNjYsImV4cCI6MTc0NzM4MTk2Nn0.V8zm7CqUU9wh3HX6vzyxKegxLE-fcGMBJVYedB-PuVY",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayProducts(data);
    });
};
