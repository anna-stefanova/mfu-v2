const home = require('../../controllers/home');

test('home page renders', () => {
    const req = {};
    const res = { render: jest.fn() };
    home.getHomeHandler(req, res);
    expect(res.render.mock.calls[0][0]).toBe('home');
})
