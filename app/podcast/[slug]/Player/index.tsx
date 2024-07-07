import { Podcast } from "@/types";

import styles from "./PodcastPagePlayer.module.scss";

type PodcastPagePlayerProps = {
  podcast: Podcast;
};

export default function PodcastPagePlayer({ podcast }: PodcastPagePlayerProps) {
  return (
    <section className={styles.podcasts}>
      <h2 className={styles.podcasts__title}>Luister naar deze aflevering</h2>

      <iframe
        src="https://open.spotify.com/embed/episode/6MPG51wgG2M9I9ybTEXlLE?utm_source=generator"
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={styles.podcasts__embed}
        allowFullScreen
      ></iframe>
    </section>
  );
}
