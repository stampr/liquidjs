require('reify');

global.assert = require('assert');
global.chai   = require('chai');
global.expect = chai.expect;

chai.use(require('chai-as-promised'));
