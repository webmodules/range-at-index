
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

});
