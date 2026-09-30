const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {getHomeHandler, api} = require('../controllers/home');

let electronApp;
try {
    const electron = require('electron');
    electronApp = electron.app || (electron.remote && electron.remote.app);
} catch (e) {
    electronApp = null;
}

const userDataPath = electronApp
    ? electronApp.getPath('userData')
    : path.resolve(__dirname, '..');

const slidesDir = path.join(userDataPath, 'uploads', 'slides');

// Конфигурация сохранения слайдов в public/uploads/slides
const slideStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(slidesDir)) {
            fs.mkdirSync(slidesDir, { recursive: true });
        }
        cb(null, slidesDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, 'slide_' + Date.now() + ext);
    }
});

const uploadSlide = multer({storage: slideStorage});

const router = express.Router();

router.get('/', getHomeHandler);
router.post('/api/slides', uploadSlide.single('slideImg'), api.addSlide);
router.delete('/api/slides/:id', api.deleteSlide);

module.exports = router;