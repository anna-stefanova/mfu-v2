const express = require('express');
const { engine } = require('express-handlebars');

const handlers = require('./controllers/handlers');

const homeRouter = require('./router/home');
const manualRouter = require('./router/manual');

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));

app.use('/', homeRouter);
app.use('/manual', manualRouter);

// 404 Page
app.use(handlers.notFound);

// 500 Page
app.use(handlers.serverError);

const PORT= process.env.PORT || 3010;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Express run on the http://localhost:${PORT}; press Ctrl+C for finishing`));
} else {
    module.exports = app;
}