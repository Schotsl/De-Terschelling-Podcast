import styles from "./HeaderDescription.module.scss";

type HeaderDescriptionProps = {
  description: string;
};

export default function HeaderDescription({
  description,
}: HeaderDescriptionProps) {
  return <p className={styles.description}>{description}</p>;
}
