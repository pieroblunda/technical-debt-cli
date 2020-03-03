const fs = require('fs');
const glob = require('glob-gitignore').glob;
const ignore = require('ignore');
const chalk = require('chalk');
const gitignoreRules = ignore().add(fs.readFileSync('.gitignore').toString());
const defaultExtensions = ['md','js','css','php','pug','cs','html','cshtml','py','sh','scss','styl','less'];

module.exports.traceToDo = (userOptions) => {
  // Validate options
  if (!userOptions) userOptions = {};
  let options = {
    extensions: userOptions.extensions || defaultExtensions,
    ignore: gitignoreRules.add(userOptions.ignore)
  };

  // Extensions to search on
  const TodoRegEx = /TODO:\s+([\d]+)?([\d\D]*?)$/gm;

  // Define local variables
  let bagPromises = [];

  // Print Header
  console.log('\n→ Technical debt trace');
  console.log('======================');

  // Trace Todo
  return glob([`**/*.{md,js,css,php,pug,cs,html,cshtml,py,sh,scss,styl,less}`, '.technicaldebt'], {
    ignore: options.ignore,
  }).then( files => {

    // Iterate over each file
    files.forEach( file => {

      // Read the file
      let matches = fs.readFileSync(file, 'utf8').match(TodoRegEx);
      if (!matches) return false;

      // Iterate over each match in the same file
      matches.forEach( (item, i) => {
        bagPromises.push(new Promise( resolve => {
          resolve(item.replace(TodoRegEx, '$1$2'));
        }));
      }); // matches.forEach

    }); // files.forEach
    return Promise.all(bagPromises);
  }); // Glog
} // fn traceToDo
