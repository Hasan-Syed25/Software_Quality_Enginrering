const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { generateAccessToken, validateToken, validateUser } = require('../helper/apiAuthentication');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication Middleware', () => {
    describe('generateAccessToken', () => {
        it('should generate a valid JWT token', () => {
            const user = { id: 123, username: 'testuser' };
            const token = generateAccessToken(user);
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            expect(decoded.id).to.equal(user.id);
            expect(decoded.username).to.equal(user.username);
        });
    });

    describe('validateToken', () => {
        it('should bypass authentication when DISABLE_API_AUTH is true', (done) => {
            process.env.DISABLE_API_AUTH = 'true';
            const req = {};
            const res = {};
            const next = sinon.spy();
            validateToken(req, res, next);
            expect(next.calledOnce).to.be.true;
            done();
        });

        it('should return 403 if no token is present in headers', (done) => {
            const req = { headers: {} };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.spy();
            validateToken(req, res, next);
            expect(res.status.calledWith(403)).to.be.true;
            expect(res.json.calledWith({ message: 'Token not present' })).to.be.true;
            done();
        });

        // Add more test cases for validateToken based on different scenarios
    });

    describe('validateUser', () => {
        it('should validate user successfully', () => {
            process.env.DISABLE_API_AUTH = 'false';
            const user = 'testuser';
            const emailId = 'testuser';
            const result = validateUser(user, emailId);
            expect(result).to.be.true;
        });

        // Add more test cases for validateUser based on different scenarios
    });
});
