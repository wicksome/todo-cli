#!/usr/bin/env node


'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getStatus = function getStatus(isCompleted) {
  return isCompleted ? '✓'.green : '✕'.red;
};

exports.default = {
  getMark: getStatus
};