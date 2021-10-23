const form = document.querySelector("form");
form.addEventListener("submit", formSend);

async function formSend(e) {
	e.preventDefault();
	let error = formValidate();

	if (error == 0) {
		document.querySelector("form").reset();
	}
}

// --------------------------------------------------

let check = document.querySelectorAll(".check");
// console.log(check);

function formValidate() {
	let error = 0;
	for (let i = 0; i < check.length; i++) {
		const input = check[i];
		removeError(input);
		if (input.classList.contains("input__email")) {
			if (emailTest(input)) {
				addError(input);
				error++;
			}
		}
	}
	return error;
}

// add _active class
function addError(input) {
	input.parentElement.classList.add("_active");
	input.classList.add("_active");
	input.nextElementSibling.classList.add("_active");
}
// remove _active class
function removeError(input) {
	input.parentElement.classList.remove("_active");
	input.classList.remove("_active");
	input.nextElementSibling.classList.remove("_active");
}
// email validation
function emailTest(input) {
	return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		input.value
	);
}

// --------------------------------------------------------------------

const emailInput = document.querySelectorAll(".form__input");

emailInput.forEach(el => {
	el.addEventListener("focus", function () {
		removeError(el);
	});
});

// --------------------------------------------------------------------

const body = document.querySelector("body");
const inputEmail = document.querySelector(".input__email");
const emailError = document.querySelector(".email__error");

body.addEventListener("click", event => {
	if (event.target == body) {
		inputEmail.classList.remove("_active");
		inputEmail.value = "";
		emailError.classList.remove("_active");
	}
});
