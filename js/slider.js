import { cardData } from "../assets/data.js";

const slider = document.getElementById("slider");
const sliderNextButton = document.querySelector(".slider__next");
const sliderPrevButton = document.querySelector(".slider__prev");


if (!sliderNextButton) console.warn("Warning: .slider__next button not found!");
if (!sliderPrevButton) console.warn("Warning: .slider__prev button not found!");

let currentIndex = 0;
let isAnimating = false;
let visibleSlides = getVisibleSlides();

function getVisibleSlides() {
    if (window.innerWidth >= 1024) return 3; // Large screens
    if (window.innerWidth >= 768) return 2;  // Medium screens
    return 1;                                // Small screens
}

// Debounce function to limit the rate of function execution
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Update the visible slides on window resize
window.addEventListener("resize", debounce(() => {
    visibleSlides = getVisibleSlides();
    renderSlider(); 
}, 200));

function renderSlider(isInitial = false) {
    slider.innerHTML = ""; // Clear old slides

    for (let i = 0; i < visibleSlides; i++) {
        let index = (currentIndex + i) % cardData.length;
        if (index < 0) index += cardData.length;

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
                    <img class="add_to_cart" src="./assets/icons/add_to_cart.png" alt="Add to cart" />
                </div>
            </div>
            ${card.discount && card.discount !== "0%" ? `<p class="dish__discount">${card.discount}</p>` : ""}
        `;

        slider.appendChild(cardElement);
    }
}

function slide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const offset = direction === "next" ? "-100%" : "100%";
    
    // Move all slides in the selected direction
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${offset})`;

    setTimeout(() => {
        // Reset position
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";

        // Update the index
        currentIndex = direction === "next" ? 
            (currentIndex + 1) % cardData.length : 
            (currentIndex - 1 + cardData.length) % cardData.length;

        renderSlider(); // Re-render without animation classes

        isAnimating = false;
    }, 500); // Match the transition time
}

// Button actions
if (sliderNextButton) {
    sliderNextButton.addEventListener("click", () => slide("next"));
}

if (sliderPrevButton) {
    sliderPrevButton.addEventListener("click", () => slide("prev"));
}

// Initial render (without animations)
renderSlider(true);