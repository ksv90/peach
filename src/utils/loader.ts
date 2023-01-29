import { BaseTexture } from 'pixi.js';

export async function loadFile(file: File): Promise<Response> {
  const objectURL = URL.createObjectURL(file);
  try {
    return await fetch(objectURL);
  } catch {
    throw new Error(`The file ${file.name} is not loaded`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}

export async function loadTexture(file: File): Promise<BaseTexture> {
  const objectURL = URL.createObjectURL(file);
  return new Promise<BaseTexture>((resolve) => {
    const baseTexture = new BaseTexture(objectURL);
    baseTexture.on('loaded', () => resolve(baseTexture));
  })
    .finally(() => URL.revokeObjectURL(objectURL))
    .catch(() => {
      throw new Error(`The image ${file.name} is not loaded`);
    });
}

export function getFileName(file: File): string {
  return file.webkitRelativePath || file.name + file.size;
}
