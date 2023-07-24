const getManualHandler = (req, res) => {
    res.render('manual', {
        layout: 'other.hbs',
        title: 'Manual'
    });
};

module.exports = {getManualHandler};