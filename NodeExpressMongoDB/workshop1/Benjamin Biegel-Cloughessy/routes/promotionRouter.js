const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send promotion: ${req.params.promotionId} to you`)
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.params.promotionId} with name: ${req.body.name} nad description: ${req.body.description}`)
})
.put((req, res) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /:promotionId');
})
.delete((req, res) => {
    res.end(`Delete promotion ${promotionId}`)
})

module.exports = promotionRouter;