const express = require('express');
const {getUsersHandler} = require("../controllers/users");

const router = express.Router();

router.get('/', getUsersHandler);

module.exports = router;