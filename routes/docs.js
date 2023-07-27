const express = require('express');
const multer = require('multer');

const {getPrintHandler, postOpenOskHandler, postOpenFileHandler, postOpenExeHandler, api, docsMiddleware} = require("../controllers/docs");
const {transliterate} = require('../controllers/handlers');

const router = express.Router();

const upload = multer({dest: 'uploads'});
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        file.originalname = transliterate(Buffer.from(file.originalname, 'latin1').toString('utf8').replaceAll(' ', '_'));
        cb(null, file.originalname)
    }
});

router.use(multer({storage: storageConfig}).single('file'));

router.get('/', docsMiddleware, getPrintHandler);
router.post('/api/downloadFile', docsMiddleware, api.postDownloadFileHandler, upload.single('file'));
router.post('/openExe', postOpenExeHandler)
router.post('/openOsk', postOpenOskHandler);
router.post('/openFile', postOpenFileHandler);

module.exports = router;