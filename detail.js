const params = new URLSearchParams(window.location.search);
const id = params.get("perfumeId");
const url = "https://striveschool-api.herokuapp.com/api/product/";

const detailPage = function (perfume) {
  console.log(perfume);

  const row = document.getElementById("products-container");
  row.innerHTML = "";

  const col = document.createElement("div");
  col.className = "col-12";

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

  cardBody.appendChild(title);
  cardBody.appendChild(brand);
  cardBody.appendChild(text);
  cardBody.appendChild(price);

  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
};

window.onload = () => {
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
