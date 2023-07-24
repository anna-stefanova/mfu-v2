const handlers = require('../../controllers/handlers');

test('404 error handler rendering', () => {
    const req = {};
    const res = {render: jest.fn(), status: jest.fn().mockReturnThis(),};
    handlers.notFound(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 error handler rendering', () => {
    const err = new Error('some error');
    const req = {};
    const res = { render: jest.fn(), status: jest.fn().mockReturnThis(), };
    const next = jest.fn();
    handlers.serverError(err, req, res, next);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('500');
});
