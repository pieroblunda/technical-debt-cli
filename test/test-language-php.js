const assert = require('assert');
const Debt = require('../index');

describe('Language PHP', function() {
  it('asd', function(done) {
    Debt.traceToDo().then( res => {
      console.log(res);
      done();
    });
  });
});
