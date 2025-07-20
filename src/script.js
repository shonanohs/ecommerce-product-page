// --- DOM Elements ---
const thumbnails = document.querySelectorAll(".product-thumbnail");
const lightboxThumbnails = document.querySelectorAll(".lightbox-product-thumbnail");
const lightboxImg = document.getElementById("lightbox-img");
const lightbox = document.getElementById("lightbox");
const productImgMain = document.getElementById("product-img-main");
const quantityText = document.getElementById("quantity-text");
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const addCartBtn = document.getElementById("add-cart-btn");
const deleteBtn = document.getElementById("delete-btn");
const cartInfo = document.getElementById("cart-info");
const cartFull = document.getElementById("cart-full");
const cartEmpty = document.getElementById("cart-empty");
const cartQuantityIcon = document.getElementById("cart-quantity-icon");
const cartQuantityText = document.getElementById("cart-quantity-text");
const cartTotalPrice = document.getElementById("cart-total-price");

const store = {
  products: [
    {
      id: 1,
      name: "Fall Limited Edition Sneakers",
      price: 125.00,
      images: [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg"
      ]
    }
  ],
  cart: {
    quantity: 0
  },
  selectedQuantity: 0,
  currentImageIndex: 0,
};


// --- Event Listeners ---
plusBtn.addEventListener("click", () => updateQuantity("plus"));
minusBtn.addEventListener("click", () => updateQuantity("minus"));
nextBtn.addEventListener("click", () => updateLightboxImage("next"));
prevBtn.addEventListener("click", () => updateLightboxImage("prev"));
addCartBtn.addEventListener("click", () => addToCart());
deleteBtn.addEventListener("click", () => emptyCart());

// Thumbnail click for main page
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    selectImage(index);
  });
});

// Thumbnail click for lightbox
lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    selectImage(index);
  });
});

// Open/close lightbox
productImgMain.addEventListener("click", () => {
  lightbox.classList.remove("hidden");
  selectImage(store.currentImageIndex);
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
    store.selectedQuantity++;
  }
  else if (direction === "minus" && store.selectedQuantity > 0) { 
    store.selectedQuantity--;
  }
  quantityText.innerText = store.selectedQuantity;
}

// On click of thumbnail image: set the image index, update the main and lightbox images accordingly 
// & add styling to selected thumbnail
function selectImage(index) {
  store.currentImageIndex = index;
  updateMainProductImg(index);
  setLightboxImage(index);
  updateThumbnailStyles(index);
}

// Update main product image based on selected thumbnail
function updateMainProductImg(index) {
  productImgMain.src = store.products[0].images[index];
}

// Sync lightbox image upon opening to main product image
function setLightboxImage(index) {
  lightboxImg.src = store.products[0].images[index];
}

// Add 'selected' styling to both sets of thumbnails
function updateThumbnailStyles(index) {
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("product-thumbnail-clicked", i === index);
  });
  lightboxThumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("lightbox-product-thumbnail-clicked", i === index);
  });
}

// Update lightbox image when arrow buttons clicked
function updateLightboxImage(direction) {
  const totalImages = store.products[0].images.length;
  if (direction === "next") {
    store.currentImageIndex = store.currentImageIndex === totalImages - 1 ? 0: store.currentImageIndex + 1;
  } else if (direction === "prev") {
    store.currentImageIndex = store.currentImageIndex === 0 ? totalImages - 1: store.currentImageIndex - 1;
  }
  selectImage(store.currentImageIndex);
}

// Add selected quantity of items to cart & update cart display accordingly
function addToCart() {
  if (store.selectedQuantity === 0) return; 
  store.cart.quantity += store.selectedQuantity;

  cartFull.classList.remove("hidden");
  cartEmpty.classList.add("hidden");
  cartQuantityIcon.innerText = store.cart.quantity;
  cartQuantityText.innerText = store.cart.quantity;
  cartTotalPrice.innerText = "$" + (store.cart.quantity * store.products[0].price).toFixed(2);
  cartInfo.classList.remove("hidden");
  store.selectedQuantity = 0;
  quantityText.innerText = store.selectedQuantity;
}

// Reset cart display to empty
function emptyCart() {
    store.cart.quantity = 0;
    cartFull.classList.add("hidden");
    cartEmpty.classList.remove("hidden");
    cartQuantityIcon.innerText = store.cart.quantity;
    cartQuantityText.innerText = store.cart.quantity;
    cartTotalPrice.innerText = "$0.00";
}

selectImage(0);