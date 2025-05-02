const form = document.getElementById("backoffice-form");
const url = "https://striveschool-api.herokuapp.com/api/product/";

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
    method: "POST",
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
