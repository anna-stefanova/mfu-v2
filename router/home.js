const express = require('express');
const {getHomeHandler} = require('../controllers/home');

const router = express.Router();

router.get('/', getHomeHandler);

module.exports = router;