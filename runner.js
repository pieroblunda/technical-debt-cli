const Debt = require('./index.js');

Debt.traceToDo({
  extensions: ['php', 'js']
}).then( res => {
  console.log(res);
});
