document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartUI() {
        cartContainer.innerHTML = ""; // clear curr cart

        let subtotal = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <label>Quantity:</label>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity">
                        <p>Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                    <button class="remove" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        });
        
        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });

        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("change", function() {
                let index = this.getAttribute("data-index");
                cart[index].quantity = parseInt(this.value);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });

        document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
        let tax = subtotal * 0.0675;
        document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
        document.getElementById("total").innerText = `$${(subtotal + tax).toFixed(2)}`;
    }

    updateCartUI();
});
