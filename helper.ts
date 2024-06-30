import fs from "fs";

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

export async function getPodcasts() {
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

    const duration = await mp3Duration(audioBuffer);
    const enclosure = {
      url: `https://de-terschelling-podcast.nl${podcastParsed.audio}`,
      size: audioSize,
      type: audioType,
    };

    return { ...podcastParsed, duration, enclosure };
  });

  const podcastsResolved = await Promise.all(podcastsPromises);
  return podcastsResolved;
}
