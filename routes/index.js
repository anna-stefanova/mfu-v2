const express = require('express');
const handlers = require('../controllers/handlers');

const router = express.Router();

const homeRouter = require('.//home');
const manualRouter = require('.//manual');
const userRouter = require('./user');
const consultationRouter = require('.//consultation');
const infoRouter = require('.//info');
const paymentRouter = require('.//payment');
const transmissionRouter = require('.//transmission');
const qrRouter = require('.//qr');
const docsRouter = require('./docs');

router.use('/', homeRouter);
router.use('/manual', manualRouter);
router.use('/user', userRouter);
router.use('/consultation', consultationRouter);
router.use('/info', infoRouter);
router.use('/payment', paymentRouter);
router.use('/transmission', transmissionRouter);
router.use('/qr', qrRouter);
router.use('/docs', docsRouter);

// 404 Page
router.use(handlers.notFound);

// 500 Page
router.use(handlers.serverError);

module.exports = router;
