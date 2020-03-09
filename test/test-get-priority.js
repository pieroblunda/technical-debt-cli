import assert from 'assert';
import Debt from '../index.js';

describe(`Debt.getPriority method`, () => {

  it('Should return priority 0', done => {
    let result = Debt.getPriority('Lorem ipsum dolor sit amet');
    assert.equal(result, 0);
    done();
  });

  it('Should return priority 1', done => {
    let result = Debt.getPriority('1 Lorem ipsum dolor sit amet');
    assert.ok(result, 1);
    done();
  });

  it('Should return priority 2', done => {
    let result = Debt.getPriority('2 Lorem ipsum dolor sit amet');
    assert.ok(result, 2);
    done();
  });

  it('Should return priority 3', done => {
    let result = Debt.getPriority('3 Lorem ipsum dolor sit amet');
    assert.ok(result, 3);
    done();
  });

});
