// cart.js
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
    this.updateCartDisplay();
  }

  addItem(id, title, price) {
    const existingItem = this.items.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ id, title, price, quantity: 1 });
    }
    this.updateLocalStorage();
    this.updateCartDisplay();
  }

  removeItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
      this.updateLocalStorage();
      this.updateCartDisplay();
    }
  }

  updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  updateCartDisplay() {
    const cartElement = document.getElementById("cart");
    cartElement.innerHTML = "";
    let total = 0;

    this.items.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      cartElement.innerHTML += `
                <div class="cart-item">
                    <span>${item.quantity} x ${item.title}</span>
                    <span>R$ ${itemTotal.toFixed(2)}</span>
                    <button onclick="cart.removeItem('${
                      item.id
                    }')">Remover</button>
                </div>
            `;
    });

    if (this.items.length > 0) {
      cartElement.innerHTML += `<div class="cart-total">Total: R$ ${total.toFixed(
        2
      )}</div>`;
    } else {
      cartElement.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }
  }
}

const cart = new Cart();

function addToCart(id, title, price) {
  cart.addItem(id, title, price);
}
