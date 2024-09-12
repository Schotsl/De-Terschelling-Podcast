"use client";

import { Podcast } from "@/types";

import styles from "./PodcastPagePlayer.module.scss";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type PodcastPagePlayerProps = {
  podcast: Podcast;
};

export default function PodcastPagePlayer({ podcast }: PodcastPagePlayerProps) {
  const { zone } = podcast.audio;
  const { status, spotify } = podcast.publishing;

  const audioCDN = process.env.NEXT_PUBLIC_CDN_ZONE!;
  const audioURL = `${audioCDN}/${zone}`;

  return (
    <section className={styles.podcasts}>
      <h2 className={styles.podcasts__title}>Luister naar deze aflevering</h2>

      {status === "archived" && (
        <div className={styles.podcasts__container}>
          <p className={styles.podcasts__container__content}>
            Deze aflevering is van de streamingplatformen gehaald omdat de
            kwaliteit niet meer voldoet aan onze standaard. Je kunt hem nog wel
            hier beluisteren!
          </p>

          <AudioPlayer
            src={audioURL}
            className={styles.podcasts__container__player}
          />
        </div>
      )}

      {status === "published" &&
        (spotify ? (
          <div className={styles.podcasts__container}>
            <iframe
              src={`https://open.spotify.com/embed/episode/${spotify}?utm_source=generator`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              title={`Luister naar ${podcast.title} op Spotify`}
              width="100%"
              height="352"
              loading="lazy"
              className={styles.podcasts__container__embed}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className={styles.podcasts__container}>
            <p className={styles.podcasts__container__content}>
              De streamingplatformen zijn de aflevering nog aan het verwerken.
              Zodra de aflevering beschikbaar is, kun je deze hier of op andere
              platformen beluisteren!
            </p>

            <AudioPlayer
              autoPlay
              src={audioUrl}
              className={styles.podcasts__container__content__player}
            />
          </div>
        ))}
    </section>
  );
}
