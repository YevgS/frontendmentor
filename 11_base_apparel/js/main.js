(function () {
	let $ = document.querySelector.bind(document);

	let input = document.querySelector(".check");
	const form = document.getElementById("form");
	form.addEventListener("submit", formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		if (error == 0) {
			removeError(input);
			document.getElementById("form").reset();

			let response = $("#thank__you");

			setTimeout(thankYouFadeIn, 300);

			function thankYouFadeIn() {
				response.style.visibility = "visible";
				setTimeout(thankYouFadeOut, 1000);
			}

			function thankYouFadeOut() {
				response.style.visibility = "hidden";
			}
		}
	}

	function formValidate(form) {
		let error = 0;

		let input = document.querySelector(".check");

		if (input.classList.contains("email__input")) {
			if (emailTest(input)) {
				addError(input);
				error++;
			}
		}
		return error;
	}

	// add _active class
	function addError(input) {
		input.parentElement.classList.add("_active");
		input.classList.add("_active");
	}
	function removeError(input) {
		input.parentElement.classList.remove("_active");
		input.classList.remove("_active");
	}

	// email validation
	function emailTest(input) {
		// return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
		return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			input.value
		);
	}

	const emailInput = document.querySelector(".email__input");
	// console.log(emailInput);
	emailInput.addEventListener("blur", function () {
		document.querySelector(".email__input").classList.remove("_active");
		document.querySelector(".email__block").classList.remove("_active");
	});

	document.getElementById("email").addEventListener("focus", () => {
		// remove error message when cursor focused
		document.getElementById("email").classList.remove("_active");
		// also the error icon
		document.getElementById("error__icon").classList.remove("_active");
		// and the highlighted border
		// document.getElementById("errorBorder").classList.remove("error");
	});
})();
