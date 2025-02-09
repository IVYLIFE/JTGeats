import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector(".swiper-wrapper");
    
    if (sliderWrapper) {  // Ensure Swiper exists
        const swiper = new Swiper(".swiper", {
            slidesPerView: 12,
            spaceBetween: 10,

            navigation: {
                nextEl: ".slider__next",
                prevEl: ".slider__prev",
            },


            breakpoints: {
                1024: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                    navigation: false,
                },
            },
        });
    } else {
        console.error("Swiper container not found!");
    }
});
