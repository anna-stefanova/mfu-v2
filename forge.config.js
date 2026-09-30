module.exports = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {
        onlyModules: [],
    },
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'mfu_app',
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['win32', 'darwin'],
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
    ],
};