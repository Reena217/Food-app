const newMobiles = [
    { id: 1, name: "iPhone 15", price: 1200, img: "iphone1.jpg" },
    { id: 2, name: "Samsung S23", price: 1000, img: "samsung1.jpg" },
    { id: 2, name: "Samsung S24", price: 2000, img: "sam2.jpg" }
];

const oldMobiles = [
    { id: 3, name: "iPhone X (Used)", price: 400, img: "i1.jpg" },
    { id: 4, name: "OnePlus 7T (Used)", price: 300, img: "1plus.jpg" },
    { id: 4, name: "iphone 16e (Used)", price: 300, img: "i16e.jpg" }
];


let cart = [];

function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="viewDetails(${product.id})">View Details</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function viewDetails(id) {
    const product = [...newMobiles, ...oldMobiles].find(p => p.id === id);
    alert(`Product: ${product.name}\nPrice: $${product.price}`);
}

function addToCart(id) {
    const product = [...newMobiles, ...oldMobiles].find(p => p.id === id);
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(id);
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0; // initialize item count

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.img}" width="50" height="50">
            ${item.name} - $${item.price} 
            <button onclick="decreaseQuantity(${item.id})">-</button> 
            ${item.quantity} 
            <button onclick="increaseQuantity(${item.id})">+</button> 
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(li);

        total += item.price * item.quantity;
        itemCount += item.quantity; // count total quantity
    });

    document.getElementById("totalPrice").innerHTML = `<h3 id="totalAmount">Total: $${total}</h3>`;
    document.getElementById("cartCount").innerText = itemCount; // <-- Update cart count here

    const totalElement = document.getElementById("totalAmount");
totalElement.classList.add("bounce");

setTimeout(() => {
    totalElement.classList.remove("bounce");
}, 500); // remove bounce after animation ends

}


function toggleCart() {
    document.getElementById('cart').classList.toggle('active');
}

function clearCart() {
    cart = [];
    updateCart();
    toggleCart();
    alert("Cart has been cleared!");
}



displayProducts(newMobiles, 'new-mobiles');
displayProducts(oldMobiles, 'old-mobiles');
document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();
   
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      orderDetails: document.getElementById("orderDetails").value
    };
   
    fetch("https://backend-website-22y9.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert("✅ Email sent successfully!");
      } else {
        alert("❌ Failed to send email.");
      }
    });
  });
  function openCheckoutForm() {
    const checkoutContainer = document.getElementById('checkoutContainer');
    checkoutContainer.style.display = 'block'; // Show the form when "Proceed to Checkout" is clicked
}
function cancelCheckout() {
    document.getElementById('checkoutContainer').style.display = 'none';
}


