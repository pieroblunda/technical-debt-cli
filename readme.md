# Technical debit cli

Print your ToDo list in the terminal in order to manage them better according to Agile. `Technical debit cli` looks for (_language-todo_)[https://atom.io/packages/language-todo] comments in your code and prints them.

**Why?** Read (this article)[pieroblunda.io/todo-rule] to get more information.

## Support languages
`Python` `C#` `CSS` `HTML` `Js` `Markdown` `PHP` `Pug` `Bash` `SCSS` `Stylus` `less`

## Install

```bash
$ npm install technical-debt-cli
```

## How to use

From the command line
```bash
$ node index.js
```

Import as JavasScript module
```javascript
$ import { debit } from 'technical-debt-tracer'

// In your node-js server file
Debt.init(options);
```

As npm script
```json
"scripts": {
  "debt": "npm run ????"
}
```

## Options

`option.extensions`
__Array of strings__ - __(Optional)__ - Each item represents the extension without the dot of the file to search on. The default value is `['md','js','css','php','pug','cs','html','cshtml','py','sh','scss','styl','less']`. For performance reasons you should to define this option.


`ignore`
__ignore instance__ - bypass of glob-gitignore ignore option.

## test

```bash
$ npm test
```

## How to collaborate

We use [GitHub Flow](link) as branching model. Make your `PR` in order to review it. Your PR will be merged after a fast review.

Pro Tip! View the .technicaldebt file to know what contribuite to.
