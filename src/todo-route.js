#!/usr/bin/env node
'use strict';

import init from './todo-init.js';
import list from './todo-list.js';
import add from './todo-add.js';
import toggle from './todo-toggle.js';
import modify from './todo-modify.js';
import clean from './todo-clean.js';

export default {
  init,
  list,
  add,
  toggle,
  modify,
  clean
};