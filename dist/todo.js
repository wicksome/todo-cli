#!/usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _todoRoute = require('./todo-route.js');

var _todoRoute2 = _interopRequireDefault(_todoRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ----------------------------------------------------------------------------
_commander2.default
// .option('-c, --context <type>', 'show context', (context) => Object.assign(option, {context}))
// .option('-p, --project <type>', 'Add the specified type of cheese [marble]', (project) => Object.assign(option, {project}))
.version('0.1.0').description('testsetst');

// ----------------------------------------------------------------------------
_commander2.default.command('init').description('').action(_todoRoute2.default.init);

// ----------------------------------------------------------------------------
_commander2.default.command('add <todo>').alias('a').option('-p, --project <project name>', 'Add project').option('-c, --context <context name>', 'Add context').description('Add a new todo').action(_todoRoute2.default.add).on('--help', function () {
  console.log();
  console.log('  Example:');
  console.log();
  console.log('    $ todo add "call yeongjun"');
  console.log('    $ todo -p "cook" "buy rice"');
  console.log();
});

// ----------------------------------------------------------------------------
_commander2.default.command('modify <id>').alias('m').description('Modify the text of an existing todo').action(_todoRoute2.default.modify);

// ----------------------------------------------------------------------------
_commander2.default.command('toggle <id>').alias('t').description('Toggle the status of a todo by giving his id').action(_todoRoute2.default.toggle);

// ----------------------------------------------------------------------------
_commander2.default.command('clean').alias('c').description('Remove finished todos from the list').action(_todoRoute2.default.clean);

// ----------------------------------------------------------------------------
var option = {};
/** show todo list(default) */
_commander2.default.option('-a, --all', 'show all todo(with done.txt)').option('-s, --search <keyword>', 'show context').option('-c, --context <type>', 'show context').option('-p, --project <type>', 'Add the specified type of cheese [marble]').option('-d, --detail', 'show detail view').parse(process.argv);

// ----------------------------------------------------------------------------
// exec default command
if (!_commander2.default.args.length || _commander2.default.args.length === 1 && typeof _commander2.default.args[0] === 'string') {
  // todo.list("list", cli, Object.assign(option, {
  //   keyword : cli.args[0]
  // }));
  _todoRoute2.default.list("list", _commander2.default);
}