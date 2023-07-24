const getUsersHandler = (req, res) => {
    res.render('users', {
        title: 'Личный кабинет клиента',
        pageClass: 'user'
    });
}

module.exports = {
    getUsersHandler
};