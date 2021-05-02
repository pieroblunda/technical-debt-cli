# Technical debit cli

Print your ToDo list in the terminal in order to manage them better according to Agile. `todo-cli` looks for [_language-todo_](https://atom.io/packages/language-todo) comments in your code and prints them.

## Why?
* [Wikipedia - technical debt](https://en.wikipedia.org/wiki/Technical_debt)
* [Medium article - How to manage a technical debt](https://pieroblunda.medium.com/how-to-manage-a-technical-debt-53af3443b927)
* [Agile article - How to manage a technical debt](https://4agile.pl/how-to-manage-technical-debt/)

## Support languages
`Euphoria` `Haskell` `SQL` `Ada` `AppleScript` `Eiffel` `Lua` `VHDL` `SGML` `PureScript` `ActionScript` `C` `C++` `C#` `D` `F#` `Go` `Java` `JavaScript` `Kotlin` `Delphi` `Objective-C` `PHP` `Rust` `Scala` `SASS` `Swift` `Xojo` `Bourne shell and other UNIX shells` `Cobra` `Perl` `Python` `Ruby` `Seed7` `Windows PowerShell` `PHP` `R` `Make` `Maple` `Elixir` `Nim` `TeX` `Prolog` `MATLAB` `Erlang` `S-Lang` `Visual Prolog` `ActionScript` `AutoHotkey` `C` `C++` `C#` `D,Go` `Java` `JavaScript` `kotlin` `Objective-C` `PHP` `PL/I` `Prolog` `Rexx` `Rust` `Scala` `SAS` `SASS` `SQL` `Swift` `Visual Prolog` `CSS` `Razor`

## Install

```bash
$ npm install technical-debt-cli
```

## Usage

Import as JavasScript module
```javascript
import TodoCli from 'technical-debt-cli';

// On startup a server file
TodoCli.init(options);
```

## Options

```javasScript
const options = {
  target: [glob-options],
  ignore: ['readme.md', 'index.js', 'node_modules'],
  verbose: <Boolean>,
  re: RegEx
};
```

#### option.target
__Array of strings__ - __(Required)__ - Any Glob pattern rule

#### option.ignore
__ignore instance__ - Could be a String, an array of Strings, or an instance of node-ignore. String values must contain the glob pattern to be ignored. The package also read the `.gitignore` file in order to not to read ignores files by your repo. It is a bypass of [ignore](https://www.npmjs.com/package/ignore) ignore option.

#### option.verbose
__Boolean__ - In verbose mode, the program prints a list of target files.

#### option.re
__Regular Expresion__ - Regular expression to use on matches. It is only one regular expression for all possible matches. Value by default is `/(?:<%|<#|<!--|\/\*|\/\/|#|'|--|%|=begin|\{\-|\(\*|\{{2}!|@\*)\s?@?todo:\s?(.*?)(?:%>|#>|\-\->|\*\/|\n|=end|\-\}|\*\)|\{{2}|\*@)/gmi`. This regular expression captures the comment text inside the following comments syntax

```bash
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

## Editors

## Test

```bash
$ npm run test
```

## How to collaborate

We use [GitHub Flow](https://guides.github.com/introduction/flow/) as branching model. Open a branch from `master` and push to review it. Pro Tip! Check the .todo file to know what contribuite to.
