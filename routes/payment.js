const express = require('express');
const {getPaymentHandler} = require("../controllers/payment");

const router = express.Router();

router.get('/', getPaymentHandler);

module.exports = router;