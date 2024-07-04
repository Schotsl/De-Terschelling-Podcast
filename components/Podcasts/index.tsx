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

            <div className={styles.podcasts__podcast__link__content}>
              <h2 className={styles.podcasts__podcast__link__content__title}>
                {podcast.episode}. {podcast.title}
              </h2>

              <p
                className={styles.podcasts__podcast__link__content__description}
              >
                {podcast.description}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
