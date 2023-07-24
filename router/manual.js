const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('manual', {
        layout: 'other.hbs',
        title: 'Manual'
    });
});

module.exports = router;