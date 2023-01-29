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

export function uploadFiles(
  assets: { getAccept(): string; loadFiles(files: FileList): Promise<void> },
  cb?: () => void,
): void {
  createSelectFile(assets.getAccept(), async (files) => {
    try {
      await assets.loadFiles(files);
      cb?.();
    } catch {
      new Error('Files not loaded');
    }
  });
}
