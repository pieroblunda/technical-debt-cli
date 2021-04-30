import fs from 'fs';
import ignore from 'ignore';
import globPackage  from 'glob-gitignore';

const glob = globPackage.glob;

//Debt.run();
class Todo {
  constructor() {
    // Code
  }

  static printHeader(){
    console.log('\n→ Todo cli');
    console.log('====================');
  }

  static printFooter(arr){
    console.log('--------------------');
    console.log(`Total: ${arr.length}`);
  }
  
  static printVerbose(){
    console.log('--------------------');
    console.log(`Target files:`);
    console.log(this.files);
  }

  static validateOptions(userOptions){
    if (!userOptions) userOptions = {};

    let gitignoreRules = ignore();
    if(fs.existsSync('.gitignore')){
      gitignoreRules = gitignoreRules.add(fs.readFileSync('.gitignore').toString());
    }

    return {
      target: userOptions.target,
      ignore: gitignoreRules.add(userOptions.ignore),
      verbose: userOptions.verbose
    };
  }

  static globSearch(options) {
    // Extensions to search on
    const TodoRegEx = /TODO:\s+([\d]+)?([\d\D]*?)$/gm;

    // Define local variables
    let bagPromises = [];

    // Trace Todo
    return glob(options.target, {
      ignore: options.ignore,
    }).then( files => {

      // Iterate over each file
      this.files = files;
      //console.log(files);
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
    });
  } // fn traceToDo

  static sortByPriority(arr) {

    // Validate
    if(!arr || !Array.isArray(arr)) return [];

    // Sort
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
    // Validate options
    this.options = this.validateOptions(userOptions);
    
    // Print Header
    this.printHeader();

    // Core
    this.globSearch(this.options).then( res => {

      // Print result
      this.logResults(this.sortByPriority(res));

      // Print Footer
      this.printFooter(res);
      
      // Print verbose
      if(this.options.verbose){
        this.printVerbose();
      }
    });
  }
};

// Make runnuble
if(process.argv[2] === 'init'){
  Todo.init({
    target: ['fixtures/*.{js,styl}'], // -> /{static,build/public}/*.{js}'
    ignore: ['readme.md', 'index.js', 'node_modules'],
    verbose: false
  });
}

export default Todo;
