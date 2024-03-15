const express = require('express');
const path = require('path');
const expbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const restaurants = require('./routes/restaurantRoutes');

const app = express();
const port = 3000;

app.engine('handlebars', expbs.engine({
	defaultView: "main",
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, '/views/partials')
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
	console.log("listening to requests at port", 3000);
});

app.use('/', restaurants);