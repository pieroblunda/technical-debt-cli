import fs from 'fs';
import ignore from 'ignore';
import chalk from 'chalk';
import globPackage  from 'glob-gitignore';

const glob = globPackage.glob;
const gitignoreRules = ignore().add(fs.readFileSync('.gitignore').toString());
const defaultExtensions = ['md','js','css','php','pug','cs','html','cshtml','py','sh','scss','styl','less'];

//Debt.run();
class Debt {
  constructor() {
    // Code
  }

  static printHeader(){
    console.log('\n→ Technical debt cli');
    console.log('====================');
  }

  static printFooter(arr){
    console.log('--------------------');
    console.log(`Total: ${arr.length}`);
  }

  static validateOptions(userOptions){
    // TODO: if options.extension is an string it fails > options.extensions.join is not a function
    if (!userOptions) userOptions = {};
    return {
      extensions: userOptions.extensions || defaultExtensions,
      ignore: gitignoreRules.add(userOptions.ignore)
    };
  }

  static makeGlobPattern(options){
    let filesExtensionsPattern;
    if(options.extensions.length === 1){
      filesExtensionsPattern = `**/*.${options.extensions.join(',')}`;
    }else{
      filesExtensionsPattern = `**/*.{${options.extensions.join(',')}}`;
    }
    return [filesExtensionsPattern, '.technicaldebt'];
  }

  static globSearch(userOptions) {
    // Validate options
    let options = this.validateOptions(userOptions);

    // Extensions to search on
    const TodoRegEx = /TODO:\s+([\d]+)?([\d\D]*?)$/gm;

    // Define local variables
    let bagPromises = [];

    // Print Header
    this.printHeader();

    // Generate Glob pattern string to search in
    this.makeGlobPattern(options);

    // Trace Todo
    let globPattern = this.makeGlobPattern(options);
    glob(globPattern, {
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
            todoText = todoText.replace(' -->', '').replace('-->', ''); // HTML
            todoText = todoText.replace(' */', '').replace('*/', ''); // CSS
            todoText = todoText.replace(' *@', '').replace('*@', ''); // CHTML

            todoText = todoText.trim();

            // Resolve
            resolve(todoText);
          }));
        }); // matches.forEach

      }); // files.forEach
      return Promise.all(bagPromises);
    }).then( res => {
      this.logResults(this.sortByPriority(res));
      this.printFooter(res);
    });
  } // fn traceToDo

  static sortByPriority(arr) {
    arr.sort( (a,b) => {
      return this.getPriority(b)-this.getPriority(a);
    });
    return arr;
  }

  static getPriority(item) {
    let priority = parseInt(item.charAt(0));
    if (!Number.isInteger(priority)){
      priority = 0;
    }
    return priority;
  }

  static logResults(arrResults){
    arrResults.forEach((item, i) => {
      switch (this.getPriority(item)) {
        case 1: console.log(item); break;
        case 2: console.log(item); break;
        case 3: console.log(item); break;
        default: console.log(`0 ${item}`); break;
      }
    });

  }

  static init(userOptions){
    this.globSearch(userOptions);
  }
};

// Make runnuble
if(process.argv[2] === 'init'){
  Debt.init();
}

export default Debt;
