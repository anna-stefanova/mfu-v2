const getUsersHandler = (req, res) => {
    res.render('user', {
        title: 'Личный кабинет клиента',
        pageClass: 'user'
    });
}

module.exports = {
    getUsersHandler
};