const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const model = require('../model/schema');
const validator = require('../helper/validation');
const logger = require('../helper/logger');

describe('Validation Tests', function() {
    let sandbox;

    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('notNull function', function() {
        it('should return true for non-null value', function() {
            const value = 'test';
            const result = validator.notNull(value);
            expect(result).to.be.true;
        });

        it('should throw error for null value', function() {
            const value = null;
            expect(() => validator.notNull(value)).to.throw('Please input the required field');
        });

        it('should throw error for undefined value', function() {
            const value = undefined;
            expect(() => validator.notNull(value)).to.throw('Please input the required field');
        });
    });

    describe('emailValidation function', function() {
        it('should return true for valid email', function() {
            const email = 'test@example.com';
            const result = validator.emailValidation(email);
            expect(result).to.be.true;
        });

        it('should throw error for invalid email', function() {
            const email = 'invalidemail';
            expect(() => validator.emailValidation(email)).to.throw('Email validation fail!!');
        });

        it('should throw error for missing @ symbol', function() {
            const email = 'test.example.com';
            expect(() => validator.emailValidation(email)).to.throw('Email validation fail!!');
        });

        it('should throw error for missing .com domain', function() {
            const email = 'test@example';
            expect(() => validator.emailValidation(email)).to.throw('Email validation fail!!');
        });
    });

    describe('passwordValidation function', function() {
        it('should return true for valid password', function() {
            const password = 'Password123!';
            const result = validator.passwordValidation(password);
            expect(result).to.be.true;
        });

        it('should throw error for invalid password', function() {
            const password = 'weak';
            expect(() => validator.passwordValidation(password)).to.throw('Password validation fail!!');
        });

        it('should throw error for short password', function() {
            const password = 'short';
            expect(() => validator.passwordValidation(password)).to.throw('Password validation fail!!');
        });
    });

    describe('currencyValidation function', function() {
        it('should return true for valid currency', function() {
            const currency = 'USD';
            const result = validator.currencyValidation(currency);
            expect(result).to.be.true;
        });

        it('should throw error for invalid currency', function() {
            const currency = 'XYZ';
            expect(() => validator.currencyValidation(currency)).to.throw('Currency validation fail!!');
        });
    });

    describe('userValidation function', function() {
        it('should return true for existing user', async function() {
            const email = 'test@example.com';
            const findOneStub = sandbox.stub(model.User, 'findOne').resolves({ emailId: email });

            const result = await validator.userValidation(email);
            expect(result).to.be.true;
            expect(findOneStub).to.have.been.calledWith({ emailId: email });
        });

        it('should return false for non-existing user', async function() {
            const email = 'test@example.com';
            const findOneStub = sandbox.stub(model.User, 'findOne').resolves(null);

            const result = await validator.userValidation(email);
            expect(result).to.be.false;
            expect(findOneStub).to.have.been.calledWith({ emailId: email });
        });
    });

    describe('groupUserValidation function', function() {
        it('should return true for valid group member', async function() {
            const email = 'test@example.com';
            const groupId = 'groupId123';
            const findOneStub = sandbox.stub(model.Group, 'findOne').resolves({ groupMembers: [email] });

            const result = await validator.groupUserValidation(email, groupId);
            expect(result).to.be.true;
            expect(findOneStub).to.have.been.calledWith({ _id: groupId }, { groupMembers: 1, _id: 0 });
        });

        it('should return false for invalid group member', async function() {
            const email = 'test@example.com';
            const groupId = 'groupId123';
            const findOneStub = sandbox.stub(model.Group, 'findOne').resolves({ groupMembers: ['another@email.com'] });

            const result = await validator.groupUserValidation(email, groupId);
            expect(result).to.be.false;
            expect(findOneStub).to.have.been.calledWith({ _id: groupId }, { groupMembers: 1, _id: 0 });
        });

        it('should log a warning for group user validation failure', async function() {
            const email = 'test@example.com';
            const groupId = 'groupId123';
            const findOneStub = sandbox.stub(model.Group, 'findOne').resolves({ groupMembers: ['another@email.com'] });
            const loggerWarnStub = sandbox.stub(logger, 'warn');

            const result = await validator.groupUserValidation(email, groupId);
            expect(result).to.be.false;
            expect(findOneStub).to.have.been.calledWith({ _id: groupId }, { groupMembers: 1, _id: 0 });
            expect(loggerWarnStub).to.have.been.calledWith(`Group User Valdation fail : Group ID : [${groupId}] | user : [${email}]`);
        });
    });
});