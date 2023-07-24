const getHomeHandler = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};

module.exports = {
    getHomeHandler
};