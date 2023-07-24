const express = require('express');
const {getManualHandler} = require('../controllers/manual');

const router = express.Router();

router.get('/', getManualHandler);

module.exports = router;