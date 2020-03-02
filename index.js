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
  let total = 0;

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
          total++;
          let msgText = item.replace(TodoRegEx, '-$2');
          let priority = parseInt(item.replace(TodoRegEx, '$1'));
          switch (priority) {
            case 1: console.log(chalk.red(msgText)); break;
            case 2: console.log(chalk.yellow(msgText)); break;
            case 3: console.log(chalk.green(msgText)); break;
            default: console.log(msgText); break;
          }
        }); // matches.forEach
      } // if (matchess)
    }); // files.forEach
    console.log(`Total: ${total}`);
  }); // glob.then
} // fn traceToDo

traceToDo();
