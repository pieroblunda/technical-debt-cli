const fs = require('fs');
const glob = require('glob-gitignore').glob;
const ignore = require('ignore');
const chalk = require('chalk');
const gitignoreRules = ignore().add(fs.readFileSync('.gitignore').toString());
const extensions = ['md', 'js', 'css', 'php', 'pug', 'cs', 'html', 'cshtml', 'py', 'sh', 'scss', 'styl', 'less']

function traceToDo(userCustomIgnore){
  // Glob options
  let options = {
    ignore: gitignoreRules.add(userCustomIgnore)
  };

  // Extensions to search on
  const TodoRegEx = /TODO:\s+([\d]+)?([\d\D]*?)$/gm;
  let todoList = {
    high: [],
    medium: [],
    low: [],
    default: []
  };

  console.log('\n→ Technical debt trace');
  console.log('======================');
  glob([`**/*.{${extensions.join(',')}}`, '.technicaldebt'], {
    ignore: options.ignore,
  }).then( files => {
    files.forEach((file) => {
      // Read file in asynchronously (non-blocking)
      let matches = fs.readFileSync(file, 'utf8').match(TodoRegEx);
      if(matches){
        matches.forEach((item, i) => {
          let msgText = item.replace(TodoRegEx, '-$2');
          let priority = parseInt(item.replace(TodoRegEx, '$1'));
          switch (priority) {
            case 1: todoList.high.push(msgText); break;
            case 2: todoList.medium.push(msgText); break;
            case 3: todoList.low.push(msgText); break;
            default: todoList.default.push(msgText); break;
          }
        }); // matches.forEach
      } // if (matchess)
    }); // files.forEach

    // Print the ordered result 
    todoList.high.forEach((item, i) => console.log(chalk.red(item)));
    todoList.medium.forEach((item, i) => console.log(chalk.yellow(item)));
    todoList.low.forEach((item, i) => console.log(chalk.cyan(item)));
    todoList.default.forEach((item, i) => console.log(item));
    console.log(`Total: ${todoList.high.length + todoList.medium.length + todoList.low.length + todoList.default.length}`);
  }); // glob.then
} // fn traceToDo

traceToDo();
