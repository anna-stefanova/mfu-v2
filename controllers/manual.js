const getManualHandler = (req, res) => {
    res.render('manual', {
        title: 'Инструкция',
        pageClass: 'manual',
    });
};

module.exports = {getManualHandler};