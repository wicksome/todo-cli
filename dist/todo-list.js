#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _table = require('table');

var _jsTodoTxt = require('../lib/jsTodoTxt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// ----------------------------------------------------------------------------
var _ = {}; // private object

var TODO_TXT_PATH = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, 'Dropbox', 'todo', 'todo.txt');
var DONE_TXT_PATH = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, 'Dropbox', 'todo', 'done.txt');

var getStatus = function getStatus(isCompleted) {
  return isCompleted ? '✓'.green : '✕'.red;
};

var tableConfig = {
  columns: {
    0: {
      alignment: 'right',
      paddingLeft: 3
    },
    1: {
      width: 70
    }
  },
  border: {
    topBody: '',
    topJoin: '',
    topLeft: '',
    topRight: '',

    bottomBody: '',
    bottomJoin: '',
    bottomLeft: '',
    bottomRight: '',

    bodyLeft: '',
    bodyRight: '',
    bodyJoin: '|'.dim,

    joinBody: '',
    joinLeft: '',
    joinRight: '',
    joinJoin: ''
  },
  drawHorizontalLine: function drawHorizontalLine(index, size) {
    return index === 0 || index === size;
  },
  columnDefault: {
    paddingLeft: 1,
    paddingRight: 1
  }
};

/**
 *
 * @param item TodoTxt
 * @returns {string}
 */
_.convertTodoToString = function (item) {
  var str = [];

  str.push('' + getStatus(item.complete));

  if (item.priority) {
    str.push(item.priority.yellow.bold.italic);
  }

  if (item.date) {
    str.push(('' + item.date.toLocaleDateString('ko-KR')).dim);
  }

  if (item.projects) {
    str.push(item.projects.map(function (proj) {
      return '+' + proj;
    }).join(' ').blue);
  }

  str.push(item.text);

  if (item.contexts) {
    str.push(item.contexts.map(function (ctx) {
      return '@' + ctx;
    }).join(' ').green);
  }

  return str.join(' ');
};

_.toElementOfTable = function (todo, idx) {
  return [idx, _.convertTodoToString(todo)];
};

/**
 * Load todo.txt and done.txt
 */
_.load = function (option) {
  var origin = void 0;
  if (option.isAll) {
    origin = fs.readFileSync(DONE_TXT_PATH, 'utf8').concat(fs.readFileSync(TODO_TXT_PATH, 'utf8'));
  } else {
    origin = fs.readFileSync(TODO_TXT_PATH, 'utf8');
  }

  var todos = _jsTodoTxt.TodoTxt.parse(origin);

  if (option.context) {
    todos = todos.filter(function (todo) {
      return todo.contexts && todo.contexts.includes(option.context);
    });
  }

  if (option.project) {
    todos = todos.filter(function (todo) {
      return todo.projects && todo.projects.includes(option.project);
    });
  }

  if (option.keyword) {
    var regex = new RegExp('(' + option.keyword + ')', 'i');
    todos = todos.filter(function (todo) {
      return todo.text.search(regex) !== -1;
    });
    todos.forEach(function (todo) {
      todo.text = todo.text.replace(regex, '$1'.underline.italic);
    });
  }

  return todos;
};

_.show = function (todoItems) {
  // for header
  var today = new Date().toLocaleDateString('ko-KR'),
      all = todoItems.length,
      completed = todoItems.filter(function (todo) {
    return todo.complete;
  }).length,
      active = todoItems.length - completed;

  var todos = todoItems.map(_.toElementOfTable);

  // print to prompt
  console.log();
  console.log('  Date: ' + today.white + ' - All: ' + _colors2.default.white(all) + ', Active: ' + _colors2.default.white(active) + ', Completed: ' + _colors2.default.white(completed));
  process.stdout.write((0, _table.table)(todos, tableConfig)); // without trailing newline
};

exports.default = function () {
  var cmd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'list';
  var env = arguments[1];

  // options
  var option = {
    isAll: env.all,
    context: env.context,
    project: env.project,
    keyword: env.search
  };

  _.show(_.load(option));
};