import TodoCli from './index.js';

TodoCli.init({
  target: ['fixtures/*.*'], // -> /{static,build/public}/*.{js}'
  ignore: ['readme.md', 'index.js', 'node_modules'],
  verbose: false
});