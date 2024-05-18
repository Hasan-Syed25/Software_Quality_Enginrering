const { createLogger, transports } = require('winston');
const { assert } = require('chai');
const sinon = require('sinon');

const logger = require('../helper/logger');

describe('Logger', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should log messages to info.log file', () => {
        const logMessage = 'This is an info log message';
        sandbox.stub(transports.File.prototype, 'log').callsFake((info, callback) => {
            assert.equal(info.level, 'info');
            assert.include(info.message, logMessage);
            callback(null, true);
        });

        logger.info(logMessage);
    });

    it('should log error messages to error.log file', () => {
        const errorMessage = 'This is an error log message';
        sandbox.stub(transports.File.prototype, 'log').callsFake((info, callback) => {
            assert.equal(info.level, 'error');
            assert.include(info.message, errorMessage);
            callback(null, true);
        });

        logger.error(errorMessage);
    });
});
