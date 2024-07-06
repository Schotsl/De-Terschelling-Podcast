import { Links } from "@/types";
import styles from "./HeaderDescription.module.scss";

import HeaderDescriptionLink from "./Links";

type HeaderDescriptionProps = {
  links: Links;
  description: string;
};

export default function HeaderDescription({
  links,
  description,
}: HeaderDescriptionProps) {
  return (
    <div>
      <p className={styles.description}>{description}</p>

      <HeaderDescriptionLink links={links} />
    </div>
  );
}
