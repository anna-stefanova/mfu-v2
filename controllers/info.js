const getInfoHandler = (req, res) => {
    res.render('info', {
        title: 'Информация',
        pageClass: 'info',
    });
};

module.exports = {
    getInfoHandler
};