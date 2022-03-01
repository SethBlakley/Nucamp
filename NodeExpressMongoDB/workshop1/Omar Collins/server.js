const express = require('express');
const morgan = require('morgan');

const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

app.use(express.static(__dirname + '/public'));


app.use((req, res) => {
	res.statusCode = 200;
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});