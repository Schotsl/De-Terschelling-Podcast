"use client";

import styles from "./Image.module.scss";

import NextImage from "next/image";

import { Image as ImageType } from "@/types";
import { useState } from "react";

type ImageProps = {
  image: ImageType;
  sizes: string;
  quality?: number;
  priority?: boolean;
  className?: string;
};

export default function Image({
  image: { src, alt, blur, width, height },
  sizes,
  quality = 75,
  priority = false,
  className,
}: ImageProps) {
  const [loading, setLoading] = useState(true);

  function onLoad() {
    setLoading(false);
  }

  return (
    <div
      style={{ aspectRatio: `${width}/${height}` }}
      className={`${styles.image} ${className}`}
    >
      <NextImage
        src={src}
        alt={alt}
        sizes={sizes}
        width={width}
        height={height}
        onLoad={onLoad}
        quality={quality}
        priority={priority}
        className={styles.image__image}
      />

      {loading && (
        <div className={styles.image__overlay}>
          <div className={styles.image__overlay__image}>
            {/* eslint-disable-next-line */}
            <img
              src={`data:image/svg+xml;base64,${blur}`}
              alt={alt}
              className={styles.image__overlay__image__blur}
            />
          </div>

          <div className={styles.image__overlay__skeleton}></div>
        </div>
      )}
    </div>
  );
}
