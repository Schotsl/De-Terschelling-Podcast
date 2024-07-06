import fs from "fs";
import sharp from "sharp";

import { Podcast, Image } from "./types";

// @ts-ignore
import mp3Duration from "mp3-duration";

export function formatAgo(date: Date) {
  const now = new Date();

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 60) {
    return "afgelopen minuut";
  } else if (minutes < 60) {
    return `${minutes} ${minutes > 1 ? "minuten" : "minuut"} geleden`;
  } else if (hours < 24) {
    return `${hours} uur geleden`;
  } else if (days < 30) {
    return `${days} dag${days > 1 ? "en" : ""} geleden`;
  } else if (months < 12) {
    return `${months} maand${months > 1 ? "en" : ""} geleden`;
  } else {
    return `${years} jaar geleden`;
  }
}

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
  const podcastsPath = `${process.cwd()}/public/content/podcast`;
  const podcastsNames = fs.readdirSync(podcastsPath);
  const podcastsFiltered = podcastsNames.filter((podcastName) =>
    podcastName.endsWith(".json")
  );

  const podcastsPromises = podcastsFiltered.map(async (podcastName) => {
    const podcastPath = `${podcastsPath}/${podcastName}`;

    const podcastObject = fs.readFileSync(podcastPath, "utf8");
    const podcastParsed = JSON.parse(podcastObject);

    const audioPath = `${process.cwd()}/public${podcastParsed.audio}`;
    const audioStat = fs.statSync(audioPath);
    const audioBuffer = fs.readFileSync(audioPath);

    const audioSize = audioStat.size;
    const audioType = "audio/mpeg";

    const promiseImage = getImage(podcastParsed.image);
    const promiseDuration = mp3Duration(audioBuffer);

    const promiseResults = await Promise.all([promiseImage, promiseDuration]);

    const image = promiseResults[0];
    const duration = Math.round(promiseResults[1]);
    const explicit = podcastParsed.explicit === true;
    const publication = new Date(podcastParsed.publication);

    const enclosure = {
      url: `${process.env.NEXT_PUBLIC_CDN}${podcastParsed.audio}`,
      size: audioSize,
      type: audioType,
    };

    return {
      ...podcastParsed,
      image,
      duration,
      explicit,
      enclosure,
      publication,
    };
  });

  const podcastsResolved = await Promise.all(podcastsPromises);
  return [
    ...podcastsResolved,
    ...podcastsResolved,
    ...podcastsResolved,
    ...podcastsResolved,
    ...podcastsResolved,
    ...podcastsResolved,
  ];
}

export function roundNumber(number: number, precision = 0) {
  const factor = Math.pow(10, precision);
  const rounded = Math.round(number * factor) / factor;

  return rounded;
}
