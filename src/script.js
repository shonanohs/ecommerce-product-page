let productQuantity = 0;

const quantityText = document.getElementById("quantity-text");
const plusButton = document.getElementById("plus-btn").addEventListener("click", () => updateQuantity("plus"));
const minusButton = document.getElementById("minus-btn").addEventListener("click", () => updateQuantity("minus"));

const productImgMain = document.getElementById("product-img-main");
const productThumbnail1 = document.getElementById("product-thumbnail-1");
const productThumbnail2 = document.getElementById("product-thumbnail-2");
const productThumbnail3 = document.getElementById("product-thumbnail-3");
const productThumbnail4 = document.getElementById("product-thumbnail-4");

productThumbnail1.addEventListener("click", () => {
    updateMainProductImg("image-product-1"); 
    addThumbnailStyleOnClick(productThumbnail1);
});
productThumbnail2.addEventListener("click", () => {
    updateMainProductImg("image-product-2"); 
    addThumbnailStyleOnClick(productThumbnail2); 
});
productThumbnail3.addEventListener("click", () => {
    updateMainProductImg("image-product-3"); 
    addThumbnailStyleOnClick(productThumbnail3);
});
productThumbnail4.addEventListener("click", () => {
    updateMainProductImg("image-product-4"); 
    addThumbnailStyleOnClick(productThumbnail4);
});

productImgMain.addEventListener("click", () => {
    document.getElementById("lightbox").classList.remove("hidden");
})

// Increase or decrease product quantity depending on button clicked
function updateQuantity(direction) {
    if (direction == "plus") {
        productQuantity += 1;
    } else if (direction == "minus" && productQuantity > 0) { // Prevent negative quantities
        productQuantity -= 1;
    }
    quantityText.innerText = productQuantity;
}

// Update main product image depending on thumbnail selected
function updateMainProductImg(image) {
    productImgMain.src = `./images/${image}.jpg`;
}

// Add styling depending on thumbnail image selected
function addThumbnailStyleOnClick(selectedThumbnail) {
    // Remove the clicked class from all thumbnails
    const allThumbnails = [productThumbnail1, productThumbnail2, productThumbnail3, productThumbnail4];
    allThumbnails.forEach(thumb => thumb.classList.remove("product-thumbnail-clicked"));

    // Add the clicked class only to the selected one
    selectedThumbnail.classList.add("product-thumbnail-clicked");
}