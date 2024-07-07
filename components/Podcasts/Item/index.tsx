import { Podcast } from "@/types";
import { roundNumber } from "@/helper";

import styles from "./Podcasts.module.scss";

import Info from "@/components/Info";
import Image from "@/components/Image";

type PodcastsItemProps = {
  podcast: Podcast;
};

export default function PodcastsItem({ podcast }: PodcastsItemProps) {
  return (
    <li className={styles.item} key={podcast.slug}>
      <a className={styles.item__link} href={`/podcast/${podcast.slug}`}>
        <Image
          image={podcast.image}
          sizes="100vw"
          className={styles.item__link__image}
        />

        <div className={styles.item__link__content}>
          <Info podcast={podcast} />

          <h2 className={styles.item__link__content__title}>
            {podcast.episode}. {podcast.title}
          </h2>

          <p className={styles.item__link__content__description}>
            {podcast.description}
          </p>
        </div>
      </a>
    </li>
  );
}
