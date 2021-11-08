const burger = document.querySelector(".burger");
const headerMeny = document.querySelector(".header__menu");
// console.log(headerMeny);

burger.addEventListener("click", function () {
	let items = burger.children;
	for (let item of items) {
		item.classList.toggle("active");
	}
	headerMeny.classList.toggle("active");
});

// Ckick scroll
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
console.log(menuLinks);
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
			window.scrollTo({
				top: gotoBlockValue,
			});
			e.preventDefault();
		}
	}
}
