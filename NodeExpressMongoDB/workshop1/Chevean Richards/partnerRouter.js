const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .all("/partners", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get("/partners", (req, res) => {
    res.end("Will send all the partners to you");
  })
  .post("/partners", (req, res) => {
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put("/partners", (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete("/partners", (req, res) => {
    res.end("Deleting all partners");
  })
  .get("/partners/:partnerId", (req, res) => {
    res.end(
      `Will send details of the partner: ${req.params.partnerId} to you`
    );
  })
  .post("/partners/:partnerId", (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put("/partners/:partnerId", (req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete("/partners/:partnerId", (req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

module.exports = partnerRouter;
