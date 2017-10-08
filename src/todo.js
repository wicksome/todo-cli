#!/usr/bin/env node
'use strict';

import cli from 'commander';
import todo from './todo-route.js';

// ----------------------------------------------------------------------------
cli
  .version('0.1.0')
  .description('A simple and extensible JavaScript App for managing you todo.txt file.');

// ----------------------------------------------------------------------------
cli
  .command('init')
  .description('Initialize a collection of todos')
  .action(todo.init);

// ----------------------------------------------------------------------------
cli
  .command('add <todo>')
  .alias('a')
  .description('Add a new todo')
  .option('-p, --project <project>', 'add with project')
  .option('-c, --context <context>', 'add with context')
  .action(todo.add)
  .on('--help', function() {
    console.log();
    console.log('  Example:');
    console.log();
    console.log('    $ todo add "call yeongjun"');
    console.log('    $ todo -p "cook" "buy rice"');
    console.log();
  });

// ----------------------------------------------------------------------------
cli
  .command('modify <id> <todo>')
  .alias('m')
  .description('Modify the text of an existing todo')
  .action(todo.modify)

// ----------------------------------------------------------------------------
cli
  .command('toggle <id>')
  .alias('t')
  .description('Toggle the status of a todo by giving his id')
  .action(todo.toggle);

// ----------------------------------------------------------------------------
cli
  .command('clean')
  .alias('c')
  .description('Remove finished todos from the list')
  .action(todo.clean);

// ----------------------------------------------------------------------------
let option = {};
/** show todo list(default) */
cli
// .command('list')
  .option('-a, --all', 'output all todos')
  .option('-d, --done', 'output done todos')
  .option('-s, --search <keyword>', 'search a string in todos')
  .option('-c, --context <context>', 'search a context in todos')
  .option('-p, --project <project>', 'search a project in todos')
  .parse(process.argv);

// ----------------------------------------------------------------------------
// exec default command
if (!cli.args.length ||
  (cli.args.length === 1 && typeof cli.args[0] === 'string')) {
  // todo.list("list", cli, Object.assign(option, {
  //   keyword : cli.args[0]
  // }));
  todo.list("list", cli);
}