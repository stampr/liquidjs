import tag_assign from './assign.js';
import tag_capture from './capture.js';
import tag_case from './case.js';
import tag_comment from './comment.js';
import tag_cycle from './cycle.js';
import tag_decrement from './decrement.js';
import tag_for from './for.js';
import tag_if from './if.js';
import tag_include from './include.js';
import tag_increment from './increment.js';
import tag_layout from './layout.js';
import tag_raw from './raw.js';
import tag_tablerow from './tablerow.js';
import tag_unless from './unless.js';

export default function(engine) {
  [
    tag_assign,
    tag_capture,
    tag_case,
    tag_comment,
    tag_cycle,
    tag_decrement,
    tag_for,
    tag_if,
    tag_include,
    tag_increment,
    tag_layout,
    tag_raw,
    tag_tablerow,
    tag_unless,
  ].forEach(registerTag => registerTag(engine));
}
