const Database = require('better-sqlite3');
const path = require('node:path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'app_data.db'));

// Создаем таблицу слайдов с дефолтными значениями, если база пустая
db.exec(`
    CREATE TABLE IF NOT EXISTS slides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        img_path TEXT NOT NULL,
        title TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

class Slide {
    static find() {
        return {
            lean: () => {
                const stmt = db.prepare('SELECT id AS _id, img_path, title FROM slides ORDER BY id DESC');
                return stmt.all();
            }
        }
    }

    constructor({ img_path, title}) {
        this.img_path = img_path;
        this.title = title;
    }

    save() {
        const stmt = db.prepare('INSERT INTO slides (img_path, title) VALUES (?, ?)');
        const info = stmt.run(this.img_path, this.title);
        this._id = info.lastInsertRowid;
        return this;
    }

    static findOneAndDelete({_id}) {
        const selectStmt = db.prepare('SELECT id AS _id, img_path, title FROM slides WHERE id = ?');
        const slide = selectStmt.get(_id);
        if (slide) {
            db.prepare('DELETE FROM slides WHERE id = ?').run(_id);
        }
        return slide;
    }
}

module.exports = Slide;