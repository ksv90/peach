import { ElementsContextState } from '../contexts';
import { Assets } from '../core';

const devices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function createSelectFile(accept: string, selectFiles: (files: FileList) => void): void {
  const input = document.createElement('input');
  input.type = 'file';
  if (!devices.test(navigator.userAgent)) input.webkitdirectory = true;
  input.accept = accept;
  input.multiple = true;
  input.addEventListener(
    'change',
    ({ target }) => {
      if (!(target instanceof HTMLInputElement)) return;
      if (!target.files) throw new Error('Files are not selected');
      selectFiles(target.files);
      input.remove();
    },
    { once: true },
  );
  input.click();
}

// TODO: убрать обновление елементов
export async function uploadFiles(
  assets: Assets,
  elementsContext: ElementsContextState,
  cb?: () => void,
) {
  const { updateSkeletons, updateBitmapFonts, updateWebFonts } = elementsContext;
  createSelectFile(assets.getAccept(), async (files) => {
    try {
      await assets.loadFiles(files);
    } finally {
      updateSkeletons(assets.getSkeletonDatas());
      updateBitmapFonts(assets.getBitmapFontsNames());
      updateWebFonts(assets.getWebFontNames());
      console.log(123);

      cb?.();
    }
  });
}

export function getHalf(value: number) {
  return Math.round(value / 2);
}
