import { Podcast } from "@/types";
import { roundNumber } from "@/helper";

import styles from "./Info.module.scss";

type InfoProps = {
  podcast?: Podcast;
  podcasts?: Podcast[];
};

export default function Info({ podcast, podcasts }: InfoProps) {
  return (
    <ul className={styles.info}>
      {podcast && <InfoPodcast podcast={podcast} />}
      {podcasts && <InfoPodcasts podcasts={podcasts!} />}
    </ul>
  );
}

type InfoPodcast = {
  podcast: Podcast;
};

function InfoPodcast({ podcast }: InfoPodcast) {
  const date = podcast.publication;
  const dateFormatted = new Date(date).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <li className={styles.info__item}>{podcast.episode}e aflevering</li>

      <li className={styles.info__item}>•</li>
      <li className={styles.info__item}>
        {roundNumber(podcast.audio.duration / 60)} min
      </li>

      <li className={styles.info__item}>•</li>
      <li className={styles.info__item}>{dateFormatted}</li>
    </>
  );
}

type InfoPodcasts = {
  podcasts: Podcast[];
};

function InfoPodcasts({ podcasts }: InfoPodcasts) {
  const length = podcasts.length;

  const dateLatest = podcasts[length - 1].publication;
  const dateLatestFormatted = new Date(dateLatest).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <li className={styles.info__item}>
        {length} aflevering{length > 1 ? "en" : ""}
      </li>

      <li className={styles.info__item}>•</li>
      <li className={styles.info__item}>{dateLatestFormatted}</li>
    </>
  );
}
