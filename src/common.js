#!/usr/bin/env node

'use strict';

const getStatus = (isCompleted) => {
  return isCompleted ? '✓'.green : '✕'.red;
};

export default {
  getMark : getStatus
}
