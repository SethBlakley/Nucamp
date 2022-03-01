const express = require('express');

//create a new express router
const partnerRouter = express.Router();

partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //send back plain text in the response body
    next();
})

// next routing method set up an endpoint for a get request to the path '/partners'
.get((req, res) => {
    res.end('Will send all partner information to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})

//reject the request to this endpoint - operation is not supported
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all');
});

// Add a new partnerRouter.route() method, and as its argument, give it the path of '/:partnerId'
// 4 more endpoints that support a different path, route parameter added :partnerId

partnerRouter.route('/:partnerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //send back plain text in the response body
    next();
})
.get((req, res) => {
    res.end(`Will send details of the promotions: ${req.params.partnerId} to you`);
})

//post request not supported on this path - but send message back
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.partnerId}`);
})

// send a multi-line response res.write \n res.end
.put((req, res) => {
    res.write(`Updating the partners: ${req.params.partnerId}\n`);
    res.end(`Will update the partners: ${req.body.name}
        with description: ${req.body.description}`);
})
//endpoint is used for deleting a specific campsite
.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.partnerId}`);
});

//export the partnerRouter to use
module.exports = partnerRouter;