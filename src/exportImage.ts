import { createCanvas, createImageData } from 'canvas';
import fs from 'fs';

import type { ImageData } from 'canvas';

// NOT USED YET
// WIP
function resizeImage(image: ImageData, width: number, height: number) {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  const oldAspectRatio = image.width / image.height;

  const widthResizeFactor = width / image.width;
  const heightResizeFactor = height / image.height;

  const newAspectRatio = widthResizeFactor / heightResizeFactor;

  let newPixelsArray: Uint8ClampedArray;

  if (oldAspectRatio !== newAspectRatio) {
    throw new Error('Cannot resize image without keeping aspect ratio');
  } else {
    newPixelsArray = new Uint8ClampedArray(image.width * image.height * 4 * newAspectRatio);

    const startOfLine = 4 * width;

    for (let i = 0; i < image.data.length; i += 4) {
      const pixel = image.data.slice(i, i + 4);

      const oldPixelPosition = Math.floor(i / 4);

      for (let x = 0; x < widthResizeFactor; x += 1) {
        const pixelPositionInXAxis = oldPixelPosition * 4 + x * 4;
        const mirroredPixelPositionInXAxis = width * 4 - oldPixelPosition * 4 - (x + 1) * 4;
        for (let y = 0; y < heightResizeFactor; y += 1) {
          const currentLine = startOfLine * y;
          newPixelsArray.set(pixel, currentLine + pixelPositionInXAxis + x * 4);
          newPixelsArray.set(pixel, currentLine + mirroredPixelPositionInXAxis - x * 4);
        }
      }
      if (i === 1) throw new Error('break');
    }
  }

  ctx.putImageData(createImageData(newPixelsArray, width, height), 0, 0);

  return canvas;
}

function convertIdenticonInfoToPixelArray(imageData: {
  color: { red: number; green: number; blue: number };
  data: number[];
}) {
  const result = new Uint8ClampedArray(imageData.data.length * 4);
  imageData.data.forEach((value, index) => {
    result.set(
      value ? [imageData.color.red, imageData.color.green, imageData.color.blue, 255] : [0, 0, 0, 255],
      index * 4
    );
  });
  return result;
}

function createCanvasData(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  newWidth = width,
  newHeight = height
) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const inputAsImageData = createImageData(imageData, width, height);

  ctx.putImageData(inputAsImageData, 0, 0);

  return newHeight !== height || newWidth !== width
    ? resizeImage(inputAsImageData, newWidth, newHeight)
    : canvas;
}

export function exportToImage(
  type: 'jpeg' | 'png',
  input: { color: { red: number; green: number; blue: number }; data: number[] },
  width: number,
  height: number,
  newWidth = width,
  newHeight = height
) {
  const pixelArray = convertIdenticonInfoToPixelArray(input);
  const canvasData = createCanvasData(pixelArray, width, height, newWidth, newHeight);

  let imageBuffer: Buffer;

  if (type === 'jpeg') {
    imageBuffer = canvasData.toBuffer('image/jpeg', { quality: 1 });
  } else {
    imageBuffer = canvasData.toBuffer('image/png');
  }

  fs.writeFileSync(`./image.${type}`, imageBuffer);
}
