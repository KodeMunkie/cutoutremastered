const parseColor = require('parse-color');
const clone = require('./clone');

/**
 * Converts iterator to x and y coordinates when iterating sequentially over a matrix
 */

const getCoordinates = (iteration, width) => {
  const x = Math.round(iteration % width);
  const y = Math.round(Math.floor(iteration / width));

  return [x, y];
};

/**
 * Draws a rectangle in a clone of an existing ndarray
 */

const rect = (shape, image) => {
  if (shape.length < 2) {
    throw new Error('Rectangle does not have the required attributes');
  }

  const imageWidth = image.shape[0];
  const imageHeight = image.shape[1];

  const copy = clone(image);

  const attributes = shape[1];
  const pixels = attributes.width * attributes.height;
  const { rgb } = parseColor(attributes.fill);

  for (let currentPixel = 0; currentPixel < pixels; currentPixel += 1) {
    let [currentX, currentY] = getCoordinates(currentPixel, attributes.width);

    // Correct for x and y offset
    currentX += attributes.x;
    currentY += attributes.y;

    // Skip pixels that are not inside the image
    if (currentX > imageWidth - 1 || currentY > imageHeight - 1) {
      // eslint-disable-next-line no-continue
      continue;
    }

    copy.set(currentX, currentY, 0, rgb[0]);
    copy.set(currentX, currentY, 1, rgb[1]);
    copy.set(currentX, currentY, 2, rgb[2]);
  }

  return copy;
};

module.exports = { rect };