import Image from "next/image";

import appleIcon from "@/public/icons/apple.svg";
import podimoIcon from "@/public/icons/podimo.svg";
import spotifyIcon from "@/public/icons/spotify.svg";

import styles from "./HeaderDescriptionLinks.module.scss";
import { Links } from "@/types";

type HeaderDescriptionLinksProps = {
  links: Links;
};

export default function HeaderDescriptionLinks({
  links,
}: HeaderDescriptionLinksProps) {
  return (
    <ul className={styles.links}>
      <li className={`${styles.links__item} ${styles["links__item--apple"]}`}>
        <a
          href={links.apple}
          target="_blank"
          className={styles.links__item__link}
        >
          <Image
            src={appleIcon}
            alt="Apple Podcasts"
            className={styles.links__item__link__image}
          />
        </a>
      </li>

      <li className={`${styles.links__item} ${styles["links__item--podimo"]}`}>
        <a
          href={links.podimo}
          target="_blank"
          className={styles.links__item__link}
        >
          <Image
            src={podimoIcon}
            alt="Podimo"
            className={styles.links__item__link__image}
          />
        </a>
      </li>

      <li className={`${styles.links__item} ${styles["links__item--spotify"]}`}>
        <a
          href={links.spotify}
          target="_blank"
          className={styles.links__item__link}
        >
          <Image
            src={spotifyIcon}
            alt="Spotify"
            className={styles.links__item__link__image}
          />
        </a>
      </li>
    </ul>
  );
}
