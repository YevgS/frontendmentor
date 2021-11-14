// import module
let fs = require("fs");
let http = require("http");
let url = require("url");

let data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, "utf-8");
let prodData = JSON.parse(data);

// reading template
let overview = fs.readFileSync(`${__dirname}/../templates/template-overview.html`, "utf-8");
let card = fs.readFileSync(`${__dirname}/../templates/template-card.html`, "utf-8");
let product = fs.readFileSync(`${__dirname}/../templates/template-product.html`, "utf-8");

// function for replacement

let replaceTemplate = require("../modules/replaceTemplate");

// -------------------------------------------------------------------------

// reading from file synchronously
let textIn = fs.readFileSync("../text/input.txt", "utf-8");
// console.log(textIn);

// writing into a file sychronouwlsy
// fs.writeFileSync("../text/output.txt", `Short paragraph form the book: ${textIn}\n\nCreatead Date ${Date.now()}`);

// -------------------------------------------------------------------------

// reading from file asynchronously

fs.readFile("../text/start.txt", "utf-8", (err, dataText) => {
	// console.log(dataText);
	fs.readFile(`../text/${dataText}.txt`, "utf-8", (err, data2) => {
		// console.log(data2);

		fs.writeFile("../text/final.txt", `${textIn}\n\n${data2}`, function () {
			console.log("File is written!");
		});
	});
});

// 1. Create the server

let server = http.createServer((req, res) => {
	// let path = req.url;
	let {query, pathname} = url.parse(req.url, true);

	if (pathname === "/" || pathname === "/overview") {
		// res.end("This is OVERVIEW page.");
		let cardHTML = prodData.map(prod => replaceTemplate(card, prod)).join("");
		let output = overview.replace("{PRODUCTCARD}", cardHTML);
		res.writeHead(200, {
			"content-type": "text/html",
		});
		res.end(output);
		// console.log(cardHTML);
	} else if (pathname === "/product") {
		// res.end("This is PRODUCT page.");
		let prod = prodData[query.id];
		let output = replaceTemplate(product, prod);
		res.writeHead(200, {
			"content-type": "text/html",
		});
		res.end(output);
	} else if (pathname === "/api") {
		// fs.readFile(`${__dirname}/../dev-data/iPhone.json`, "utf-8", (err, data) => {
		// 	convert JSON string to JS object
		// 	let prodData = JSON.parse(data);
		// 	res.writeHead(200, {
		// 		"content-type": "application/json",
		// 	});
		// 	res.end(data);
		// });
		res.writeHead(200, {
			"content-type": "application/json",
		});
		res.end(data);
	} else {
		res.writeHead(404, {
			"content-type": "text/html",
			"my-header": "Hi there!",
		});
		res.end("<h1 style='color: red;'>Page not found!</h1>");
	}
	// console.log(req.url);
	// res.end("Hello from the server! Are you kidding?");
	// console.log(res);
});

// 2. Start server
server.listen(8000, "127.0.0.1", () => {
	console.log("\n\nServer has started...\n");
});
