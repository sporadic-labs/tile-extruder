interface ImageData {
  objectUrl: string;
  image: HTMLImageElement;
  width: number;
  height: number;
}

type ImageId = number;

class ImageStorage {
  private currentId: ImageId = 0;
  private map = new Map<ImageId, ImageData>();

  has(id: ImageId) {
    return this.map.has(id);
  }

  get(id: ImageId) {
    const data = this.map.get(id);
    if (data) {
      return data;
    }
    return null;
  }

  remove(id: ImageId) {
    const data = this.map.get(id);
    if (data) {
      URL.revokeObjectURL(data.objectUrl);
      this.map.delete(id);
    }
  }

  async addFromFile(file: File) {
    const id = ++this.currentId;
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    return new Promise<[ImageId, ImageData]>((resolve, reject) => {
      image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        const imageData: ImageData = {
          width,
          height,
          image,
          objectUrl,
        };
        this.map.set(id, imageData);
        resolve([id, imageData]);
      };
      image.onerror = () => {
        reject("Error loading image from File.");
      };
      image.src = objectUrl;
    });
  }
}

export default ImageStorage;
export type { ImageData, ImageId };
