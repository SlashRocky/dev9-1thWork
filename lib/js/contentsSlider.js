$(function () {
	var mySwiper = $('.swiper-container').swiper({
		mode: 'horizontal',
		loop: true,
		slidesPerView: 1,
		spaceBetween: 20,
		autoplay: 5000,
		simulateTouch: true,
		followFinger: false,
		grabCursor: false,
		touchReleaseOnEdges: true,
		autoplayDisableOnInteraction: false,
		autoplayStopOnLast: false,
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
	});
})