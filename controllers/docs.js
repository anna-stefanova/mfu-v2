const {exec, execFile} = require("child_process");

const getPrintHandler = (req, res) => {
    res.render('docs', {
        title: 'Печать документов',
        pageClass: 'print',
        message: '',
       /* links: data['files']*/
    });
}

const api = {
    postDownloadFileHandler: (req, res) => {

        console.log(req.file);
        console.log(req.body.filename);
        res.send({result: 'success'});
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
    exec(getCommandLine() + ' ' + path.resolve(req.body.fileName));
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
    api,
    postOpenExeHandler,
    postOpenOskHandler,
    postOpenFileHandler
}