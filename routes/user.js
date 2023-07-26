const express = require('express');
const {getUsersHandler} = require("../controllers/user");

const router = express.Router();

router.get('/', getUsersHandler);

module.exports = router;