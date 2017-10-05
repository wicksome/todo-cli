#!/usr/bin/env node

'use strict';

import * as fs from 'fs';
import * as path from 'path';
import colors from 'colors';
import {table} from 'table';
import {TodoTxt} from '../lib/jsTodoTxt';

// ----------------------------------------------------------------------------
const _ = {}; // private object

const TODO_TXT_PATH = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, 'Dropbox', 'todo', 'todo.txt');
const DONE_TXT_PATH = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, 'Dropbox', 'todo', 'done.txt');

const getStatus = (isCompleted) => {
  return isCompleted ? '✓'.green : '✕'.red;
};

const tableConfig = {
  columns : {
    0 : {
      alignment : 'right',
      paddingLeft : 3
    },
    1 : {
      width : 70
    },
  },
  border : {
    topBody : ``,
    topJoin : ``,
    topLeft : ``,
    topRight : ``,

    bottomBody : ``,
    bottomJoin : ``,
    bottomLeft : ``,
    bottomRight : ``,

    bodyLeft : ``,
    bodyRight : ``,
    bodyJoin : `|`.dim,

    joinBody : ``,
    joinLeft : ``,
    joinRight : ``,
    joinJoin : ``
  },
  drawHorizontalLine : (index, size) => {
    return index === 0 || index === size;
  },
  columnDefault : {
    paddingLeft : 1,
    paddingRight : 1
  }
};

/**
 *
 * @param item TodoTxt
 * @returns {string}
 */
_.convertTodoToString = (item) => {
  let str = [];

  str.push(`${getStatus(item.complete)}`);

  if (item.priority) {
    str.push(item.priority.yellow.bold.italic);
  }

  if (item.date) {
    str.push(`${item.date.toLocaleDateString('ko-KR')}`.dim);
  }

  if (item.projects) {
    str.push(item.projects.map((proj => {
      return '+' + proj
    })).join(' ').blue);
  }

  str.push(item.text);

  if (item.contexts) {
    str.push(item.contexts.map(ctx => {
      return '@' + ctx;
    }).join(' ').green);
  }

  return str.join(' ');
};

_.toElementOfTable = (todo, idx) => {
  return [idx, _.convertTodoToString(todo)];
};

/**
 * Load todo.txt and done.txt
 * @param isAll if true, get todo and done
 * @returns {string}
 */
_.load = (isAll) => {
  if (isAll) {
    return fs.readFileSync(DONE_TXT_PATH, 'utf8').concat(fs.readFileSync(TODO_TXT_PATH, 'utf8'));
  } else {
    return fs.readFileSync(TODO_TXT_PATH, 'utf8');
  }
};

_.show = function(todoItems) {
  // for header
  const today = new Date().toLocaleDateString('ko-KR'),
    all = todoItems.length,
    completed = todoItems.filter((todo) => todo.complete).length,
    active = todoItems.length - completed;

  // print to prompt
  console.log();
  console.log(`  Date: ${today.white} - All: ${colors.white(all)}, Active: ${colors.white(active)}, Completed: ${colors.white(completed)}`);
  process.stdout.write(table(todoItems.map(_.toElementOfTable), tableConfig)); // without trailing newline
};

export default (cmd = 'list', env) => {
  // options
  const isAll = env.all,
    keyword = env.args[0],
    context = env.context,
    project = env.project;

  isAll && console.log("show all with done".yellow);
  project && console.log(`"${project}" is search project`.yellow);
  context && console.log(`"${context}" is search context`.yellow);
  keyword && console.log(`"${keyword}" is search keyword`.yellow);

  const todoTxt = _.load(isAll);

  const todos = TodoTxt.parse(todoTxt);

  _.show(todos);
}