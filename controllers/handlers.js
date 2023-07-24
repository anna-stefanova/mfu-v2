exports.notFound = (req, res) => {
    res.status(404);
    res.render('404', {
        title: '404 - Не найдено'
    });
};

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    res.status(500);
    res.render('500', {
        title: '500 -  Ошибка сервера'
    });
};
/* eslint-enable no-unused-vars */