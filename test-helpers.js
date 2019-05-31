require('reify');

global.assert = require('assert');
global.chai = require('chai');
global.expect = global.chai.expect;

global.chai.use(require('chai-as-promised'));
