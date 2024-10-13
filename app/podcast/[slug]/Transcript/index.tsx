import React from "react";

import styles from "./PodcastTranscript.module.scss";

type PodcastPagePlayerProps = {
  transcript: string;
};

export default function PodcastPageTranscript({
  transcript,
}: PodcastPagePlayerProps) {
  const transcriptLines = transcript.split("\n\n");
  const transcriptMapped = transcriptLines.map((line) => {
    const [name, content] = line.split(":");
    return { name, content };
  });

  return (
    <section className={styles.transcript}>
      <h2 className={styles.transcript__title}>Transcript</h2>

      <ul className={styles.transcript__content}>
        {transcriptMapped.map((line, index) => (
          <li className={styles.transcript__content__line} key={index}>
            <div className={styles.transcript__content__line__speaker}>
              {line.name}:
            </div>

            <div
              className={styles.transcript__content__line__content}
              dangerouslySetInnerHTML={{ __html: line.content }}
            ></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
