import fs from "fs";

import { Podcast } from "@/types";
import { imageService } from "./imageService";

class PodcastService {
  private podcastCache: Podcast[] | null = null;

  private async getTranscript(path: string): Promise<string | null> {
    const transcriptPath = `${process.cwd()}/public/${path}`;
    const transcriptExists = fs.existsSync(transcriptPath);

    if (transcriptExists) {
      const transcriptObject = fs.readFileSync(transcriptPath, "utf8");
      return transcriptObject;
    }

    return null;
  }

  public async getPodcasts(): Promise<Podcast[]> {
    if (this.podcastCache) {
      return this.podcastCache;
    }

    const podcastsPath = `${process.cwd()}/public/content/podcast`;
    const podcastsNames = fs.readdirSync(podcastsPath);
    const podcastsFiltered = podcastsNames.filter((podcastName) =>
      podcastName.endsWith(".json")
    );

    const podcastsPromises = podcastsFiltered.map(async (podcastName) => {
      const podcastPath = `${podcastsPath}/${podcastName}`;

      const podcastObject = fs.readFileSync(podcastPath, "utf8");
      const podcastParsed = JSON.parse(podcastObject);

      const { audio, publishing } = podcastParsed;

      const [image, banner, transcript] = await Promise.all([
        imageService.getImage(podcastParsed.image),
        imageService.getImage(podcastParsed.banner),
        this.getTranscript(podcastParsed.transcript),
      ]);

      const explicit = podcastParsed.explicit === true;
      const updated = new Date(podcastParsed.updated);
      const publication = new Date(podcastParsed.publication);

      return {
        ...podcastParsed,
        audio,
        image,
        banner,
        explicit,
        updated,
        transcript,
        publishing,
        publication,
      };
    });

    const podcastsObjects = await Promise.all(podcastsPromises);

    const podcastsObjectsFiltered = podcastsObjects.filter(
      (podcast) => podcast.publication <= new Date()
    );

    const podcastsObjectsOrdered = podcastsObjectsFiltered.sort(
      (a, b) => b.episode - a.episode
    );

    this.podcastCache = podcastsObjectsOrdered;

    return podcastsObjectsOrdered;
  }

  public roundNumber(number: number, precision = 0): number {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
}

export const podcastService = new PodcastService();
