import { Image as ImageType } from "@/types";

import Image from "@/components/Image";
import BannerImage from "./BannerImage";

import styles from "./Banner.module.scss";
import BannerTitle from "./BannerTitle";
import BannerDescription from "./BannerDescription";

type BannerProps = {
  title: string;
  image: ImageType;
  banner: ImageType;
  description: string;
};

export default function Banner({
  title,
  image,
  banner,
  description,
}: BannerProps) {
  return (
    <header className={styles.banner}>
      <BannerImage image={image} />
      <BannerTitle title={title} />
      <BannerDescription description={description} />

      <Image image={banner} sizes="100vw" className={styles.banner__image} />
    </header>
  );
}
