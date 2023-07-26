const getQrHandler = (req, res, next) => {
    res.render('qr', {
        title: 'Оплата по QR-коду',
        pageClass: 'qr',
    });
};

module.exports = {
    getQrHandler
};