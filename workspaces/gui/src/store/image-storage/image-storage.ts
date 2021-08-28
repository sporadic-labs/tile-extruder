interface ImageData {
  url: string;
  image: HTMLImageElement;
  width: number;
  height: number;
}

type ImageId = number;

type ImageEntry = [ImageId, ImageData];

class ImageStorage {
  private currentId: ImageId = 0;
  private map = new Map<ImageId, ImageData>();

  public has(id: ImageId) {
    return this.map.has(id);
  }

  public get(id: ImageId) {
    const data = this.map.get(id);
    if (data) {
      return data;
    }
    return null;
  }

  public remove(id: ImageId) {
    const data = this.map.get(id);
    if (data) {
      if (data.url.startsWith("blob")) {
        URL.revokeObjectURL(data.url);
      }
      this.map.delete(id);
    }
  }

  public clear() {
    const keys = this.map.keys();
    for (let id of keys) {
      this.remove(id);
    }
  }

  public async addFromPath(src: string) {
    const id = ++this.currentId;
    const image = new Image();
    return new Promise<ImageEntry>((resolve, reject) => {
      image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        const imageData: ImageData = {
          width,
          height,
          image,
          url: src,
        };
        this.map.set(id, imageData);
        resolve([id, imageData]);
      };
      image.onerror = () => {
        reject("Error loading image from File.");
      };
      image.src = src;
    });
  }

  public async addFromFile(file: File) {
    const objectUrl = URL.createObjectURL(file);
    return this.addFromPath(objectUrl);
  }
}

export default ImageStorage;
export type { ImageData, ImageId, ImageEntry };
