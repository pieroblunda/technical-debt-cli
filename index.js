var fs = require('fs');
let glob = require('glob-gitignore').glob;
const ignore = require('ignore');
const chalk = require('chalk');

// Read the .gitignore file
const gitignoreRules = ignore().add(fs.readFileSync('.gitignore').toString());

function traceToDo(userCustomIgnore){
  // Glob options
  let options = {
    ignore: gitignoreRules.add(userCustomIgnore),
    extensions: ['md', 'js', 'css', 'php', 'pug', 'cs', 'html', 'cshtml', 'py', 'sh', 'scss']
  };

  // Extensions to search on
  let ToDoRegEx = /TODO:\s+([\d]+)?([\d\D]*?)$/gm;
  let total = 0;

  console.log('\n→ Technical debt trace');
  console.log('======================');
  glob([`**/*.{${options.extensions.join(',')}}`, '.technicaldebt'], {
    ignore: options.ignore,
  }).then( files => {
    files.forEach((file, i) => {
      // Read file in asynchronously (non-blocking)
      let matches = fs.readFileSync(file, 'utf8').match(ToDoRegEx);
      if(matches){
        matches.forEach((item, i) => {
          total++;
          let msgText = item.replace(ToDoRegEx, '$1$2');
          let priority = parseInt(item.replace(ToDoRegEx, '$1'));
          switch (priority) {
            case 1:
              console.log(chalk.red(msgText));
              break;
            case 2:
              console.log(chalk.yellow(msgText));
              break;
            case 3:
              console.log(chalk.green(msgText));
              break;
            default:
              console.log(msgText);
              break;
          }
        }); // matches.forEach
      } // if (matchess)
    }); // files.forEach
    console.log(`Total: ${total}`);
  }); // glob.then
} // fn traceToDo

//traceToDo(['*.md']);
traceToDo();
