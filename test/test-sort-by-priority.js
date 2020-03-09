import assert from 'assert';
import Debt from '../index.js';
const defaultExtensions = ['md','js','css','php','pug','cs','html','cshtml','py','sh','scss','styl','less'];

let expected = ['3 three', '2 two', '1 one', 'Empty'];

describe(`Debt.sortByPriority method`, () => {

  it('Should return an array in descendent order', done => {
    let result = Debt.sortByPriority(['1 one', '2 two', '3 three', 'Empty']);
    assert.deepEqual(result, expected);
    done();
  });

  it('Should return an array in descendent order', done => {
    let result = Debt.sortByPriority(['Empty', '1 one', '2 two', '3 three']);
    assert.deepEqual(result, expected);
    done();
  });

  it('Should return the same array', done => {
    let result = Debt.sortByPriority(expected);
    assert.deepEqual(result, expected);
    done();
  });

  it('Should return the same array 2', done => {
    let result = Debt.sortByPriority(['1 One']);
    assert.deepEqual(result, ['1 One']);
    done();
  });

  it('Should return the same array 3', done => {
    let result = Debt.sortByPriority(['Empty']);
    assert.deepEqual(result, ['Empty']);
    done();
  });

  it('Should return the empty array', done => {
    let result = Debt.sortByPriority([]);
    assert.deepEqual(result, []);
    done();
  });

  it('Should return the empty array 2', done => {
    let result = Debt.sortByPriority();
    assert.deepEqual(result, []);
    done();
  });

});
