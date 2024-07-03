import { Image as ImageType } from "@/types";

import Image from "@/components/Image";
import HeaderImage from "./HeaderImage";

import styles from "./Header.module.scss";
import HeaderTitle from "./HeaderTitle";
import HeaderDescription from "./HeaderDescription";

type HeaderProps = {
  title: string;
  image: ImageType;
  banner: ImageType;
  description: string;
};

export default function Header({
  title,
  image,
  banner,
  description,
}: HeaderProps) {
  return (
    <header className={styles.banner}>
      <Image image={banner} sizes="100vw" className={styles.banner__image} />

      <div className={styles.banner__content}>
        <HeaderImage image={image} />
        <HeaderTitle title={title} />
        <HeaderDescription description={description} />
      </div>
    </header>
  );
}
