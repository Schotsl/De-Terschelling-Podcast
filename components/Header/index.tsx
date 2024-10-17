import { Image as ImageType, Links, Breadcrumb, Podcast } from "@/types";

import styles from "./Header.module.scss";

import Image from "@/components/Image";
import HeaderImage from "./Image";
import HeaderTitle from "./Title";
import HeaderBreadcrumb from "./Breadcrumb";
import HeaderDescription from "./Description";

type HeaderProps = {
  title: string;
  links: Links;
  image: ImageType;
  banner: ImageType;
  podcast?: Podcast;
  podcasts?: Podcast[];
  description: string;
  breadcrumbs: Breadcrumb[];
};

export default function Header({
  title,
  links,
  image,
  banner,
  podcast,
  podcasts,
  description,
  breadcrumbs,
}: HeaderProps) {
  return (
    <header className={styles.banner}>
      <Image
        image={banner}
        sizes="50vw"
        priority={true}
        className={styles.banner__background}
      />

      <div className={styles.banner__content}>
        <HeaderImage image={image} />
        <HeaderTitle title={title} />
        <HeaderDescription
          links={links}
          podcast={podcast}
          podcasts={podcasts}
          description={description}
        />
      </div>

      <HeaderBreadcrumb breadcrumbs={breadcrumbs} />
    </header>
  );
}
