const express = require('express');
const {getConsultationHandler} = require("../controllers/consultation");

const router = express.Router();

router.get('/', getConsultationHandler);

module.exports = router;