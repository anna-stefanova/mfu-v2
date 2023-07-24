const express = require('express');
const {getTransmissionHandler} = require("../controllers/transmission");

const router = express.Router();

router.get('/', getTransmissionHandler);

module.exports = router;