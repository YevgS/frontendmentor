document.querySelectorAll(".faq__title").forEach(item =>
	item.addEventListener("click", () => {
		const parent = item.parentNode;

		if (parent.classList.contains("active")) {
			parent.classList.remove("active");
		} else {
			document.querySelectorAll(".faq__item").forEach(elem => elem.classList.remove("active"));
			parent.classList.add("active");
		}
	})
);

const body = document.querySelector("body");
body.addEventListener("click", function (e) {
	if (e.target === body) {
		document.querySelectorAll(".faq__item").forEach(elem => elem.classList.remove("active"));
	}
});
