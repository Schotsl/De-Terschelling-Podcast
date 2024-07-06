import { Image as ImageType, Links } from "@/types";

import Image from "@/components/Image";
import HeaderImage from "./HeaderImage";

import styles from "./Header.module.scss";
import HeaderTitle from "./HeaderTitle";
import HeaderDescription from "./HeaderDescription";

type HeaderProps = {
  title: string;
  links: Links;
  image: ImageType;
  banner: ImageType;
  description: string;
};

export default function Header({
  title,
  links,
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
        <HeaderDescription links={links} description={description} />
      </div>

      <div className={styles.banner__footer}></div>
    </header>
  );
}
