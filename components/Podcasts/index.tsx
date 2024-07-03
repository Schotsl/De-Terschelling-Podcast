import { Podcast } from "@/types";

import Image from "../Image";

import styles from "./Podcasts.module.scss";

export default function Podcasts({ podcasts }: { podcasts: Podcast[] }) {
  return (
    <ul className={styles.podcasts}>
      {podcasts.map((podcast) => (
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

            <h2 className={styles.podcasts__podcast__link__title}>
              {podcast.episode}. {podcast.title}
            </h2>

            <p className={styles.podcasts__podcast__link__description}>
              {podcast.description}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
