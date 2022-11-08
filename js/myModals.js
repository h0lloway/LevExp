const btns = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal')
const closeBtns = document.querySelectorAll('.close-modal-btn')
const body = document.body;
const fixBlocks = document.querySelectorAll('.fix-block');



let disableScroll = function () {
	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	let pagePosition = window.scrollY;
	fixBlocks.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	});
	body.style.paddingRight = paddingOffset;
	body.classList.add('disable-scroll');
	body.dataset.position = pagePosition;
	body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	body.style.top = 'auto';
	body.classList.remove('disable-scroll');
	fixBlocks.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.style.paddingRight = '0px';
	window.scroll({ top: pagePosition, left: 0 });
	body.removeAttribute('data-position');
}

closeBtns.forEach(closeBtn => {
	closeBtn.addEventListener('click', function (event) {

		// document.querySelector('.modal-overlay').classList.remove('modal-overlay--visible');
		modalOverlay.classList.remove('modal-overlay--visible');
		// document.querySelector('.modal').classList.remove('modal--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		enableScroll();

	});
});

btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');


		disableScroll();

		modals.forEach((el) => {
			el.classList.remove('modal-overlay--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible')
		modalOverlay.classList.add('modal-overlay--visible');
	});
});


modalOverlay.addEventListener('click', (e) => {

	if (e.target == modalOverlay) {

		enableScroll();

		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});
	}
});
