let productQuantity = 0;
let currentCartQuantity = productQuantity;
let currentImageIndex = 1;

const quantityText = document.getElementById("quantity-text");
const productImgMain = document.getElementById("product-img-main");
const thumbnails = document.querySelectorAll(".product-thumbnail");
const lightboxThumbnails = document.querySelectorAll(".lightbox-product-thumbnail");
const lightboxImg = document.getElementById("lightbox-img");
const lightbox = document.getElementById("lightbox");
const cartInfo = document.getElementById("cart-info");

// Quantity buttons
document.getElementById("plus-btn").addEventListener("click", () => updateQuantity("plus"));
document.getElementById("minus-btn").addEventListener("click", () => updateQuantity("minus"));

// Lightbox navigation buttons
document.getElementById("next-btn").addEventListener("click", () => updateLightboxImage("next"));
document.getElementById("prev-btn").addEventListener("click", () => updateLightboxImage("prev"));

// Add to/remove from cart buttons
document.getElementById("add-cart-btn").addEventListener("click", () => addToCart());
document.getElementById("delete-img").addEventListener("click", () => emptyCart());

// Thumbnail click for main page
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    selectImage(index + 1);
  });
});

// Thumbnail click for lightbox
lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    selectImage(index + 1);
  });
});

// Open/close lightbox
productImgMain.addEventListener("click", () => {
  lightbox.classList.remove("hidden");
  selectImage(currentImageIndex);
});
document.getElementById("close-lightbox").addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

// Open/close cart
document.getElementById("cart-img-nav").addEventListener("click", () => {
    cartInfo.classList.toggle("hidden");
});

// --- Functions ---

function updateQuantity(direction) {
  if (direction === "plus") {
    productQuantity++;
  }
  else if (direction === "minus" && productQuantity > 0) { 
    productQuantity--;
  }
  quantityText.innerText = productQuantity;
}

function selectImage(index) {
  currentImageIndex = index;
  updateMainProductImg(index);
  setLightboxImage(index);
  updateThumbnailStyles(index);
}

// Update main product image based on selected thumbnail
function updateMainProductImg(index) {
  productImgMain.src = `./images/image-product-${index}.jpg`;
}

// Function for syncing the lightbox image
function setLightboxImage(index) {
  lightboxImg.src = `./images/image-product-${index}.jpg`;
}

// Add 'selected' styling to both sets of thumbnails
function updateThumbnailStyles(index) {
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("product-thumbnail-clicked", i + 1 === index);
  });
  lightboxThumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("lightbox-product-thumbnail-clicked", i + 1 === index);
  });
}

// Update lightbox image when arrow buttons clicked
function updateLightboxImage(direction) {
  if (direction === "next") {
    currentImageIndex = currentImageIndex === 4 ? 1 : currentImageIndex + 1;
  } else if (direction === "prev") {
    currentImageIndex = currentImageIndex === 1 ? 4 : currentImageIndex - 1;
  }
  selectImage(currentImageIndex);
}

// Add selected quantity of items to cart & update cart display accordingly
function addToCart() {
  currentCartQuantity += productQuantity;
  if (productQuantity > 0) {
    document.getElementById("cart-full").classList.remove("hidden");
    document.getElementById("cart-empty").classList.add("hidden");
    document.getElementById("cart-quantity-icon").innerText = currentCartQuantity;
    document.getElementById("quantity-text-cart").innerText = currentCartQuantity;
    document.getElementById("cart-total-price").innerText = "$" + (currentCartQuantity * 125.00).toFixed(2);
    cartInfo.classList.remove("hidden");
  }
}

// Reset cart display to empty
function emptyCart() {
    currentCartQuantity = 0;
    document.getElementById("cart-full").classList.add("hidden");
    document.getElementById("cart-empty").classList.remove("hidden");
    document.getElementById("cart-quantity-icon").innerText = currentCartQuantity;
}
