import { Image as ImageType } from "@/types";

import Image from "@/components/Image";
import styles from "./BannerImage.module.scss";

type BannerImageProps = {
  image: ImageType;
};

export default function BannerImage({ image }: BannerImageProps) {
  return <Image image={image} sizes="22rem" className={styles.image} />;
}
