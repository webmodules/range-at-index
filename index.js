
/**
 * Module dependencies.
 */

import DomIterator from 'dom-iterator';

/**
 * Module exports.
 */

module.exports = RangeAtIndex;

/**
 * Returns a Range instance selecting text within HTML Element `el`,
 * at the given `start` and `end` offsets.
 *
 * @param {HTMLElement} el - DOM element to select text within
 * @public
 */

function RangeAtIndex (el, index, offset, range) {
  if (!range) range = el.ownerDocument.createRange();

  let it = new DomIterator(el.firstChild, el)
    .select(3 /* text node */)
    .revisit(false);

  let node = it.start;
  let start = {};
  let end = {};
  let val, len;

  // ensure node is a textnode
  //
  // TODO: figure out a better way to do this
  // within dom-iterator
  node = 3 == node.nodeType ? node : it.next();

  while (node) {
    val = node.nodeValue;
    len = val.length;

    if (!start.node && len > index) {
      start.node = node;
      start.offset = index;
    }

    if (!end.node && len >= offset) {
      end.node = node;
      end.offset = offset;
    }

    index -= len;
    offset -= len;
    node = it.next();
  }

  // create the range from the start and end offsets
  if (start.node) range.setStart(start.node, start.offset);
  if (end.node) range.setEnd(end.node, end.offset);

  return range;
}
