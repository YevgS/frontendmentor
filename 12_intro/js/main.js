const form = document.getElementById("form");
form.addEventListener("submit", formSend);

async function formSend(e) {
	e.preventDefault();
	let error = formValidate();

	if (error == 0) {
		document.getElementById("form").reset();
		let claim = document.querySelector(".form__claim"),
			thanks = document.querySelector(".form__thankyou");
		function thankYouFadeIn() {
			claim.style.visibility = "hidden";
			thanks.style.visibility = "visible";
			thanks.classList.add("show");
			setTimeout(thankYouFadeOut, 2500);
		}
		function thankYouFadeOut() {
			thanks.style.visibility = "hidden";
			thanks.classList.remove("show");
			claim.style.visibility = "visible";
		}
		thankYouFadeIn();
	}
}

// --------------------------------------------------

let check = document.querySelectorAll(".check");

function formValidate() {
	let error = 0;
	for (let i = 0; i < check.length; i++) {
		const input = check[i];
		removeError(input);
		if (input.value.trim() === "") {
			addError(input);
			error++;
		} else if (input.classList.contains("email")) {
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
}
// remove _active class
function removeError(input) {
	input.parentElement.classList.remove("_active");
	input.classList.remove("_active");
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

const main = document.querySelector("main");
const inputData = document.querySelectorAll(".input__data");

main.addEventListener("click", event => {
	if (event.target == main) {
		inputData.forEach(el => {
			el.classList.remove("_active");
		});
	}
});

// --------------------------------------------------------------------

function caret() {
	let input = document.querySelector("#name");
	let len = input.value.length;
	input.focus();
	input.setSelectionRange(len, len);
}
caret();
