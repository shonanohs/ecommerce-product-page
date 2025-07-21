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
const quantityAlert = document.getElementById("quantity-alert");
const closeLightbox = document.getElementById("close-lightbox");
const cartImgNavbar = document.getElementById("cart-img-nav");

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

const HIDDEN = "hidden";
const CLICK = "click"


// --- Event Listeners ---
plusBtn.addEventListener(CLICK, () => updateQuantity("plus"));
minusBtn.addEventListener(CLICK, () => updateQuantity("minus"));
nextBtn.addEventListener(CLICK, () => updateLightboxImage("next"));
prevBtn.addEventListener(CLICK, () => updateLightboxImage("prev"));
addCartBtn.addEventListener(CLICK, () => addToCart());
deleteBtn.addEventListener(CLICK, () => emptyCart());

// Switch main images usign arrow keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateLightboxImage("prev");
  } else if (e.key === "ArrowRight") {
    updateLightboxImage("next");
  }
});

// Open/close lightbox using 'x' or esc key
productImgMain.addEventListener(CLICK, () => {
  lightbox.classList.remove(HIDDEN);
  selectImage(store.currentImageIndex);
});
closeLightbox.addEventListener(CLICK, () => lightbox.classList.add(HIDDEN));
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.add(HIDDEN);
    }
});


// Thumbnail click for main page
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener(CLICK, () => {
    selectImage(index);
  });
});

// Thumbnail click for lightbox
lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener(CLICK, () => {
    selectImage(index);
  });
});

// Open/close cart
cartImgNavbar.addEventListener(CLICK, () => cartInfo.classList.toggle(HIDDEN));


// --- Functions ---
function updateQuantity(direction) {
  if (direction === "plus") {
    quantityAlert.classList.add(HIDDEN);
    addCartBtn.disabled = false;
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
  if (store.selectedQuantity === 0) {
    quantityAlert.classList.remove(HIDDEN);
    addCartBtn.disabled = true;
    return;
  }; 
  store.cart.quantity += store.selectedQuantity;

  cartFull.classList.remove(HIDDEN);
  cartEmpty.classList.add(HIDDEN);
  cartQuantityIcon.innerText = store.cart.quantity;
  cartQuantityText.innerText = store.cart.quantity;
  cartTotalPrice.innerText = "$" + (store.cart.quantity * store.products[0].price).toFixed(2);
  cartInfo.classList.remove(HIDDEN);
  store.selectedQuantity = 0;
  quantityText.innerText = store.selectedQuantity;
}

// Reset cart display to empty
function emptyCart() {
    store.cart.quantity = 0;
    cartFull.classList.add(HIDDEN);
    cartEmpty.classList.remove(HIDDEN);
    cartQuantityIcon.innerText = store.cart.quantity;
    cartQuantityText.innerText = store.cart.quantity;
    cartTotalPrice.innerText = "$0.00";
}

selectImage(0);