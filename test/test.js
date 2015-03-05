
var assert = require('assert');
var RangeAtIndex = require('../');

describe('range-at-index', function () {
  var div;

  afterEach(function () {
    if (div) {
      // clean up...
      document.body.removeChild(div);
      div = null;
    }
  });

  it('should return a Range instance selecting text', function () {
    div = document.createElement('div');
    div.innerHTML = 'hello world';
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);

    var range = RangeAtIndex(div, 1, 5);

    assert.equal('ello', range.toString());
    assert(div.firstChild === range.startContainer);
    assert.equal(1, range.startOffset);
    assert(div.firstChild === range.endContainer);
    assert.equal(5, range.endOffset);
  });

  it('should return a Range instance selecting text across DOM nodes', function () {
    div = document.createElement('div');
    div.innerHTML = '<b>hello</b> <i>world</i>';
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);

    var range = RangeAtIndex(div, 1, 9);

    assert.equal('ello wor', range.toString());
    assert(div.firstChild.firstChild === range.startContainer);
    assert.equal(1, range.startOffset);
    assert(div.lastChild.firstChild === range.endContainer);
    assert.equal(3, range.endOffset);
  });

  it('should modify the passed in Range instance', function () {
    div = document.createElement('div');
    div.innerHTML = '<b>hello</b> <i>world</i>';
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);

    var range = document.createRange();
    range.setStart(div, 0);
    range.setEnd(div, 0);
    assert(range.collapsed);

    RangeAtIndex(div, 4, 7, range);

    assert.equal('o w', range.toString());
    assert(div.firstChild.firstChild === range.startContainer);
    assert.equal(4, range.startOffset);
    assert(div.lastChild.firstChild === range.endContainer);
    assert.equal(1, range.endOffset);
  });

});
