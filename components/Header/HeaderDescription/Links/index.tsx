import Image from "next/image";

import appleIcon from "@/public/icons/apple.svg";
import podimoIcon from "@/public/icons/podimo.svg";
import spotifyIcon from "@/public/icons/spotify.svg";

import styles from "./HeaderDescriptionLinks.module.scss";

export default function HeaderDescriptionLinks() {
  return (
    <ul className={styles.links}>
      <li className={`${styles.links__item} ${styles["links__item--apple"]}`}>
        <a className={styles.links__item__link} href="#">
          <Image
            src={appleIcon}
            alt="Apple Podcasts"
            className={styles.links__item__link__image}
          />
        </a>
      </li>

      <li className={`${styles.links__item} ${styles["links__item--podimo"]}`}>
        <a className={styles.links__item__link} href="#">
          <Image
            src={podimoIcon}
            alt="Podimo"
            className={styles.links__item__link__image}
          />
        </a>
      </li>

      <li className={`${styles.links__item} ${styles["links__item--spotify"]}`}>
        <a className={styles.links__item__link} href="#">
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
