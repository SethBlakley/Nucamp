const express = require('express');
const morgan = require('morgan');

//require the campsiteRouter
const campsiteRouter = require('./routes/campsiteRouter');

//require the promotionRouter
const promotionRouter = require('./routes/promotionRouter');

//require the partnerRouter
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

// express middleware function to handle parsing json data into javascript properties of the request object
app.use(express.json());

//specify the path
app.use('/campsites', campsiteRouter);

//specify the path - promotions
app.use('/promotions', promotionRouter);

//specify the path - partners
app.use('/partners', partnerRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});