const express = require('express');
const { engine } = require('express-handlebars');
const router = require('./routes');

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use(router);

const PORT= process.env.PORT || 3010;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Express run on the http://localhost:${PORT}; press Ctrl+C for finishing`));
} else {
    module.exports = app;
}