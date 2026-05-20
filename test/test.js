import test from 'node:test';
import assert from 'assert/strict';
import get from '@ampsy/env'

const CORS_WHITELIST = get('CORS_WHITELIST', /.*(localhost|undefined).*/);
console.log(CORS_WHITELIST);