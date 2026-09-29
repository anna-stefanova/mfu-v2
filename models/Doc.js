const Database = require('better-sqlite3');
const path = require('path');
const fs =require('fs');

// Создаем папку для базы данных, если ее нет
const dataDir = path.resolve(__dirname, '..', './data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Путь к файлу локальной БД SQLite
const dbPath = path.join(dataDir, 'app_data.db');
const db = new Database(dbPath);

// Инициализация таблицы при старте
db.exec(`
    CREATE TABLE IF NOT EXISTS docs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        title TEXT NOT NULL,
        created_at DATATIME DEFAULT CURRENT_TIMESTAMP
    )
`);

class Doc {
    // Получение всех документов (аналог Doc.find().lean())
    static find() {
        return {
            lean: () => {
                const stmt = db.prepare('SELECT id AS _id, path, title FROM docs ORDER BY id DESC');
                return stmt.all();
            }
        }
    }

    // Добавление нового элемента (аналог doc.save())
    constructor({ path, title }) {
        this.path = path;
        this.title = title;
    }

    save() {
        const stmt = db.prepare('INSERT INTO docs (path, title) VALUES (?, ?)');
        const info = stmt.run(this.path, this.title);
        this._id = info.lastInsertRowid; // Присваиваем ID сгенерированный SQLite
        return this;
    }

    // Удаление файла (аналог Doc.findOneAndDelete)
    static findOneAndDelete({ _id }) {
        const selectStmt = db.prepare('SELECT id AS _id, path, title FROM docs WHERE id = ?');
        const doc = selectStmt.get(_id);

        if (doc) {
            const deleteStmt = db.prepare('DELETE FROM docs WHERE id = ?');
            deleteStmt.run(_id);
        }

        return doc;
    }
}

module.exports = Doc;