import { Podcast } from "@/types";
import { roundNumber } from "@/helper";

import Image from "../Image";

import styles from "./Podcasts.module.scss";

export default function Podcasts({ podcasts }: { podcasts: Podcast[] }) {
  return (
    <ul className={styles.podcasts}>
      {podcasts.map((podcast) => (
        <PodcastsItem podcast={podcast} key={podcast.slug} />
      ))}
    </ul>
  );
}

type PodcastsItemProps = {
  podcast: Podcast;
};

function PodcastsItem({ podcast }: PodcastsItemProps) {
  const date = podcast.publication;
  const dateFormatted = new Date(date).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className={styles.podcasts__podcast} key={podcast.slug}>
      <a
        className={styles.podcasts__podcast__link}
        href={`/podcast/${podcast.slug}`}
      >
        <Image
          image={podcast.image}
          sizes="100vw"
          className={styles.podcasts__podcast__link__image}
        />

        <div className={styles.podcasts__podcast__link__content}>
          <ul className={styles.podcasts__podcast__link__content__tags}>
            <li className={styles.podcasts__podcast__link__content__tags__tag}>
              {roundNumber(podcast.duration / 60)} minuten
            </li>
            <li className={styles.podcasts__podcast__link__content__tags__tag}>
              •
            </li>
            <li className={styles.podcasts__podcast__link__content__tags__tag}>
              {dateFormatted}
            </li>
          </ul>

          <h2 className={styles.podcasts__podcast__link__content__title}>
            {podcast.episode}. {podcast.title}
          </h2>

          <p className={styles.podcasts__podcast__link__content__description}>
            {podcast.description}
          </p>
        </div>
      </a>
    </li>
  );
}
