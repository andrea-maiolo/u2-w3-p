const url = "https://striveschool-api.herokuapp.com/api/product/";

const displayProducts = function (arrayOfProducts) {
  const row = document.getElementById("products-container");
  row.innerHTML = "";

  arrayOfProducts.forEach((perfume) => {
    const col = document.createElement("div");
    col.classList.add("col-lg-4", "col-md-6", "d-flex");

    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow", "h-90", "border", "border-black");

    const img = document.createElement("img");
    img.src = perfume.imageUrl;
    img.classList.add("bd-placeholder-img", "card-img-top", "img-fluid", "h-100", "object-fit-cover");
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = perfume.name;

    const brand = document.createElement("p");
    brand.className = "card-text";
    brand.innerText = perfume.brand;

    const text = document.createElement("p");
    text.classList.add("card-text", "text-truncate");
    text.textContent = perfume.description;

    const price = document.createElement("p");
    price.className = "card-text";
    price.innerText = perfume.price + "€";

    const footer = document.createElement("div");
    footer.classList.add("d-flex", "justify-content-between", "align-items-center");

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const modifyBtn = document.createElement("button");
    modifyBtn.classList.add("btn", "second-bg");
    modifyBtn.setAttribute("type", "button");
    const modifyIcon = document.createElement("i");
    modifyIcon.classList.add("bi", "bi-pencil-fill");
    modifyBtn.appendChild(modifyIcon);
    modifyBtn.addEventListener("click", () => modifyProduct(perfume._id));

    const detailBtn = document.createElement("button");
    detailBtn.classList.add("btn", "main-bg");
    detailBtn.setAttribute("type", "button");
    detailBtn.innerText = "scopri di piu";
    const detailIcon = document.createElement("i");
    detailIcon.classList.add("bi", "bi-aspect-ratio", "ms-2");
    detailBtn.appendChild(detailIcon);
    detailBtn.addEventListener("click", () => seeDetail(perfume._id));

    btnGroup.appendChild(modifyBtn);
    btnGroup.appendChild(detailBtn);
    footer.appendChild(btnGroup);

    cardBody.appendChild(title);
    cardBody.appendChild(brand);
    cardBody.appendChild(text);
    cardBody.appendChild(price);
    cardBody.appendChild(footer);

    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });
};

const seeDetail = function (productId) {
  window.location.assign("./pages/detail.html?perfumeId=" + productId);
};

const modifyProduct = function (productId) {
  window.location.assign("./pages/backOffice.html?perfumeId=" + productId);
};

window.onload = () => {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzljZTFjMjUwNDAwMTUxYWI2NGUiLCJpYXQiOjE3NDYxNzIzNjYsImV4cCI6MTc0NzM4MTk2Nn0.V8zm7CqUU9wh3HX6vzyxKegxLE-fcGMBJVYedB-PuVY",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("error in fetch");
      }
      return response.json();
    })
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
