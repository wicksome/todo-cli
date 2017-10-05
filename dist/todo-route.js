#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _todoInit = require('./todo-init.js');

var _todoInit2 = _interopRequireDefault(_todoInit);

var _todoList = require('./todo-list.js');

var _todoList2 = _interopRequireDefault(_todoList);

var _todoAdd = require('./todo-add.js');

var _todoAdd2 = _interopRequireDefault(_todoAdd);

var _todoToggle = require('./todo-toggle.js');

var _todoToggle2 = _interopRequireDefault(_todoToggle);

var _todoModify = require('./todo-modify.js');

var _todoModify2 = _interopRequireDefault(_todoModify);

var _todoClean = require('./todo-clean.js');

var _todoClean2 = _interopRequireDefault(_todoClean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: _todoInit2.default,
  list: _todoList2.default,
  add: _todoAdd2.default,
  toggle: _todoToggle2.default,
  modify: _todoModify2.default,
  clean: _todoClean2.default
};