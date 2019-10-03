const cors = require("cors");
const express = require("express");
const request = require('request-promise');
const cheerio = require('cheerio');
const router = express.Router();
const urlSportLimit = 'https://www.sportnolimitravel.com/es/eventos-de-ciclismo/';
const urlRacetick = 'https://racetick.com/es/search?sport=cycling&categories=cycling%3Amtb%2Ccycling%3Across-road%2Ccycling%3Agravel%2Ccycling%3Astages&location&date=all-futures&fromDate=2019-09-26&toDate&page=1&limit=85&searchId=5d8cc72007f41300301a9156&isEpic=false&hasPromotion&highlight=false&extraClass=o-wrap-grid__item';

const app = express();

// Middleware


app.use(cors());

// Eventos de sportnolimitravel.com
app.get('/sportlimit', (req, res) => {
	request(urlSportLimit)
	.then(function(html) {
		let $ = cheerio.load(html);
		let response = [];
		$('div.list-races div.list-item',html).each(function (i, e) {
			var titulo = $(this).find('div.list-item-data h2.list-item-title').contents().first().text().trim();
			var fecha = $(this).find('div.list-item-data h2.list-item-title div.list-item-subtitle').text().trim();
			var localidad = $(this).find('div.list-item-race').text().trim();
			var imgUrl = $(this).find('a').attr('href');
			response.push( {
				titulo: titulo,
				fecha: fecha,
				localidad: localidad,
				imgUrl: imgUrl
			});
		});
		res.json(response);
	});
});

// Eventos de racetick.com
app.get('/racetick', (req, res) => {
	request(urlRacetick)
	.then(function(html) {
		let $ = cheerio.load(html);
		let response = [];
		$('.o-wrap-grid__item',html).each(function (i, e) {
			var fecha = $(this).find('span.m-card__date').text().trim();
			var titulo = $(this).find('h3.m-card__title').text().trim();
			var localidad = $(this).find('div.m-card__location span.m-card__location-text').text().trim();
			var imgUrl = $(this).find('img.m-card__image').attr('src');
			if(titulo.includes(' | ')) {
				titulo = titulo.split(' | ')[1];
			}

			response.push({
				titulo: titulo,
				fecha: fecha,
				localidad: localidad,
				imgUrl: imgUrl
			});

		});
		res.json(response);
	});
});



app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
