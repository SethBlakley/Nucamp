const express = require('express');

//create a new express router
const campsiteRouter = express.Router();

// .all - routing method that's a catch-all for all http verbs
// like all routing methods it takes a path as the first parameter '/campsites'
// any http request to this path will trigger this method
// 2nd parameter pass in a callback function (req,res,next) =>and set a response statusCode...
// then call the next() function which will pass control of the application routing to the next relevant routing method
//chain the methods - remove app and the ; at the end of each method

campsiteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //send back plain text in the response body
    next();
})

// next routing method set up an endpoint for a get request to the path '/campsites'
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

//reject the request to this endpoint - operation is not supported
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

// Add a new campsiteRouter.route() method, and as its argument, give it the path of '/:campsiteId'
// 4 more endpoints that support a different path, route parameter added :campsiteId

campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //send back plain text in the response body
    next();
})
.get((req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})

//post request not supported on this path - but send message back
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

// send a multi-line response res.write \n res.end
.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})
//endpoint is used for deleting a specific campsite
.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//export the campsiteRouter to use
module.exports = campsiteRouter;