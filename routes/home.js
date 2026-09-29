const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {getHomeHandler, api} = require('../controllers/home');

const router = express.Router();

// Конфигурация сохранения слайдов в public/uploads/slides
const slideStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'public', 'uploads', 'slides');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, 'slide_' + Date.now() + ext);
    }
});

const uploadSlide = multer({storage: slideStorage});

router.get('/', getHomeHandler);
router.post('/api/slides', uploadSlide.single('slideImg'), api.addSlide);
router.delete('/api/slides/:id', api.deleteSlide);

module.exports = router;