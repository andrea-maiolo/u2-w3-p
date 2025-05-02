const form = document.getElementById("backoffice-form");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const params = new URLSearchParams(window.location.search);
const id = params.get("perfumeId");
const method = id ? "PUT" : "POST";
const resetFormBtn = document.getElementById("reset-form-btn");
resetFormBtn.addEventListener("click", () => {
  form.reset();
});

form.onsubmit = function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const brandInput = document.getElementById("brand");
  const imageUrl = document.getElementById("imageLink");

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrl.value,
    price: priceInput.value,
  };

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzljZTFjMjUwNDAwMTUxYWI2NGUiLCJpYXQiOjE3NDYxNzIzNjYsImV4cCI6MTc0NzM4MTk2Nn0.V8zm7CqUU9wh3HX6vzyxKegxLE-fcGMBJVYedB-PuVY",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

window.onload = function () {
  const backOfficeTitle = document.getElementById("backoffice-title");
  const submitButton = document.querySelector('button[type="submit"]');
  const deleteBtn = document.getElementById("deleteBtn");

  if (id) {
    fetch(url + id, {
      method: method,
      headers: {
        "Content-Type": "application/json",
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
      .then((perfume) => {
        document.getElementById("name").value = perfume.name;
        document.getElementById("description").value = perfume.description;
        document.getElementById("price").value = perfume.price;
        document.getElementById("brand").value = perfume.brand;
        document.getElementById("imageLink").value = perfume.imageUrl;
        deleteBtn.addEventListener("click", () => deleteProduct(perfume._id));
      })
      .catch((error) => {
        console.log(error);
      });

    backOfficeTitle.innerText = "Modifica prodotto n " + id;
    submitButton.innerText = "Modifica";
    deleteBtn.classList.remove("d-none");
  } else {
    backOfficeTitle.innerText = "Crea un nuovo prodotto";
    submitButton.innerText = "Salva";
  }
};

const deleteProduct = function (id) {
  const modal = new bootstrap.Modal(document.getElementById("alertModal"));
  modal.show();
  const confirmBtn = document.getElementById("confirm-button");
  confirmBtn.addEventListener("click", () => {
    fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzljZTFjMjUwNDAwMTUxYWI2NGUiLCJpYXQiOjE3NDYxNzIzNjYsImV4cCI6MTc0NzM4MTk2Nn0.V8zm7CqUU9wh3HX6vzyxKegxLE-fcGMBJVYedB-PuVY",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          alert("hai correttamente eliminato questo prodotto");
          setTimeout(() => {
            window.location.assign("./index.html");
          }, 1200);
        }
      })
      .catch((error) => console.log(error));
  });
};
