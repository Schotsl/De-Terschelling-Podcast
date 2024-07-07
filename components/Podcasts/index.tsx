import { Podcast } from "@/types";

import styles from "./Podcasts.module.scss";

import PodcastsItem from "./Item";

type PodcastsProps = {
  podcasts: Podcast[];
};

export default function Podcasts({ podcasts }: PodcastsProps) {
  return (
    <section className={styles.podcasts}>
      <h2 className={styles.podcasts__title} id="podcasts">
        Onze laatste afleveringen
      </h2>

      <ul className={styles.podcasts__items}>
        {podcasts.map((podcast) => (
          <PodcastsItem podcast={podcast} key={podcast.slug} />
        ))}
      </ul>
    </section>
  );
}
