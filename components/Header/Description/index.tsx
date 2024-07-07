import { Links, Podcast } from "@/types";
import styles from "./HeaderDescription.module.scss";

import Info from "@/components/Info";
import HeaderDescriptionLink from "./Links";

type HeaderDescriptionProps = {
  links: Links;
  podcast?: Podcast;
  podcasts?: Podcast[];
  description: string;
};

export default function HeaderDescription({
  links,
  podcast,
  podcasts,
  description,
}: HeaderDescriptionProps) {
  return (
    <div className={styles.description}>
      <p className={styles.description__content}>{description}</p>

      <Info podcast={podcast} podcasts={podcasts} />

      <HeaderDescriptionLink links={links} />
    </div>
  );
}
