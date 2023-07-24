const express = require('express');
const {getInfoHandler} = require("../controllers/info");

const router = express.Router();

router.get('/', getInfoHandler);

module.exports = router;