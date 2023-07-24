const getConsultationHandler = (req, res) => {
    res.render('consultation', {
        title: 'Видео-консультация',
        pageClass: 'consultation',
    });
}

module.exports = {
    getConsultationHandler
};