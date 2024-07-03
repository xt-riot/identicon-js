import { createCanvas, createImageData, type ImageData } from 'canvas';
import fs from 'fs';

function createCanvasData(
  input: Uint8ClampedArray,
  width: number,
  height: number,
): Buffer {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const inputAsImageData = createImageData(input, input.length / (4 * height), input.length / (4 * width));

  let pixelArrayToStore: ImageData = inputAsImageData;

  if (inputAsImageData.height !== height || inputAsImageData.width !== width) {
    pixelArrayToStore = resizeImage(inputAsImageData, width, height);
  }

  ctx.putImageData(pixelArrayToStore, 0, 0);

  const imageBase64String = canvas
    .toDataURL()
    .replace(/^data:image\/\w+;base64,/, '');

  return Buffer.from(imageBase64String, 'base64');
}

export function exportAsJpeg(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
): boolean {
  const canvasData = createCanvasData(imageData, width, height);

  try {
    fs.writeFileSync('./image.jpeg', canvasData);
    return true;
  } catch (error) {
    console.error('Error writing image to file', error);
    return false;
  }
}

export function exportAsPng(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
): boolean {
  const canvasData = createCanvasData(imageData, width, height);

  try {
    fs.writeFileSync('./image.png', canvasData);
    return true;
  } catch (error) {
    console.error('Error writing image to file', error);
    return false;
  }
}

function resizeImage(
  imageData: ImageData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  width: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  height: number,
): ImageData {
  // resize the image
  return imageData;
}
