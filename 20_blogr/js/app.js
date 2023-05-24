// -------------------- Interface -----------------------------

const tips = document.querySelectorAll(".tip");
const inputs = document.querySelectorAll("input[type]");
const resetBtn = document.querySelector(".reset__btn");

const zeroError = document.querySelector(".zero__error");

// -------------------- Outputs ---------------------------

let tipAmoutn = document.querySelector(".tip__amount");
let totalFromPerson = document.querySelector(".total__person");

// ----------------------  Inputs --------------------

let totalBill = document.querySelector(".total__bill");
let tipCustom = document.querySelector(".tip__custom");
let peopleNumber = document.querySelector(".people__number");

// ---------------- divs for reset ---------------------

const billTotal = document.querySelector(".bill__total");
const tipPercent = document.querySelector(".tip__percent");
const numberPeople = document.querySelector(".number__people");

// -------------- tips div remove active -----------------

function removeActive() {
	for (let tip of tips) {
		tip.classList.remove("_active");
	}
}

// ----------------- tips % add/remove & active/error ----------------

tips.forEach(el => {
	el.addEventListener("click", function () {
		let customTip = document.querySelector(".tip__custom");

		if (el.classList.contains("_active")) {
			removeActive();
			el.parentElement.classList.remove("_active");
		} else {
			removeActive();
			el.classList.add("_active");
			el.parentElement.classList.add("_active");
			customTip.value = "";
			customTip.classList.remove("_error");
			customTip.parentElement.classList.remove("_error");
		}
	});
});

//  --------- inputs add/remove active/error ---------------------

inputs.forEach(
	input =>
		(input.oninput = function () {
			if (checkInput(input) && !input.classList.contains("people__number")) {
				if (input.classList.contains("tip__custom")) {
					removeActive();
				}
				input.classList.add("_active");
				input.parentElement.classList.add("_active");

				input.classList.remove("_error");
				input.parentElement.classList.remove("_error");
			} else {
				input.classList.remove("_active");
				input.parentElement.classList.remove("_active");

				input.classList.add("_error");
				input.parentElement.classList.add("_error");
			}

			if (input.classList.contains("people__number")) {
				if (checkInputPeople(input)) {
					input.classList.add("_active");
					input.parentElement.classList.add("_active");

					input.classList.remove("_error");
					input.parentElement.classList.remove("_error");
				} else {
					input.classList.remove("_active");
					input.parentElement.classList.remove("_active");

					input.classList.add("_error");
					input.parentElement.classList.add("_error");
				}
			}

			if (input.value == "") {
				input.classList.remove("_active");
				input.parentElement.classList.remove("_active");

				input.classList.remove("_error");
				input.parentElement.classList.remove("_error");
			}

			if (input.classList.contains("tip__custom")) {
				removeActive();
			}
		})
);

// ----------------- regex is number 1234567890 or 00.00 -------------------------

function checkInput(input) {
	let x = input.value;
	const regex1 = /^[0-9]+$/;
	const regex2 = /^[0-9]+(\.[0-9]{0,2})$/;
	if (x.match(regex1)) {
		return true;
	} else {
		if (x.match(regex2)) {
			return true;
		}
	}
	return false;
}

function checkInputPeople(input) {
	let x = input.value;
	const regex1 = /^[0-9]+$/;

	if (x.match(regex1)) {
		return true;
	}
	return false;
}

// ---------------------- hidden storage -------------------

let hBill = document.querySelector(".h_bill");
let hTips = document.querySelector(".h_tips");
let hTip = document.querySelector(".h_tip");
let hNum = document.querySelector(".h_num");

// -------------------------------------------------------

// hBill
totalBill.addEventListener("input", function () {
	let bill = "";
	if (totalBill.classList.contains("_active")) {
		bill += totalBill.value;
	}
	hBill.innerHTML = bill;
	count();
});

// hTips --------------------------------------------

tips.forEach(el => {
	el.addEventListener("click", function () {
		let tips = "";
		if (el.classList.contains("_active")) {
			tips += el.innerHTML;
		}
		hTips.innerHTML = parseInt(tips);
		count();
	});
});

// hTip
tipCustom.addEventListener("input", function () {
	let tip = "";
	if (tipCustom.classList.contains("_active")) {
		tip += tipCustom.value;
	}
	hTips.innerHTML = tip;
	count();
});

// hNum
peopleNumber.addEventListener("input", function () {
	let num = "";
	if (peopleNumber.classList.contains("_active")) {
		num += peopleNumber.value;
	}
	hNum.innerHTML = parseInt(num);
	count();
});

//  ------------------- calc logic ------------------------

function count() {
	let bill = hBill;
	let billValue = 0;

	let tips = hTips;
	let tipValue = 0;

	let num = hNum;
	let numValue = 0;

	// ----------------------- calculation -------------------

	billValue = parseFloat(bill.innerHTML);

	tipValue = tips.innerHTML;

	numValue = num.innerHTML;

	if (billValue > 0 && tipValue > 0 && numValue > 0) {
		zeroError.classList.remove("show");
		numberPeople.classList.remove("_red");
		tipAmoutn.innerHTML = "$" + ((billValue * tipValue * 0.01) / numValue).toFixed(2);
		totalFromPerson.innerHTML = "$" + ((billValue + billValue * tipValue * 0.01) / numValue).toFixed(2);
	} else {
		totalFromPerson.innerHTML = "$0.00";
		tipAmoutn.innerHTML = "$0.00";
	}

	//  ----------------------- zero number of people error  -------------------

	if ((billValue > 0 && tipValue > 0 && numValue <= 0) || (billValue > 0 && tipValue > 0 && isNaN(numValue))) {
		zeroError.classList.add("show");
		numberPeople.classList.add("_red");
	} else {
		zeroError.classList.remove("show");
		numberPeople.classList.remove("_red");
	}

	//  ---------------------- showing reset ------------------------------

	if (
		billTotal.classList.contains("_active") ||
		tipPercent.classList.contains("_active") ||
		numberPeople.classList.contains("_active") ||
		billTotal.classList.contains("_error") ||
		tipPercent.classList.contains("_error") ||
		numberPeople.classList.contains("_error")
	) {
		resetBtn.classList.add("_active");
	} else {
		resetBtn.classList.remove("_active");
	}

	return true;
}

// ---------- remove error ------------------------

function clear(input) {
	input.value = "";
	input.classList.remove("_error");
	input.parentElement.classList.remove("_error");
}

//  --------- reset tips ------------------------

function reset(tip) {
	tip.classList.remove("_active");
}

// ---------- Reset all -------------------------

resetBtn.addEventListener("click", () => {
	resetBtn.classList.remove("_active");
	inputs.forEach(clear);
	tips.forEach(reset);
	totalFromPerson.innerHTML = "$0.00";
	tipAmoutn.innerHTML = "$0.00";
	hBill.innerHTML = "";
	hTips.innerHTML = "";
	hNum.innerHTML = "";
	zeroError.classList.remove("show");
	numberPeople.classList.remove("_red");
});
