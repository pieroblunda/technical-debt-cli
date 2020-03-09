import assert from 'assert';
import Debt from '../index.js';
//const defaultExtensions = ['md','js','css','php','pug','cs','html','cshtml','py','sh','scss','styl','less'];

describe(`Debt.makeGlobPattern method`, () => {

  const options = {};

  it('Should return an array', done => {
    let extensions = ['js'];
    let result = Debt.makeGlobPattern(extensions);
    assert.ok(Array.isArray(result), true);
    done();
  });

  it('Should return an specific array', done => {
    let extensions = ['js'];
    let expected = ['**/*.js', '**/*.technicaldebt'];
    let result = Debt.makeGlobPattern(extensions);
    assert.deepEqual(result, expected);
    done();
  });

  it('Should return an specific array 2', done => {
    let extensions = ['js', 'css', 'php'];
    let expected = ['**/*.js', '**/*.css', '**/*.php', '**/*.technicaldebt'];
    let result = Debt.makeGlobPattern(extensions);
    assert.deepEqual(result, expected);
    done();
  });

});
