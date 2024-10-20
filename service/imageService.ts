import fs from "fs";
import sharp from "sharp";

import { Image } from "@/types";

class ImageService {
  private imageCache: { [key: string]: Image } = {};

  public async getImage({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }): Promise<Image> {
    // Check if image is already cached
    if (this.imageCache[src]) {
      return this.imageCache[src];
    }

    // Process and cache the image
    const imagePath = `${process.cwd()}/public/${src}`;
    const imageBuffer = fs.readFileSync(imagePath);

    const imageSharp = sharp(imageBuffer);
    const imageResized = await imageSharp.resize(8).toBuffer();

    const { width, height } = await imageSharp.metadata();

    const ImageBase64 = imageResized.toString("base64");
    const ImageSVG = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id="blur" x="0%" y="0%" width="100%" height="100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.25"/>
            <feComponentTransfer>
            <feFuncA type="discrete" tableValues="1 1"/>
          </feComponentTransfer>
        </filter>

        <image preserveAspectRatio='none' filter='url(#blur)' x='0' y='0' height='100%' width='100%' href='data:image/avif;base64,${ImageBase64}' />
      </svg>
    `;

    const blurBuffer = Buffer.from(ImageSVG);
    const blurBase64 = blurBuffer.toString("base64");

    const image = {
      src,
      alt,
      blur: blurBase64,
      width: width!,
      height: height!,
    };

    // Cache the processed image
    this.imageCache[src] = image;

    return image;
  }
}

export const imageService = new ImageService();
