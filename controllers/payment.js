const getPaymentHandler = (req, res) => {
    res.render('payment', {
        title: 'Оплата услуг',
        pageClass: 'payment',
    });
};

module.exports = {
    getPaymentHandler
};