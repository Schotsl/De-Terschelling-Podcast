import fs from "fs";
import sharp from "sharp";

import { Podcast, Image } from "./types";

export async function getImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}): Promise<Image> {
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

  return {
    src,
    alt,
    blur: blurBase64,
    width: width!,
    height: height!,
  };
}

export async function getPodcasts(): Promise<Podcast[]> {
  const current = new Date();

  const podcastsPath = `${process.cwd()}/public/content/podcast`;
  const podcastsNames = fs.readdirSync(podcastsPath);
  const podcastsFiltered = podcastsNames.filter((podcastName) =>
    podcastName.endsWith(".json")
  );

  const podcastsPromises = podcastsFiltered.map(async (podcastName) => {
    const podcastPath = `${podcastsPath}/${podcastName}`;

    const podcastObject = fs.readFileSync(podcastPath, "utf8");
    const podcastParsed = JSON.parse(podcastObject);

    const { duration, size, audio } = podcastParsed;

    const [image, banner] = await Promise.all([
      getImage(podcastParsed.image),
      getImage(podcastParsed.banner),
    ]);

    const explicit = podcastParsed.explicit === true;
    const publication = new Date(podcastParsed.publication);

    const enclosure = {
      url: `${process.env.NEXT_PUBLIC_CDN_ZONE}/${audio}`,
      type: "audio/mpeg",
      size,
    };

    return {
      ...podcastParsed,
      banner,
      image,
      duration,
      explicit,
      enclosure,
      publication,
    };
  });

  const podcastsObjects = await Promise.all(podcastsPromises);

  // Filter the podcasts that are published
  const podcastsObjectsFiltered = podcastsObjects.filter(
    (podcast) => podcast.publication <= current
  );

  // Order the podcasts by episode number
  const podcastsObjectsOrdered = podcastsObjectsFiltered.sort(
    (a, b) => b.episode - a.episode
  );

  return podcastsObjectsOrdered;
}

export function roundNumber(number: number, precision = 0) {
  const factor = Math.pow(10, precision);
  const rounded = Math.round(number * factor) / factor;

  return rounded;
}
