const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("node:path");
const { startServer } = require('./mfu');

let mainWindow;

app.whenReady().then(async () => {
    const PORT = process.env.PORT || 3010;

    // Запускаем локальный Express сервер
    try {
        await startServer(PORT);
    } catch (error) {
        console.error('Ошибка запуска Express сервера: ', error);
    }

    // Создаем окно приложения
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 1920,
        title: 'MFU App',
        fullscreen: true,       // Полноэкранный режим
        frame: false,            // Без стандартной рамки и кнопок закрытия
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true
        }
    });

    // Загружаем стартовую страницу
    mainWindow.loadURL(`http://localhost:${PORT}`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    globalShortcut.register('Escape', () => {
        app.quit();
    });
});

// Очищаем регистрацию горячих клавиш при выходе
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// Закрываем приложение, когда закрыты все окна (Windows/Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})