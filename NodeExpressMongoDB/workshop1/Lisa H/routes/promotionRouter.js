const express = require('express');

//create a new express router
const promotionRouter = express.Router();

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //send back plain text in the response body
    next();
})

// next routing method set up an endpoint for a get request to the path '/promotions'
.get((req, res) => {
    res.end('Will send all the promotion information to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})

//reject the request to this endpoint - operation is not supported
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all');
});

// Add a new promotionRouter.route() method, and as its argument, give it the path of '/:promotionId'
// 4 more endpoints that support a different path, route parameter added :campsiteId

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //send back plain text in the response body
    next();
})
.get((req, res) => {
    res.end(`Will send details of the promotions: ${req.params.promotionId} to you`);
})

//post request not supported on this path - but send message back
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})

// send a multi-line response res.write \n res.end
.put((req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
})
//endpoint is used for deleting a specific campsite
.delete((req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
});

//export the promotionRouter to use
module.exports = promotionRouter;