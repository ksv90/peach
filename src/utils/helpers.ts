const devices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export async function loadFile(file: File): Promise<Response> {
  const objectURL = URL.createObjectURL(file);
  try {
    return await fetch(objectURL);
  } catch {
    throw new Error(`The file ${file.name} is not uploaded`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}

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
  loader: { getAccept(): string; loadFiles(files: FileList): Promise<void> },
  cb?: () => void,
): void {
  createSelectFile(loader.getAccept(), async (files) => {
    try {
      await loader.loadFiles(files);
    } catch {
      new Error('Files not loaded');
    } finally {
      cb?.();
    }
  });
}
