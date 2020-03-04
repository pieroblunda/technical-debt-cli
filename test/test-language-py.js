const assert = require('assert');
const Debt = require('../index');

const config = {
  extensions: ['py'],
  ignore: '.technicaldebt'
};

describe('Language Python', () => {

  let result;
  before( done => {
    Debt.traceToDo(config).then( value => {
      result = value
      done();
    });
  });

  it('Should be find 4 results', done => {
    assert.strictEqual(result.length, 4);
    done();
  });

  it('Should be return 1 unclasiffied priority todo', done => {
    let priority = result[0].charAt(0);
    assert.doesNotMatch(priority, /\d/);
    done();
  });

  it('Should be return 1 high priority todo', done => {
    let priority = parseInt(result[1].charAt(0));
    assert.strictEqual(priority, 1);
    done();
  });

  it('Should be return 1 medium priority todo', done => {
    let priority = parseInt(result[2].charAt(0));
    assert.strictEqual(priority, 2);
    done();
  });

  it('Should be return 1 low priority todo', done => {
    let priority = parseInt(result[3].charAt(0));
    assert.strictEqual(priority, 3);
    done();
  });

  it('Should be return the exactly text', done => {
    assert.strictEqual(result[3], '3 Python This is a low priority task');
    done();
  });

});
