import { Podcast } from "@/types";

import Image from "../Image";

import styles from "./Podcasts.module.scss";

export default function Podcasts({ podcasts }: { podcasts: Podcast[] }) {
  return (
    <ul className={styles.podcasts}>
      {podcasts.map((podcast) => (
        <li className={styles.podcast} key={podcast.slug}>
          <a className={styles.podcast__link} href={`/podcast/${podcast.slug}`}>
            <Image
              image={podcast.image}
              sizes="100vw"
              className={podcast.podcast__link__image}
            />

            <h2 className={styles.podcast__link__image__title}>
              {podcast.title}
            </h2>

            <p className={styles.podcast__link__image__description}>
              {podcast.description}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
