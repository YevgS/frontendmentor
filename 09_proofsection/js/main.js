let $ = document.querySelector.bind(document);
// 	$$ = document.querySelectorAll.bind(document);

const shareArrow = $(".share__arrow");
const infoBottom = $(".info__bottom");
const infoHidden = $(".info__hidden");
const iconsShare = $(".icon__share__desktop");

// const menuBody = document.querySelector(".menu__body");
if (shareArrow) {
	shareArrow.addEventListener("click", function (e) {
		shareArrow.classList.toggle("active");
		infoBottom.classList.toggle("active");
		infoHidden.classList.toggle("active");
		iconsShare.classList.toggle("active");
	});
}
