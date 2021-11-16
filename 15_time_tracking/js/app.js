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

function displayDailyCategory(title, current, previous) {
	const html = `<div class="category__item">
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

function displayWeeklyCategory(title, current, previous) {
	const html = `<div class="category__item">
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

function displayMonthlyCategory(title, current, previous) {
	const html = `<div class="category__item">
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
	categoryItems.innerHTML = "";
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
				dataArray.forEach(elem => {
					let title = elem.title;
					let current = elem.timeframes.daily.current;
					let previous = elem.timeframes.daily.previous;

					displayDailyCategory(title, current, previous);
				});
			},
			function (error) {
				alert("Error #1: " + error);
			}
		);
}

//  ------------------------------------------------------------------------

function getWeeklyInfo() {
	categoryItems.innerHTML = "";
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
				dataArray.forEach(elem => {
					let title = elem.title;
					let current = elem.timeframes.weekly.current;
					let previous = elem.timeframes.weekly.previous;
					displayWeeklyCategory(title, current, previous);
				});
			},
			function (error) {
				alert("Error #1: " + error);
			}
		);
}

//  ------------------------------------------------------------------------

function getMonthlyInfo() {
	categoryItems.innerHTML = "";
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
				dataArray.forEach(elem => {
					let title = elem.title;
					let current = elem.timeframes.monthly.current;
					let previous = elem.timeframes.monthly.previous;
					displayMonthlyCategory(title, current, previous);
				});
			},
			function (error) {
				alert("Error #1: " + error);
			}
		);
}

getWeeklyInfo();
