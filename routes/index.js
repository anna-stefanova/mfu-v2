const express = require('express');
const handlers = require('../controllers/handlers');

const router = express.Router();

const homeRouter = require('.//home');
const manualRouter = require('.//manual');
const usersRouter = require('.//users');
const consultationRouter = require('.//consultation');
const infoRouter = require('.//info');
const paymentRouter = require('.//payment');
const transmissionRouter = require('.//transmission');

router.use('/', homeRouter);
router.use('/manual', manualRouter);
router.use('/users', usersRouter);
router.use('/consultation', consultationRouter);
router.use('/info', infoRouter);
router.use('/payment', paymentRouter);
router.use('/transmission', transmissionRouter);

// 404 Page
router.use(handlers.notFound);

// 500 Page
router.use(handlers.serverError);

module.exports = router;
