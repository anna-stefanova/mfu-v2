const express = require('express');
const { engine } = require('express-handlebars');
const path = require("node:path");
const fs = require('node:fs');
const router = require('./routes');

let electronApp;
try {
    const electron = require('electron');
    electronApp = electron.app || (electron.remote && electron.remote.app);
} catch (e) {
    electronApp = null;
}

const userDataPath = electronApp
    ? electronApp.getPath('userData')
    : path.resolve(__dirname);

const uploadsDir = path.join(userDataPath, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// convert form data to JS Object in POST, PUT, PATCH requests
app.use(express.json());
// converts form data to JS Object in POST, PUT, PATCH requests
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(uploadsDir));

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
