import fs from 'fs';
import ignore from 'ignore';
import globPackage  from 'glob-gitignore';

const glob = globPackage.glob;

class TodoCli {
  
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
    
    const TodoRegEx = /(?:<%|<#|<!--|\/\*|\/\/|#|'|--|%|=begin|\{\-|\(\*|@\*)\s?@?todo:\s?(.*?)(?:%>|#>|\-\->|\*\/|\n|=end|\-\}|\*\)|\*@)/gmi;

    // Define local variables
    let issues = [];

    // Trace Todo
    return glob(options.target, {
      ignore: options.ignore,
    }).then( files => {
      
      // Iterate over each file
      this.files = files;
      files.forEach( file => {
        // Read the file
        let fileContent = fs.readFileSync(file, 'utf8');
        let matches;
        while(matches = TodoRegEx.exec(fileContent)) {
          issues.push(matches[1]);
        }
      }); // files.forEach
      
      return issues;
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

export default TodoCli;
