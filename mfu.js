const express = require('express');
const { engine } = require('express-handlebars');
const path = require("node:path");
const fs = require('node:fs');
const router = require('./routes');
const mongoose = require("mongoose");

const DB = require('config');

const dataDir = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

// convert form data to JS Object in POST, PUT, PATCH requests
app.use(express.json());
// converts form data to JS Object in POST, PUT, PATCH requests
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use(router);

const PORT= process.env.PORT || 3010;

async function start() {
    try {
        await mongoose.connect(DB)
            .then(() => console.log('Connected!'));
        if (require.main === module) {
            app.listen(PORT, () => console.log(`Express run on the http://localhost:${PORT}; press Ctrl+C for finishing`));
        } else {
            module.exports = app;
        }
    } catch (e) {
        console.log(e);
    }
}

start();
