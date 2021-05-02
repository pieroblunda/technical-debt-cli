import fs from 'fs';
import ignore from 'ignore';
import globPackage  from 'glob-gitignore';
import colors from 'colors';
const glob = globPackage.glob;

class TodoCli {
  
  static get REG_EX(){
    return /(?:<%|<#|<!--|\/\*|\/\/|#|'|--|%|=begin|\{\-|\(\*|@\*)\s?@?todo:\s?(.*?)(?:%>|#>|\-\->|\*\/|\n|=end|\-\}|\*\)|\*@)/gmi;
  }
  
  static printHeader(){
    console.log('\n→ List of your technical debt:');
    console.log('================================');
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

    // By default ignores files listed on .gitignore
    let gitignoreRules = ignore();
    if(fs.existsSync('.gitignore')){
      gitignoreRules = gitignoreRules.add(fs.readFileSync('.gitignore').toString());
    }
    
    return {
      target: userOptions.target,
      ignore: gitignoreRules.add(userOptions.ignore),
      verbose: userOptions.verbose,
      re: userOptions.re || this.REG_EX
    };
  }

  static globSearch(options) {

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
        while(matches = options.re.exec(fileContent)) {
          issues.push(matches[1]);
        }
      }); // files.forEach
      
      return issues;
    });
  } // fn traceToDo

  static getPriority(item) {
    let re = /\[(\d+)\]/;
    let matches = re.exec(item);
    if(matches){
      return parseInt(matches[1]);
    }else{
      return undefined;
    }
  }

  static logResults(arrResults){
    arrResults.forEach((item, i) => {
      switch (this.getPriority(item)) {
        case 1: console.log(item.red); break;
        case 2: console.log(item.yellow); break;
        case 3: console.log(item.gray); break;
        default: console.log(`${item}`); break;
      }
    });

  }

  static init(userOptions){
    // Validate options
    this.options = this.validateOptions(userOptions);
    
    // Core
    this.globSearch(this.options).then( issues => {
      
      // Print Header
      this.printHeader();

      // Print result
      this.logResults(issues.sort());

      // Print Footer
      this.printFooter(issues);
      
      // Print verbose
      if(this.options.verbose){
        this.printVerbose();
      }
    });
  }
};

export default TodoCli;
