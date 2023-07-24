const getTransmissionHandler = (req, res) => {
    res.render('transmission', {
        title: 'Передача показаний приборов учета',
        pageClass: 'transmission',
    });
};

module.exports = {
    getTransmissionHandler
}