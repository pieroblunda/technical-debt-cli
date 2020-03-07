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
  /*
  console.log('\n→ Technical debt trace');
  console.log('======================');
  */

  // Generate Glob pattern string to search in
  let globPattern = [];
  let filesExtensionsPattern;
  if(options.extensions.length === 1){
    filesExtensionsPattern = `**/*.${options.extensions.join(',')}`;
  }else{
    filesExtensionsPattern = `**/*.{${options.extensions.join(',')}}`;
  }
  globPattern.push(filesExtensionsPattern);
  globPattern.push('.technicaldebt');

  // Trace Todo
  return glob(globPattern, {
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
          // TODO: Improve the current RegularExpression in order to ovoid manipulate the text result
          // Text
          let todoText = item.replace(TodoRegEx, '$1$2');

          // Remove close comment
          todoText = todoText.replace(' -->', '').replace('-->', '');

          // Resolve
          resolve(todoText);
        }));
      }); // matches.forEach

    }); // files.forEach
    return Promise.all(bagPromises);
  }); // Glog
} // fn traceToDo
