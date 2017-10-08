#!/usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _todoRoute = require('./todo-route.js');

var _todoRoute2 = _interopRequireDefault(_todoRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ----------------------------------------------------------------------------
_commander2.default
// .command('list')
.version('0.1.0').description('A simple and extensible JavaScript App for managing you todo.txt file.');

// ----------------------------------------------------------------------------
_commander2.default.command('init').description('Initialize a collection of todos').action(_todoRoute2.default.init);

// ----------------------------------------------------------------------------
_commander2.default.command('add <todo>').alias('a').description('Add a new todo').option('-p, --project <project>', 'add with project').option('-c, --context <context>', 'add with context').action(_todoRoute2.default.add).on('--help', function () {
  console.log();
  console.log('  Example:');
  console.log();
  console.log('    $ todo add "call yeongjun"');
  console.log('    $ todo -p "cook" "buy rice"');
  console.log();
});

// ----------------------------------------------------------------------------
_commander2.default.command('modify <id> <todo>').alias('m').description('Modify the text of an existing todo').action(_todoRoute2.default.modify);

// ----------------------------------------------------------------------------
_commander2.default.command('toggle <id>').alias('t').description('Toggle the status of a todo by giving his id').action(_todoRoute2.default.toggle);

// ----------------------------------------------------------------------------
_commander2.default.command('clean').alias('c').description('Remove finished todos from the list').action(_todoRoute2.default.clean);

// ----------------------------------------------------------------------------
var option = {};
/** show todo list(default) */
_commander2.default.option('-a, --all', 'output all todos').option('-d, --done', 'output done todos').option('-s, --search <keyword>', 'search a string in todos').option('-c, --context <context>', 'search a context in todos').option('-p, --project <project>', 'search a project in todos').parse(process.argv);

// ----------------------------------------------------------------------------
// exec default command
if (!_commander2.default.args.length || _commander2.default.args.length === 1 && typeof _commander2.default.args[0] === 'string') {
  // todo.list("list", cli, Object.assign(option, {
  //   keyword : cli.args[0]
  // }));
  _todoRoute2.default.list("list", _commander2.default);
}