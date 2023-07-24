const manual = require('../../controllers/manual');

test('manual page renders', () => {
    const req = {};
    const res = { render: jest.fn() };
    manual.getManualHandler(req, res);
    expect(res.render.mock.calls[0][0]).toBe('manual');
})