const test = require('ava');
const { elementPosition, positionCoords } = require('./index');

test('elementPosition', t => {
  let rect;

  const element = {
    getBoundingClientRect() {
      return rect;
    }
  };

  const container = {
    getBoundingClientRect() {
      return {
        width: 180,
        height: 90
      };
    }
  };

  rect = { top: 14, left: 29, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'top left');

  rect = { top: 14, left: 60, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'top center');

  rect = { top: 14, left: 91, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'top right');

  rect = { top: 30, left: 29, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'middle left');

  rect = { top: 30, left: 60, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'middle center');

  rect = { top: 30, left: 91, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'middle right');

  rect = { top: 46, left: 29, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'bottom left');

  rect = { top: 46, left: 60, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'bottom center');

  rect = { top: 46, left: 91, width: 60, height: 30 };
  t.is(elementPosition(element, container, 3, 3), 'bottom right');
});

test('positionCoords', t => {
  const element = {
    getBoundingClientRect() {
      return {
        width: 20,
        height: 10
      };
    },
    ownerDocument: {
      scrollingElement: {
        scrollLeft: 10,
        scrollTop: 5
      }
    }
  };

  const reference = {
    getBoundingClientRect() {
      return {
        top: 20,
        left: 50,
        width: 60,
        height: 30
      };
    }
  };

  t.deepEqual(positionCoords('top left', element, reference), [60, 15]);
  t.deepEqual(positionCoords('top center', element, reference), [80, 15]);
  t.deepEqual(positionCoords('top right', element, reference), [100, 15]);
  t.deepEqual(positionCoords('right middle', element, reference), [120, 35]);
  t.deepEqual(positionCoords('right top', element, reference), [120, 25]);
  t.deepEqual(positionCoords('right bottom', element, reference), [120, 45]);
  t.deepEqual(positionCoords('bottom right', element, reference), [100, 55]);
  t.deepEqual(positionCoords('bottom center', element, reference), [80, 55]);
  t.deepEqual(positionCoords('bottom left', element, reference), [60, 55]);
  t.deepEqual(positionCoords('left middle', element, reference), [40, 35]);
  t.deepEqual(positionCoords('left top', element, reference), [40, 25]);
  t.deepEqual(positionCoords('left bottom', element, reference), [40, 45]);
});
