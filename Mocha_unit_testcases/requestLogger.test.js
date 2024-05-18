const { assert } = require('chai');
const sinon = require('sinon');

const logger = require('../helper/logger');
const requestLogger = require('../helper/requestLogger');

describe('Request Logger Middleware', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should log request information', () => {
        const req = {
            method: 'GET',
            url: '/test'
        };
        const res = {};
        const next = sinon.spy();

        sandbox.stub(logger, 'info').callsFake((message) => {
            assert.include(message, 'API HIT : [GET] /test');
        });

        requestLogger(req, res, next);

        assert(next.calledOnce);
        assert(next.calledWithExactly());
    });

    it('should call next with error if logging fails', () => {
        const req = {
            method: 'GET',
            url: '/test'
        };
        const res = {};
        const next = sinon.spy();

        sandbox.stub(logger, 'info').throws(new Error('Log Error'));

        requestLogger(req, res, next);

        assert(next.calledOnce);
        assert(next.calledWithExactly(sinon.match.instanceOf(Error)));
    });
});
