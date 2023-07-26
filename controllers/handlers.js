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

exports.transliterate = (word) => {
    const a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
    return word.split('').map(function (char) {
        return a[char] || char;
    }).join("");
}