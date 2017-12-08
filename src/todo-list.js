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
 */
_.load = (option) => {
  let origin;
  // TODO: file exception
  if (option.isAll) {
    origin = fs.readFileSync(DONE_TXT_PATH, 'utf8').concat(fs.readFileSync(TODO_TXT_PATH, 'utf8'));
  } else {
    origin = fs.readFileSync(TODO_TXT_PATH, 'utf8');
  }

  let todos = TodoTxt.parse(origin);

  if (option.context) {
    todos = todos.filter((todo) => todo.contexts && todo.contexts.includes(option.context));
  }

  if (option.project) {
    todos = todos.filter((todo) => todo.projects && todo.projects.includes(option.project));
  }

  if (option.keyword) {
    const regex = new RegExp(`(${option.keyword})`, 'i');
    todos = todos.filter((todo) => todo.text.search(regex) !== -1);
    todos.forEach((todo) => {
      todo.text = todo.text.replace(regex, '$1'.underline.italic);
    });
  }

  return todos
};

_.show = function(todoItems) {
  // for header
  const today = new Date().toLocaleDateString('ko-KR'),
    all = todoItems.length,
    completed = todoItems.filter((todo) => todo.complete).length,
    active = todoItems.length - completed;

  const todos = todoItems.map(_.toElementOfTable);

  // print to prompt
  console.log();
  console.log(`  Date: ${today.white} - All: ${colors.white(all)}, Active: ${colors.white(active)}, Completed: ${colors.white(completed)}`);
  process.stdout.write(table(todos, tableConfig)); // without trailing newline
};

export default (cmd = 'list', env) => {
  // options
  const option = {
    isAll : env.all,
    context : env.context,
    project : env.project,
    keyword : env.search
  };

  _.show(_.load(option));
}