// Корзина   // Корзина   // Корзина   // Корзина   // Корзина   // Корзина   // Корзина   // Корзина 


const productsBtn = document.querySelectorAll('.product__btn');
const fillingList = document.querySelector('.filling__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

// const productsBtn = document.querySelectorAll('.product__btn');
// const cartProductsList = document.querySelector('.cart-content__list');
// const cart = document.querySelector('.cart');
// const cartQuantity = cart.querySelector('.cart__quantity');
// const fullPrice = document.querySelector('.fullprice');
// let price = 0;


const randomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
  return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;
};




const printFullPrice = () => {
  fullPrice.textContent = `${normalPrice(price)} ₽`;
};

const printQuantity = () => {
	let length = fillingList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent = length;
  length > 0 ? cart.classList.add('active') : cart.classList.remove('active');

};


const generateCartProduct = (img, title, price, id) => {
  return `
		<li class="filling__list-item">
			<article class="filling__product product" data-id="${id}">
				<img src="${img}" alt="" class="product__img">
				<div class="product__text">
					<h3 class="product__title">${title}</h3>
					<span class="product__price">${normalPrice(price)}</span>
				</div>
				<button class="product__delete my-btn" aria-label="Удалить товар">
        <svg class="trash" width="30" height="30">
        <use xlink:href="img/sprite.svg#trash"></use>
      </svg>
        </button>
			</article>
		</li>
	`;
};

productsBtn.forEach(el => {
  el.closest('.product').setAttribute('data-id', randomId());

  el.addEventListener('click', (e) => {
    let self = e.currentTarget;
    let parent = self.closest('.product');
    let id = parent.dataset.id;
    let img = parent.querySelector('.product__img img').getAttribute('src');
    let title = parent.querySelector('.product__name').textContent;
    // let priceString = priceWithoutSpaces(parent.querySelector('.product__price').textContent);
    let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product__price').textContent));


    plusFullPrice(priceNumber);

    printFullPrice();
    printQuantity();

    fillingList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));

    self.disabled = true;
  });
});


// 50.09