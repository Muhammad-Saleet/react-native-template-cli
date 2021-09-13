@itxi/react-native-template-cli
===============================

A tool for generating components, screens, navigators and other react native stuff

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@itxi/react-native-template-cli.svg)](https://npmjs.org/package/@itxi/react-native-template-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@itxi/react-native-template-cli.svg)](https://npmjs.org/package/@itxi/react-native-template-cli)
[![License](https://img.shields.io/npm/l/@itxi/react-native-template-cli.svg)](https://github.com/Muhammad-Saleet/react-native-template-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @muhammad-saleet/react-native-template-cli
$ rnt COMMAND
running command...
$ rnt (-v|--version|version)
@muhammad-saleet/react-native-template-cli/0.2.0 linux-x64 node-v15.2.1
$ rnt --help [COMMAND]
USAGE
  $ rnt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rnt generate:component FirstComponent SecondComponent ...`](#rnt-generatecomponent-firstcomponent-secondcomponent-)
* [`rnt mycommand --myflag`](#rnt-mycommand---myflag)
* [`rnt generate:screen FirstScreen SecondSecond ...`](#rnt-generatescreen-firstscreen-secondsecond-)
* [`rnt help [COMMAND]`](#rnt-help-command)

## `rnt generate:component FirstComponent SecondComponent ...`

Generates a component

```
USAGE
  $ rnt generate:component FirstComponent SecondComponent ...

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/generate/component.ts](https://github.com/Muhammad-Saleet/react-native-template-cli/blob/v0.2.0/src/commands/generate/component.ts)_

## `rnt mycommand --myflag`

description of my command

```
USAGE
  $ rnt mycommand --myflag

OPTIONS
  -f, --force
  -h, --help      show CLI help
  -n, --name=a|b  [default: world] name to print

DESCRIPTION
  description of my command
       can be multiline

EXAMPLES
  $ hello first second
  $ hello --force --name=muhammad
```

_See code: [src/commands/generate/hello.ts](https://github.com/Muhammad-Saleet/react-native-template-cli/blob/v0.2.0/src/commands/generate/hello.ts)_

## `rnt generate:screen FirstScreen SecondSecond ...`

Generates a screen

```
USAGE
  $ rnt generate:screen FirstScreen SecondSecond ...

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/generate/screen.ts](https://github.com/Muhammad-Saleet/react-native-template-cli/blob/v0.2.0/src/commands/generate/screen.ts)_

## `rnt help [COMMAND]`

display help for rnt

```
USAGE
  $ rnt help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
