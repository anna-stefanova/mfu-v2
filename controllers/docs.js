const {exec, execFile} = require("child_process");
const Doc = require('../models/Doc');
const {resolve} = require("path");

const getDocsData = () => Promise.resolve(Doc.find().lean());
const docsMiddleware = async (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.docsContext = await getDocsData();
    next()
}

const getPrintHandler = async (req, res) => {
    const data = await Doc.find().lean();

    res.render('docs', {
        title: 'Печать документов',
        pageClass: 'print',
        message: '',
        docs: data
    });
}

const api = {
    postDownloadFileHandler: async (req, res) => {
        const doc = new Doc({
            path: req.file.path,
            title: req.body.filename
        });
        await doc.save();
        const docs = await Doc.find().lean();
        console.log(docs);
        res.send({result: 'success', docs});
    }
};

const postOpenExeHandler = async (req, res) => {
    execFile('C:\\Program Files (x86)\\Brother\\BrLauncher\\BrLauncher.exe', (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout:\n${stdout}`);
    });
}

const postOpenOskHandler = async (req, res) => {
    exec("osk", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

const postOpenFileHandler = async (req, res, next) => {
    exec(getCommandLine() + ' ' + resolve(req.body.fileName));
    function getCommandLine() {
        switch (process.platform) {
            case 'darwin' : return 'open';
            case 'win32' : return 'start';
            case 'win64' : return 'start';
            default : return 'xdg-open';
        }
    }
};


module.exports = {
    getPrintHandler,
    docsMiddleware,
    api,
    postOpenExeHandler,
    postOpenOskHandler,
    postOpenFileHandler
}