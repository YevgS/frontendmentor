// catchTracking();

// async function catchTracking() {
// 	const response = await fetch("data.json");

// 	const json = await response.json();
// 	console.log(json);
// }

//  ------------------------------------------------------------------------

const mainTimeframe = document.querySelectorAll(".main__timeframe");

if (mainTimeframe.length > 0) {
	mainTimeframe.forEach(elem => {
		elem.addEventListener("click", function () {
			if (elem.classList.contains("daily")) {
				getDailyInfo();
			} else if (elem.classList.contains("weekly")) {
				getWeeklyInfo();
			} else {
				getMonthlyInfo();
			}
		});
	});
}

// --------------- insert block to HTML page -------------------------------

const categoryItems = document.querySelector(".category__items");

function displayDailyCategory(title, current, previous, item) {
	const html = `<div class="category__item item_${item}">
					<div class="card__header">
						<div class="category">${title}</div>
						<img class="ellipsis" src="./images/icon-ellipsis.svg" alt="" />
					</div>
					<div class="card__hours">
						<span class="current">${current}hrs</span>
						<div class="previous__hours">
							<span class="timeframe">Last Day</span> - <span class="hours">${previous}hrs</span>
						</div>
					</div>
				</div>`;

	categoryItems.insertAdjacentHTML("beforeend", html);
}

function displayWeeklyCategory(title, current, previous, item) {
	const html = `<div class="category__item item_${item}">
					<div class="card__header">
						<div class="category">${title}</div>
						<img class="ellipsis" src="./images/icon-ellipsis.svg" alt="" />
					</div>
					<div class="card__hours">
						<span class="current">${current}hrs</span>
						<div class="previous__hours"><span class="timeframe">Last Week</span> - <span class="hours">${previous}hrs</span></div>
					</div>
				</div>`;

	categoryItems.insertAdjacentHTML("beforeend", html);
}

function displayMonthlyCategory(title, current, previous, item) {
	const html = `<div class="category__item item_${item}">
					<div class="card__header">
						<div class="category">${title}</div>
						<img class="ellipsis" src="./images/icon-ellipsis.svg" alt="" />
					</div>
					<div class="card__hours">
						<span class="current">${current}hrs</span>
						<div class="previous__hours"><span class="timeframe">Last Month</span> - <span class="hours">${previous}hrs</span></div>
					</div>
				</div>`;

	categoryItems.insertAdjacentHTML("beforeend", html);
}

//  ------------------------------------------------------------------------

function getDailyInfo() {
	fetch("data.json")
		.then(function name(response) {
			if (response.ok === false) {
				throw new Error("Something went wrong!");
			}
			return response.json();
		})
		.then(
			function (dataArray) {
				let [work, play, study, exercise, social, selfCare] = dataArray;
				var item = 0;
				console.log(item);
				dataArray.forEach(elem => {
					item++;
					let title = elem.title;
					let current = elem.timeframes.daily.current;
					let previous = elem.timeframes.daily.previous;

					displayDailyCategory(title, current, previous, item);
				});
			},
			function (error) {
				alert("Error #1: " + error);
			}
		);
	categoryItems.innerHTML = "";

	const periods = document.querySelectorAll(".main__timeframe");

	for (let elem of periods) {
		if (elem.classList.contains("_active")) {
			elem.classList.remove("_active");
		}
		if (elem.classList.contains("daily")) {
			elem.classList.add("_active");
		}
	}
}

//  ------------------------------------------------------------------------

function getWeeklyInfo() {
	fetch("data.json")
		.then(function name(response) {
			if (response.ok === false) {
				throw new Error("Something went wrong!");
			}
			return response.json();
		})
		.then(
			function (dataArray) {
				let [work, play, study, exercise, social, selfCare] = dataArray;
				var item = 0;
				dataArray.forEach(elem => {
					item++;
					let title = elem.title;
					let current = elem.timeframes.weekly.current;
					let previous = elem.timeframes.weekly.previous;
					displayWeeklyCategory(title, current, previous, item);
				});
			},
			function (error) {
				alert("Error #1: " + error);
			}
		);

	categoryItems.innerHTML = "";

	const periods = document.querySelectorAll(".main__timeframe");

	for (let elem of periods) {
		if (elem.classList.contains("_active")) {
			elem.classList.remove("_active");
		}
		if (elem.classList.contains("weekly")) {
			elem.classList.add("_active");
		}
	}
}

//  ------------------------------------------------------------------------

function getMonthlyInfo() {
	fetch("data.json")
		.then(function name(response) {
			if (response.ok === false) {
				throw new Error("Something went wrong!");
			}
			return response.json();
		})
		.then(
			function (dataArray) {
				var item = 0;
				let [work, play, study, exercise, social, selfCare] = dataArray;
				dataArray.forEach(elem => {
					item++;
					let title = elem.title;
					let current = elem.timeframes.monthly.current;
					let previous = elem.timeframes.monthly.previous;
					displayMonthlyCategory(title, current, previous, item);
				});
			},
			function (error) {
				alert("Error #1: " + error);
			}
		);
	categoryItems.innerHTML = "";

	const periods = document.querySelectorAll(".main__timeframe");

	for (let elem of periods) {
		if (elem.classList.contains("_active")) {
			elem.classList.remove("_active");
		}
		if (elem.classList.contains("monthly")) {
			elem.classList.add("_active");
		}
	}
}

getWeeklyInfo();
