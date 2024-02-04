const swiper_catalog = new Swiper('.swiper.swiper_catalog', {
    // Optional parameters
    slidesPerView:5,
    direction: 'horizontal',
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // when window width is >= 640px
        767: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 20
        }
    }
});
const swiper_search = new Swiper('.swiper.swiper_search', {
    // Optional parameters
    slidesPerView:1,
    direction: 'horizontal',
    spaceBetween: 20,
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});