const mongoose = require('mongoose');
const { User, Group, Expense, Settlement } = require('../model/schema'); // assuming the schema is in a file called models.js
const { expect } = require('chai');

describe('User Schema', () => {
  it('should have a required firstName field', () => {
    const user = new User();
    expect(user.validateSync().errors.firstName).to.exist;
  });

  it('should have a required emailId field', () => {
    const user = new User();
    expect(user.validateSync().errors.emailId).to.exist;
  });

  it('should have a required password field', () => {
    const user = new User();
    expect(user.validateSync().errors.password).to.exist;
  });
});

describe('Group Schema', () => {
  it('should have a required groupName field', () => {
    const group = new Group();
    expect(group.validateSync().errors.groupName).to.exist;
  });

  it('should have a required groupOwner field', () => {
    const group = new Group();
    expect(group.validateSync().errors.groupOwner).to.exist;
  });

  it('should have a required groupMembers field', () => {
    const group = new Group();
    expect(group.validateSync().errors.groupMembers).to.exist;
  });
});

describe('Expense Schema', () => {
  it('should have a required groupId field', () => {
    const expense = new Expense();
    expect(expense.validateSync().errors.groupId).to.exist;
  });

  it('should have a required expenseName field', () => {
    const expense = new Expense();
    expect(expense.validateSync().errors.expenseName).to.exist;
  });

  it('should have a required expenseAmount field', () => {
    const expense = new Expense();
    expect(expense.validateSync().errors.expenseAmount).to.exist;
  });
});

describe('Settlement Schema', () => {
  it('should have a required groupId field', () => {
    const settlement = new Settlement();
    expect(settlement.validateSync().errors.groupId).to.exist;
  });

  it('should have a required settleTo field', () => {
    const settlement = new Settlement();
    expect(settlement.validateSync().errors.settleTo).to.exist;
  });

  it('should have a required settleFrom field', () => {
    const settlement = new Settlement();
    expect(settlement.validateSync().errors.settleFrom).to.exist;
  });
});