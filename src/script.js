let productQuantity = 0;

const quantityText = document.getElementById("quantity-text");
const plusButton = document.getElementById("plus-btn").addEventListener("click", () => updateQuantity("plus"));
const minusButton = document.getElementById("minus-btn").addEventListener("click", () => updateQuantity("minus"));

function updateQuantity(direction) {
    if (direction == "plus") {
        productQuantity += 1;
    } else if (direction == "minus" && productQuantity > 0) {
        productQuantity -= 1;
    }
    quantityText.innerText = productQuantity;
}