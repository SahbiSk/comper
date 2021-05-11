const express = require("express");
const orderRouter = express.Router();
const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middlewares/authenticate");

orderRouter.post("/checkorder", auth, orderCtrl.checkOrder);

module.exports = orderRouter;
