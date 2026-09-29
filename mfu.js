const express = require('express');
const { engine } = require('express-handlebars');
const path = require("node:path");
const fs = require('node:fs');
const router = require('./routes');

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

function startServer(port = 3010) {
    return new Promise((resolve, reject) => {
        try {
            const server = app.listen(port, () => {
                console.log(`Express runs locally on http://localhost:${port}`);
                resolve(server)
            })
        } catch (error) {
            console.error("Failed to start Express server", error);
            reject(error);
        }
    });
}

// Позволяет запускать файл напрямую без Electron, если нужно (node mfu.js)
if (require.main === module) {
    const PORT = process.env.PORT || 3010;
    startServer(PORT);
}

module.exports = { app, startServer };
