import tagAssign from './assign.js';
import tagCapture from './capture.js';
import tagCase from './case.js';
import tagComment from './comment.js';
import tagCycle from './cycle.js';
import tagDecrement from './decrement.js';
import tagFor from './for.js';
import tagIf from './if.js';
import tagInclude from './include.js';
import tagIncrement from './increment.js';
import tagLayout from './layout.js';
import tagRaw from './raw.js';
import tagTablerow from './tablerow.js';
import tagUnless from './unless.js';

export default function (engine) {
  [
    tagAssign,
    tagCapture,
    tagCase,
    tagComment,
    tagCycle,
    tagDecrement,
    tagFor,
    tagIf,
    tagInclude,
    tagIncrement,
    tagLayout,
    tagRaw,
    tagTablerow,
    tagUnless
  ].forEach(registerTag => registerTag(engine));
}
