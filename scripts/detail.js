const params = new URLSearchParams(window.location.search);
const id = params.get("perfumeId");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const loaders = document.querySelectorAll(".spinner-grow");

const detailPage = function (perfume) {
  const row = document.getElementById("products-container");
  row.innerHTML = "";

  const colImg = document.createElement("div");
  colImg.classList.add("col-12", "col-md-6");

  const colText = document.createElement("div");
  colText.classList.add("col-12", "col-md-6");

  const img = document.createElement("img");
  img.src = perfume.imageUrl;
  img.classList.add("bd-placeholder-img", "img-fluid");
  colImg.appendChild(img);

  const detailBody = document.createElement("div");

  const title = document.createElement("h5");
  title.textContent = perfume.name;

  const brand = document.createElement("p");
  brand.textContent = perfume.brand;

  const text = document.createElement("p");
  text.textContent = perfume.description;

  const price = document.createElement("p");
  price.textContent = perfume.price + "€";

  detailBody.appendChild(title);
  detailBody.appendChild(brand);
  detailBody.appendChild(text);
  detailBody.appendChild(price);

  colText.appendChild(detailBody);
  row.appendChild(colImg);
  row.appendChild(colText);
  loaders.forEach((loader) => loader.classList.add("d-none"));
};

window.onload = () => {
  loaders.forEach((loader) => {
    loader.classList.remove("d-none");
  });
  fetch(url + id, {
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
      detailPage(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
