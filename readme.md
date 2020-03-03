# Technical debit cli

Print your ToDo list in the terminal in order to manage them better according to Agile. `Technical debit cli` looks for (_language-todo_)[https://atom.io/packages/language-todo] comments in your code and prints them.

**Why?** Read (this article)[pieroblunda.io/todo-rule] to get more information.

## Support languages
`Python` `C#` `CSS` `HTML` `Js` `Md` `PHP` `Pug` `Bash` `SCSS` `Stylus` `less`

## How to use

From the command line
```bash
$ node index.js
```

Import as JavasScript module
```js
// TODO: not implemented yet
$ import { debit } from 'technical-debt-tracer'

// In your node-js server file
debit.run();
```

As npm script
```json
// TODO: not implemented yet
...
"scripts": {
  "debt": "node debt"
}
...
```

## Options

|Options|Typo|Example|
|-|||
|traceToDo(_ArrayOfStringGlob_)|Array of string glob pattern|['*.md']|

## test

```bash
$ npm test
```

## How to collaborate

We use use `GitHub Flow` as branching model. Make your `PR` in ordert to review it. Your PR will be merged after a fast review!
