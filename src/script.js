let productQuantity = 0;
let currentImageIndex = 1; // Tracks which thumbnail is selected (1–4)

const quantityText = document.getElementById("quantity-text");
const productImgMain = document.getElementById("product-img-main");
const thumbnails = document.querySelectorAll(".product-thumbnail");
const lightboxImg = document.getElementById("lightbox-img");

document.getElementById("plus-btn").addEventListener("click", () => updateQuantity("plus"));
document.getElementById("minus-btn").addEventListener("click", () => updateQuantity("minus"));

document.getElementById("next-btn").addEventListener("click", () => updateLightboxImage("next"));
document.getElementById("prev-btn").addEventListener("click", () => updateLightboxImage("prev"));

// Set up thumbnail click listeners dynamically
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentImageIndex = index + 1; // Store which image is active
    updateMainProductImg(currentImageIndex);
    addThumbnailStyleOnClick(thumb);
  });
});

// Open lightbox when clicking the main image
productImgMain.addEventListener("click", () => {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("hidden");
  setLightboxImage(currentImageIndex); // Sync image with selected image on main page when opening
});

// Close lightbox when close icon clicked
document.getElementById("close-lightbox").addEventListener("click", () => {
    lightbox.classList.add("hidden");
});


// Functions
function updateQuantity(direction) {
  if (direction === "plus") productQuantity++;
  else if (direction === "minus" && productQuantity > 0) productQuantity--;
  quantityText.innerText = productQuantity;
}

// Update main product image based on selected thumbnail
function updateMainProductImg(index) {
  productImgMain.src = `./images/image-product-${index}.jpg`;
}

// Add styling to selected thumbnail
function addThumbnailStyleOnClick(selectedThumbnail) {
  thumbnails.forEach(thumb => thumb.classList.remove("product-thumbnail-clicked"));
  selectedThumbnail.classList.add("product-thumbnail-clicked");
}

// Function for syncing the lightbox image
function setLightboxImage(index) {
  lightboxImg.src = `./images/image-product-${index}.jpg`;
}

// Update lightbox image when arrow buttons clicked
function updateLightboxImage(direction) {
    if (direction === "next") {
        currentImageIndex = currentImageIndex === 4 ? 1 : currentImageIndex + 1;
    } else if (direction === "prev") {
        currentImageIndex = currentImageIndex === 1 ? 4 : currentImageIndex - 1;
    }
    setLightboxImage(currentImageIndex);
}
