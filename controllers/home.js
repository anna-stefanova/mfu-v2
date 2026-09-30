const Slide = require('../models/Slide');
const fs = require('fs');
const path = require('node:path');

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

const getHomeHandler = (req, res) => {
    let slides = Slide.find().lean();

    if (slides.length === 0) {
        slides = [
            { _id: 1, img_path: 'images/img_4097.png', title: 'Инновационная интерактивная витрина представлена на форуме «E-commerce» в Москве' },
            { _id: 2, img_path: 'images/img_0339.png', title: 'Компания NexTouch возглавила рейтинг производителей интерактивных панелей' },
            { _id: 3, img_path: 'images/img_2021.png', title: 'Руководитель NexTouch принял участие в заседании Набсовета ФСИ под председательством министра экономического развития Максима Решетникова' },
            { _id: 4, img_path: 'images/img_2348.png', title: 'NexTouch представила новую линейку продукции NextPanel 85, NextWall Multitouch и NexTaizer' },
        ];
    }

    res.render('home', {
        title: 'Home',
        slides
    });
};

const api = {
    addSlide: (req, res) => {
        try {
            if (!req.file) return res.status(400).send({ result: 'error', message: 'Файл не загружен' });

            if (!req.body.title || !req.body.title.trim()) {
                return res.status(400).json({ result: 'error', message: 'Заголовок слайда обязателен' });
            }

            // Относительный URL для тега <img src="uploads/slides/slide_xxx.png">
            const relativePath = 'uploads/slides/' + req.file.filename;

            const slide = new Slide({
                img_path: relativePath,
                title: req.body.title.trim()
            });
            slide.save();

            res.send({ result: 'success', slide });

        } catch (error) {
            res.status(500).json({ result: 'error', message: error.message });
        }
    },
    deleteSlide: (req, res) => {
        try {
            const slide = Slide.findOneAndDelete({ _id: req.params.id });
            if (slide) {
                // Если картинка загружена пользователем, удаляем её из AppData
                if (slide.img_path.startsWith('uploads/')) {
                    const fullPath = path.join(userDataPath, slide.img_path);
                    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
                }
                return res.json({ result: 'success', id: req.params.id });
            } else {
                res.status(404).json({ result: 'error', message: 'Слайд не найден' });
            }
        } catch (error) {
            console.error('Ошибка удаления слайда:', error);
            res.status(500).json({ result: 'error', message: error.message });
        }
    }
};

module.exports = { getHomeHandler, api };