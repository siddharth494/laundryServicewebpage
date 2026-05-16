// EmailJS Start

(function () {

  emailjs.init("PtY_Upc9YLESLRdbY");

})();


// Cart Array

let cart = [];


// Add Item Function

function addToCart(name, price) {

  cart.push({
    name: name,
    price: price
  });

  // Dry Cleaning

  if (name === "Dry Cleaning") {

    document.getElementById("btn1").innerHTML =
      `<button class="remove-btn"
      onclick="removeItem('Dry Cleaning',200)">
      Remove Item
      </button>`;

  }

  // Wash & Fold

  if (name === "Wash & Fold") {

    document.getElementById("btn2").innerHTML =
      `<button class="remove-btn"
      onclick="removeItem('Wash & Fold',100)">
      Remove Item
      </button>`;

  }

  // Ironing

  if (name === "Ironing") {

    document.getElementById("btn3").innerHTML =
      `<button class="remove-btn"
      onclick="removeItem('Ironing',30)">
      Remove Item
      </button>`;

  }

  updateCart();

}
function removeItem(name, price) {

  for (let i = 0; i < cart.length; i++) {

    if (cart[i].name === name) {

      cart.splice(i, 1);

      break;

    }

  }
  if (name === "Dry Cleaning") {

    document.getElementById("btn1").innerHTML =
      `<button class="add-btn"
      onclick="addToCart('Dry Cleaning',200)">
      Add Item +
      </button>`;

  }
  if (name === "Wash & Fold") {

    document.getElementById("btn2").innerHTML =
      `<button class="add-btn"
      onclick="addToCart('Wash & Fold',100)">
      Add Item +
      </button>`;

  }
  if (name === "Ironing") {

    document.getElementById("btn3").innerHTML =
      `<button class="add-btn"
      onclick="addToCart('Ironing',30)">
      Add Item +
      </button>`;

  }

  updateCart();

}
function updateCart() {

  let cartBody = document.getElementById("cartBody");

  let total = document.getElementById("total");

  cartBody.innerHTML = "";

  let totalAmount = 0;

  // Empty Cart

  if (cart.length === 0) {

    cartBody.innerHTML =
      `<tr>
        <td colspan="3">No Items Added</td>
      </tr>`;

  }

  // Add Items

  for (let i = 0; i < cart.length; i++) {

    totalAmount = totalAmount + cart[i].price;

    cartBody.innerHTML +=
      `<tr>
        <td>${i + 1}</td>
        <td>${cart[i].name}</td>
        <td>₹${cart[i].price}</td>
      </tr>`;

  }

  total.innerText = totalAmount;

}
document.getElementById("booking-form")
.addEventListener("submit", function (e) {

  e.preventDefault();

  // Check Cart

  if (cart.length === 0) {

    alert("Please add at least one service");

    return;

  }
  let customerName =
    document.getElementById("name").value;

  let customerEmail =
    document.getElementById("email").value;

  let customerPhone =
    document.getElementById("phone").value;

  let templateParams = {

    from_name: customerName,

    email_id: customerEmail,

    phone_no: customerPhone,

    services:
      cart.map(function (item) {

        return item.name;

      }).join(", "),

    total_price:
      total.innerText

  };
  emailjs.send(
    "service_lwoubxk",
    "template_o34q2eq",
    templateParams
  )

  .then(function () {

    alert("Booking Successful");

    // Reset Form

    document.getElementById("booking-form").reset();

    // Empty Cart

    cart = [];

    updateCart();

  })

  .catch(function () {

    alert("Something went wrong");

  });

});
document.getElementById("subscribeBtn").addEventListener("click", function () {
  const name = document.getElementById("subName").value.trim();
  const email = document.getElementById("subEmail").value.trim();

  if (name === "" || email === "") {
    alert("Please enter name and email");
    return;
  }

  alert("Subscribed successfully");
  document.getElementById("subName").value = "";
  document.getElementById("subEmail").value = "";
});