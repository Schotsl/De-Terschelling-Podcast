import { Image as ImageType } from "@/types";

import Image from "@/components/Image";
import styles from "./HeaderImage.module.scss";

type HeaderImageProps = {
  image: ImageType;
};

export default function HeaderImage({ image }: HeaderImageProps) {
  return <Image image={image} sizes="22rem" className={styles.image} />;
}