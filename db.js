const Database = require('better-sqlite3');
const path = require('node:path');
const fs = require('node:fs');
const { app } = require('electron');

// Если запуск идет из Electron — берем безопасный путь AppData,
// иначе (при локальной разработке в WebStorm) берем относительный путь
const userDataPath = app
    ? app.getPath('userData')
    : path.resolve(__dirname);

const dataDir = path.join(userDataPath, 'data');

// Автоматически создаем папку, если ее нет
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'app_data.db');

// Инициализация единого подключения к БД
const db = new Database(dbPath);

// Включаем режимы оптимизации SQLite
db.pragma('journal_mode = WAL');

module.exports = db;