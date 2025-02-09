// main.js
console.log('main.js loaded');

import { cardData } from "../assets/data.js";


/*=============== HEADER ===============*/
// document.addEventListener("DOMContentLoaded", function () {
//     const header = document.getElementById("header");
//     let lastScrollY = window.scrollY;
//     let isHeaderVisible = true;

//     function handleScroll() {
//         if (window.innerWidth < 769) {
//             // For smaller screens, keep the header fixed
//             header.classList.remove("hide");
//             return;
//         }

//         if (window.scrollY > lastScrollY && window.scrollY > 50) {
//             // Scrolling down -> Hide header
//             header.classList.add("hide");
//             isHeaderVisible = false;
//         } else {
//             // Scrolling up -> Show header
//             header.classList.remove("hide");
//             isHeaderVisible = true;
//         }
//         lastScrollY = window.scrollY;
//     }

//     function handleMouseMove(e) {
//         if (window.innerWidth < 769) return; // Skip if smaller screen

//         if (e.clientY < 50) {
//             // Mouse near the top -> Show header
//             header.classList.remove("hide");
//             isHeaderVisible = true;
//         } else if (!isHeaderVisible && window.scrollY > 50) {
//             // Mouse not near top and header is hidden -> Keep it hidden
//             header.classList.add("hide");
//         }
//     }

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

//     // On resize, reset the header visibility
//     window.addEventListener("resize", function () {
//         if (window.innerWidth < 769) {
//             header.classList.remove("hide"); // Always visible on smaller screens
//         }
//     });
// });







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
        <img src="${card.image}" alt="${card.name}" class="dish__image">
        
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


/*=============== SLIDER ===============*/
const slider = document.getElementById("slider");
const arrowBtns = document.querySelectorAll(".slider__controls");

const createSlide = (card) => {
    let cardElement = document.createElement("div");
    cardElement.classList.add("dish__card");

    cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.name}" class="dish__image">
        <div class="dish__details">
            <div class="details">
                <h3 class="dish__title">${card.name}</h3>
                <p class="dish__price">${card.price}</p>
            </div>
            <div class="details details_2">
                <div>
                    <p class="dish__rating">
                        <i class="fa-solid fa-star">&nbsp;</i>
                        ${card.rating}
                    </p>
                    <p class="dish__duration">${card.duration}</p>
                </div>
                <img class="add_to_cart" src="./assets/icons/add_to_cart.png" />
            </div>
        </div>
        ${card.discount && card.discount !== "0%" ? `<p class="dish__discount">${card.discount}</p>` : ""}
    `;
    return cardElement;
};

// Append slides dynamically
cardData.forEach(card => {
    slider.appendChild(createSlide(card));
});

// Infinite scrolling setup
let firstCardWidth = slider.querySelector(".dish__card").offsetWidth;
let cardPerView = Math.floor(slider.offsetWidth / firstCardWidth);


cardData.slice(-cardPerView).reverse().forEach(card => {
    slider.insertAdjacentElement("afterbegin", createSlide(card));
});

cardData.slice(0, cardPerView).forEach(card => {
    slider.insertAdjacentElement("beforeend", createSlide(card));
});

// Scroll slider to the correct position
slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

// Event Listeners for arrow controls
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log('arrowBtns clicked')
        slider.scrollLeft += btn.classList.contains("slider__prev") ? -firstCardWidth : firstCardWidth;
    });
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
