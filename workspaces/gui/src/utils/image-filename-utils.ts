const imageMimeTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;

type ImageMimeType = typeof imageMimeTypes[number];

interface ImageFileInfo {
  name: string;
  ext: string;
  mimeType: ImageMimeType;
}

function parseImageFilename(filename: string): ImageFileInfo {
  const extensionStart = filename.lastIndexOf(".");
  if (extensionStart === -1) {
    return { name: filename, ext: "", mimeType: "image/png" };
  } else {
    const name = filename.substr(0, extensionStart);
    const ext = filename.substr(extensionStart).toLowerCase();
    const mimeType = getMimeTypeFromExtension(ext);
    return { name, ext, mimeType };
  }
}

function getMimeTypeFromExtension(ext: string): ImageMimeType {
  const lowerExt = ext.toLowerCase();
  let mimeType: ImageMimeType;
  if (lowerExt === ".png") {
    mimeType = "image/png";
  } else if (lowerExt === ".jpg" || lowerExt === ".jpeg") {
    mimeType = "image/jpeg";
  } else if (lowerExt === ".webp") {
    mimeType = "image/webp";
  } else if (lowerExt === ".gif") {
    mimeType = "image/gif";
  } else {
    mimeType = "image/png";
  }
  return mimeType;
}

function getExtensionFromMimeType(type: ImageMimeType) {
  switch (type) {
    case "image/gif":
      return ".gif";
    case "image/webp":
      return ".webp";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
    default:
      return ".png";
  }
}

export { parseImageFilename, imageMimeTypes, getExtensionFromMimeType, getMimeTypeFromExtension };
export type { ImageMimeType, ImageFileInfo };
