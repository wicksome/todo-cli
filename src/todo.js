#!/usr/bin/env node
'use strict';

import cli from 'commander';
import todo from './todo-route.js';

// ----------------------------------------------------------------------------
cli
  .version('0.1.0')
  .description('testsetst');

// ----------------------------------------------------------------------------
cli
  .command('init')
  .description('')
  .action(todo.init);

// ----------------------------------------------------------------------------
cli
  .command('add <todo>')
  .alias('a')
  .option('-p, --project <project name>', 'Add project')
  .option('-c, --context <context name>', 'Add context')
  .description('Add a new todo')
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
  .command('modify <id>')
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
// .option('-c, --context <type>', 'show context', (context) => Object.assign(option, {context}))
// .option('-p, --project <type>', 'Add the specified type of cheese [marble]', (project) => Object.assign(option, {project}))
  .option('-a, --all', 'show all todo(with done.txt)')
  .option('-s, --search <keyword>', 'show context')
  .option('-c, --context <type>', 'show context')
  .option('-p, --project <type>', 'Add the specified type of cheese [marble]')
  .option('-d, --detail', 'show detail view')
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