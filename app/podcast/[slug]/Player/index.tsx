import { Podcast } from "@/types";

import styles from "./PodcastPagePlayer.module.scss";

type PodcastPagePlayerProps = {
  podcast: Podcast;
};

export default function PodcastPagePlayer({ podcast }: PodcastPagePlayerProps) {
  const { spotify } = podcast;

  return (
    <section className={styles.podcasts}>
      <h2 className={styles.podcasts__title}>Luister naar deze aflevering</h2>

      {spotify ? (
        <iframe
          src={`https://open.spotify.com/embed/episode/${spotify}?utm_source=generator`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className={styles.podcasts__embed}
          allowFullScreen
        ></iframe>
      ) : (
        <p className={styles.podcasts__warning}>
          De streamingplatformen zijn de aflevering nog aan het verwerken. Zodra
          de aflevering beschikbaar is, kun je deze hier of op andere platformen
          beluisteren!
        </p>
      )}
    </section>
  );
}
