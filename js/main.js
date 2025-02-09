// main.js
console.log('main.js loaded');

import { cardData } from "../assets/data.js";


/*=============== HEADER ===============*/
/**
 * 
document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;
    let isHeaderVisible = true;
    
    function handleScroll() {
        if (window.innerWidth < 769) {
            // For smaller screens, keep the header fixed
            header.classList.remove("hide");
            return;
        }
        
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            // Scrolling down -> Hide header
            header.classList.add("hide");
            isHeaderVisible = false;
        } else {
            // Scrolling up -> Show header
        header.classList.remove("hide");
            isHeaderVisible = true;
        }
        lastScrollY = window.scrollY;
    }
    
    function handleMouseMove(e) {
        if (window.innerWidth < 769) return; // Skip if smaller screen

        if (e.clientY < 50) {
            // Mouse near the top -> Show header
            header.classList.remove("hide");
            isHeaderVisible = true;
        } else if (!isHeaderVisible && window.scrollY > 50) {
            // Mouse not near top and header is hidden -> Keep it hidden
            header.classList.add("hide");
        }
    }
    
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleMouseMove);
    
    // On resize, reset the header visibility
    window.addEventListener("resize", function () {
        if (window.innerWidth < 769) {
            header.classList.remove("hide"); // Always visible on smaller screens
        }
    });
});

*/

document.querySelectorAll(".slider__controls").forEach((control) => {
    const img = control.querySelector("img");
  
    control.addEventListener("mouseenter", () => {
      img.src = "./assets/icons/chevron.svg";
    });
  
    control.addEventListener("mouseleave", () => {
      img.src = "./assets/icons/chevronFilled.svg";
    });
  });
  




/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navClass) => {
    console.log('showMenu called')
    const toggle = document.getElementById(toggleId);
    const nav = document.querySelector(navClass);
    const navIcons = document.querySelector('.nav__icons')

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        navIcons.classList.toggle('show-nav-icon')

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle', '.nav__menu')



/*=============== FEATURED DISHES ===============*/
const gridContainer = document.getElementById("gridContainer");

cardData.slice(0, 12).forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("dish__card");

    cardElement.innerHTML = `
        <figure class="dish__image-wrapper">
            <img src="${card.image}" alt="${card.name}" class="dish__image">
            <figcaption class="visually-hidden">${card.name} - ${card.price}</figcaption>
        </figure>
        
        <div class="dish__details">
            
            <div class="details">
                <h3 class="dish__title responsiveText">${card.name}</h3>
                <p class="dish__price responsiveText">${card.price}</p>
            </div>

            <div class="details details_2">
                <div>
                    <p class="dish__rating">
                        <i class="fa-solid fa-star">&nbsp;</i>
                        ${card.rating}
                    </p>
                    <p class="dish__duration">${card.duration}</p>
                </div>
                <img class="add_to_cart" src ="./assets/icons/add_to_cart.png" />
            </div>
        </div>

        ${card.discount && card.discount !== "0%" ? `<p class="dish__discount">${card.discount}</p>` : ""}
    `;

    gridContainer.appendChild(cardElement);
});

// Add event listener to all "Add to Cart" buttons
gridContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add_to_cart")) {
        const itemName = e.target.dataset.name;
        const card = cardData.find(c => c.name === itemName);
        if (card) addToCart(card);
    }
});


/*=============== VIDEO ===============*/
const video = document.getElementById("serviceVideo");
const videoContainer = document.querySelector(".video__container");
const playPauseButton = document.getElementById("playPauseButton");

// Toggle play/pause when clicking the video itself
video.addEventListener("click", () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

// Play button click event
playPauseButton.addEventListener("click", () => {
    video.play();
});

// Hide the play button when video starts playing
video.addEventListener("play", () => {
    console.log('Video played');
    videoContainer.classList.add("video-playing");
    playPauseButton.style.display = "none";
});

// Show play button when video is paused
video.addEventListener("pause", () => {
    console.log("Video paused");
    // videoContainer.classList.remove("video-playing");
    playPauseButton.style.display = "flex";
});



/*=============== MODALS ===============*/
const modalContainer = document.querySelector(".modal__container");
const modalContent = document.querySelector(".modal__content");
const cartIcon = document.querySelector(".nav__icon--cart");
const requestDishBtn = document.querySelector(".btnContainer button");


function openModal(content, source) {
    modalContent.innerHTML = content;
    modalContent.classList.add(`${source}__modal`);
    document.body.classList.add("no-scroll");
    modalContainer.classList.add("show");
}

function closeModal(source) {
    console.log(`${source} modal is Closed`)
    modalContainer.classList.remove("show");
    document.body.classList.remove("no-scroll");
}

// 1. Cart Modal
cartIcon.addEventListener("click", () => {
    console.log('cartIcon clicked')
    console.log('Modal for cart is Opened')

    const cartContent = `
        <img src="./assets/icons/shopping_bag.svg" class="modal__icon" />

        <div class="modal__description">
        <h2>Cart is Empty</h2>
        <p>Add some items to the cart to checkout</p>
        </div>
        
        <button id="closeCart" class="btn btn__primary">Back to Menu</button>
    `;
    openModal(cartContent, 'cart');
});

// 2. Request Dish Modal
requestDishBtn.addEventListener("click", () => {

    console.log('requestDishBtn clicked')
    console.log('Modal for Request Dish is Opened')

    const requestDishContent = `
        <div class="modal__title sectionHeading">Request a Dish</div>

        <form action="">
          <div class="form__group name">
            <label for="dish_name">Name*</label>
            <input type="text" required id="dish_name" name="dish_name" placeholder="Enter the name of the Dish" />
          </div>
  
          <div class="form__group email">
            <label for="image_url">Upload an Image</label>
            <input type="text" id="image_url" name="image_url" placeholder="Paste a URL" />
          </div>
        </form>

        <div class="btn__container">
          <button id="cancelRequest" class="btn">Cancel</button>
          <button id="submitRequest" class="btn btn__primary">Submit Request</button>
        </div>
    `;
    openModal(requestDishContent, 'requestDish');
});


document.addEventListener("click", (event) => {
    if (event.target.id === "closeCart") {
        closeModal('cart');
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "cancelRequest") {
        closeModal('requestDish');
    }
});



