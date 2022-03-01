const express = require('express');
const promotionRouter = express.Router();

//Default Routes
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
		res.end('PUT operation not supported on /promotions');
	})
	.delete((req, res) => {
		res.end('Deleting all promotions');
	});
//Specific Campsite Id
promotionRouter.route('/:promotionId')
	.get((req, res) => {
		res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
	});

module.exports = promotionRouter;

