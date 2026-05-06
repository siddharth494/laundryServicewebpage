const buttons = document.querySelectorAll('.add-btn');
const cartBody = document.getElementById('cartBody');
const totalAmount = document.getElementById('totalAmount');

let cart = [];

function renderCart() {
  cartBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-cart">No Items Added</td>
      </tr>
    `;
    totalAmount.textContent = "₹ 0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₹ ${item.price}</td>
        <td>
          <button class="delete-btn" data-index="${index}">❌</button>
        </td>
      </tr>
    `;
  });

  totalAmount.textContent = `₹ ${total}`;

  // REMOVE FROM CART (RIGHT SIDE)
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = this.dataset.index;
      const removedItem = cart[index].name;

      // LEFT SIDE BUTTON RESET
      document.querySelectorAll('.service-row').forEach(row => {
        if (row.dataset.name === removedItem) {
          const btn = row.querySelector('.add-btn');
          btn.textContent = "Add Item ⊕";
          btn.classList.remove('active');
        }
      });

      cart.splice(index, 1);
      renderCart();
    });
  });
}

// LEFT SIDE BUTTON CLICK
buttons.forEach(button => {
  button.addEventListener('click', function () {
    const row = this.closest('.service-row');
    const name = row.dataset.name;
    const price = Number(row.dataset.price);

    const foundIndex = cart.findIndex(item => item.name === name);

    if (foundIndex === -1) {
      cart.push({ name, price });
      this.textContent = "Remove Item ⊖";
      this.classList.add('active');
    } else {
      cart.splice(foundIndex, 1);
      this.textContent = "Add Item ⊕";
      this.classList.remove('active');
    }

    renderCart();
  });
});

renderCart();
document.querySelector('.book-submit').addEventListener('click', function() {
  const name = document.querySelector('input[placeholder="john doe"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const phone = document.querySelector('input[placeholder="0000000000"]').value;
  
  if (!name || !email || !phone || cart.length === 0) {
    alert('Please fill in all fields and add items to the cart');
    return;
  }
  
  document.getElementById('successMsg').style.display = 'block';
  console.log('Booking data:', { name, email, phone, cart }); 
  

  cart = [];
  renderCart();
});
document.querySelector('.newsletter-form button[type="button"]').addEventListener('click', function() {
  const name = this.parentElement.querySelector('input[placeholder="Full name"]').value;
  const email = this.parentElement.querySelector('input[placeholder="Email"]').value;
  
  if (!name || !email) {
    alert('NAME AND EMAIL PILZ..');
    return;
  }
  

  console.log('Newsletter subscribe:', { name, email });
  alert('successful! Welcome aboard.');
  

  this.parentElement.reset();
});