# Technical debit cli

Print your ToDo list in the terminal in order to manage them better according to Agile. `todo-cli` looks for [_language-todo_](https://atom.io/packages/language-todo) comments in your code and prints them.

**Why?** Read (this article)[pieroblunda.io/todo-rule] to get more information.

https://github.com/atom/language-todo/blob/master/snippets/todo.cson

## Support languages
Euphoria, Haskell, SQL, Ada, AppleScript, Eiffel, Lua, VHDL, SGML, PureScript, ActionScript, C (C99), C++, C#, D, F#, Go, Java, JavaScript, Kotlin, Object Pascal (Delphi), Objective-C, PHP, Rust, Scala, SASS, Swift, Xojo, Bourne shell and other UNIX shells, Cobra, Perl, Python, Ruby, Seed7, Windows PowerShell, PHP, R, Make, Maple, Elixir, Nim[11], TeX, Prolog, MATLAB,[12] Erlang, S-Lang, Visual Prolog, ActionScript, AutoHotkey, C, C++, C#, D,[15] Go, Java, JavaScript, kotlin, Objective-C, PHP, PL/I, Prolog, Rexx, Rust (can be nested), Scala (can be nested), SAS, SASS, SQL, Swift (can be nested), Visual Prolog, CSS, Razor

```js
re = /(?:<%|<#|<!--|\/\*|\/\/|#|'|--|%|=begin|\{\-|\(\*|\{{2}!|@\*)\s?@?todo:\s?(.*?)(?:%>|#>|\-\->|\*\/|\n|=end|\-\}|\*\)|\{{2}|\*@)/gmi

<!-- TODO: Capture 0 -->
<% TODO: Capture 1 %>
@* TODO: Capture 1 *@
<# TODO: Capture 2 #>
// Todo: Capture 3
# Todo: Capture 4
/* TODO: Capture 5 */
' TODO: Capture 6
-- TODO: Capture 7
% TODO: Capture 8
=begin Todo: Capture 9 =end
{- Todo: Capture 10 -}
(* Todo: Capture 11 *)
{{! Todo: Capture 12 }}

<!-- @todo: Capture 0 -->
<% @todo: Capture 1 %>
<# @todo: Capture 2 #>
// @todo: Capture 3
@* @todo: Capture 1 *@
# @todo: Capture 4
/* @todo: Capture 5 */
' @todo: Capture 6
-- @todo: Capture 7
% @todo: Capture 8
=begin @todo: Capture 9 =end
{- @todo: Capture 10 -}
(* @todo: Capture 11 *)
{{! @todo: Capture 12 }}
```

> https://regex101.com/r/EfBE5C/1

## Install

```bash
$ npm i --todo-cli
```

## How to use

From the command line (It does not works)
```bash
# TODO: run the module from the command line
$ node index.js
```

Import as JavasScript module
```javascript
$ import { Debit } from 'technical-debt-cli'

// In your node-js server file
Debt.init(options);
```

As npm script
```json
"scripts": {
  "todo": "npm run todo"
}
```

## Options

```javasScript
const options = {
  target: [glob-options],
  ignore: ['readme.md', 'index.js', 'node_modules'],
  verbose: <Boolean>
};
```

#### option.target
__Array of strings__ - __(Required)__ - Any Glob pattern rule

#### option.ignore
__ignore instance__ - Could be a String, an array of Strings, or an instance of node-ignore. String values must contain the glob pattern to be ignored. The package also read the `.gitignore` file in order to not to read ignores files by your repo. It is a bypass of [ignore](https://www.npmjs.com/package/ignore) ignore option.

#### option.verbose
__Boolean__ - In verbose mode, the program prints a list of target files.

## Editors 

## Test

```bash
$ npm test
```

## How to collaborate

We use [GitHub Flow](link) as branching model. Make your `PR` in order to review it. Your PR will be merged after a fast review.

Pro Tip! View the .technicaldebt file to know what contribuite to.
