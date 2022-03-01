const express = require("express");
const promotionRouter = express.Router();

promotionRouter
  .all("/promotions", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get("/promotions", (req, res) => {
    res.end("Will send all the promotions to you");
  })
  .post("/promotions", (req, res) => {
    res.end(
      `Will add the promotions: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put("/promotions", (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete("/promotions", (req, res) => {
    res.end("Deleting all promotions");
  })
  .get("/promotions/:promotionId", (req, res) => {
    res.end(
      `Will send details of the promotion: ${req.params.promotionId} to you`
    );
  })
  .post("/promotions/:promotionId", (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
  })
  .put("/promotions/:promotionId", (req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete("/promotions/:promotionId", (req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
  });

module.exports = promotionRouter;
