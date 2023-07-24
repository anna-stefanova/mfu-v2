const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../mfu');

let server = null;
let port = null;

beforeEach(async () => {
    port = await portfinder.getPortPromise();
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

test('Home Page links to the Manual Page', async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`);
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="manual"]'),
    ]);
    expect(page.url()).toBe(`http://localhost:${port}/manual`);
    await browser.close();
})