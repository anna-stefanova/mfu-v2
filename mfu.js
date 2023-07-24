const express = require('express');
const { engine } = require('express-handlebars');

const manualRouter = require('./router/manual');

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

app.use('/manual', manualRouter);

// 404 Page
app.use((req, res) => {
    res.status(404);
    res.render('404', {
        title: '404 - Не найдено'
    });
});

// 500 Page
app.use((req, res) => {
    res.status(500);
    res.render('500', {
        title: '500 - ошибка сервера'
    });
});

const PORT= process.env.PORT || 3010;

app.listen(PORT, () => console.log(`Express run on the http://localhost:${PORT}; press Ctrl+C for finishing`));