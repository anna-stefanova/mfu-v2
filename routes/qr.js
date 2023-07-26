const express = require('express');
const {getQrHandler} = require("../controllers/qr");

const router = express.Router();

router.get('/', getQrHandler);

module.exports = router;