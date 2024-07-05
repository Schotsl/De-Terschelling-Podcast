import styles from "./HeaderDescription.module.scss";

import HeaderDescriptionLink from "./Links";

type HeaderDescriptionProps = {
  description: string;
};

export default function HeaderDescription({
  description,
}: HeaderDescriptionProps) {
  return (
    <div>
      <p className={styles.description}>{description}</p>

      <HeaderDescriptionLink />
    </div>
  );
}
