import { cardData } from "../assets/data.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const slider = document.getElementById("slider");
const sliderNextButton = document.querySelector(".slider__next");
const sliderPrevButton = document.querySelector(".slider__prev");

if (!sliderNextButton) console.warn("Warning: .slider__next button not found!");
if (!sliderPrevButton) console.warn("Warning: .slider__prev button not found!");

function renderSlider() {
    slider.innerHTML = ""; // Clear old slides

    cardData.forEach((card) => {
        const cardElement = document.createElement("article");
        cardElement.classList.add("dish__card", "swiper-slide");

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
                    <img class="add_to_cart" src="./assets/icons/add_to_cart.png" alt="Add to cart" />
                </div>
            </div>
            ${card.discount && card.discount !== "0%" ? `<p class="dish__discount">${card.discount}</p>` : ""}
        `;

        slider.appendChild(cardElement);
    });
}

// Ensure DOM is loaded before initializing Swiper
document.addEventListener("DOMContentLoaded", function () {
    renderSlider();

    const sliderWrapper = document.querySelector(".swiper");

    if (sliderWrapper) {
        new Swiper(".swiper", {
            slidesPerView:3,  // Ensure correct sizing
            spaceBetween: 10,       // Space between slides
            loop: true,             // Enable infinite sliding
            centeredSlides: true,   // Center active slide
            navigation: {
                nextEl: ".slider__next",
                prevEl: ".slider__prev",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                    navigation: false, // Disable controls for small screens
                },
            },
        });
    } else {
        console.error("Swiper container not found!");
    }
});
