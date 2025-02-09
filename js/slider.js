import { cardData } from "../assets/data.js";

const slider = document.getElementById("slider");
const sliderNextButton = document.querySelector(".slider__next") || console.warn("Warning: .slider__next button not found!");
const sliderPrevButton = document.querySelector(".slider__prev") || console.warn("Warning: .slider__prev button not found!");

let currentIndex = 0;
let isAnimating = false;
let visibleSlides = getVisibleSlides(); // Initialize with correct number of slides

function getVisibleSlides() {
    if (window.innerWidth >= 1024) return 3; // Large screens
    if (window.innerWidth >= 768) return 2;  // Medium screens
    return 1;                                // Small screens
}

// Recalculate slides on resize
window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    renderSlider(); // Re-render with the new slide count
});

function renderSlider(direction = "next") {
    if (isAnimating) return;
    isAnimating = true;

    // Get all current slides
    const slides = [...slider.children];

    // Apply animation before updating
    slides.forEach((slide) => {
        slide.classList.add(direction === "next" ? "slide-left" : "slide-right");
    });

    // Wait for transition to complete
    setTimeout(() => {
        slider.innerHTML = ""; // Clear slider

        for (let i = 0; i < visibleSlides; i++) {
            let index = (currentIndex + i) % cardData.length;
            const card = cardData[index];

            const cardElement = document.createElement("article");
            cardElement.classList.add("dish__card");

            if (i === Math.floor(visibleSlides / 2)) cardElement.classList.add("active__slide");

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

            // New slides start from the opposite side
            cardElement.classList.add(direction === "next" ? "slide-right" : "slide-left");

            slider.appendChild(cardElement);
        }

        setTimeout(() => {
            document.querySelectorAll("#slider.dish").forEach((slide) => {
                slide.classList.remove("slide-left", "slide-right");
                slide.classList.add("reset-slide");
            });

            isAnimating = false;
        }, 50);
    }, 500);
}

// // Button actions
// sliderNextButton.addEventListener("click", () => {
//     currentIndex = (currentIndex + 1) % cardData.length;
//     renderSlider("next");
// });

// sliderPrevButton.addEventListener("click", () => {
//     currentIndex = (currentIndex - 1 + cardData.length) % cardData.length;
//     renderSlider("prev");
// });

// Initial render
renderSlider();
