const assert = require('assert');
const Debt = require('../index');
const defaultExtensions = ['md','js','css','php','pug','cs','html','cshtml','py','sh','scss','styl','less'];

defaultExtensions.forEach( lang => {

  const config = {
    extensions: [lang],
    ignore: ['.technicaldebt', 'readme.md', 'index.js']
  };

  describe(`Language ${lang}`, () => {

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
      assert.strictEqual(result[3], `3 ${lang} This is a low priority task`);
      done();
    });

  }); // Describe
});
