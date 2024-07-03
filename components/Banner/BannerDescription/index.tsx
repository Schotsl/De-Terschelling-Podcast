import styles from "./BannerDescription.module.scss";

type BannerDescriptionProps = {
  description: string;
};

export default function BannerDescription({
  description,
}: BannerDescriptionProps) {
  return <p className={styles.description}>{description}</p>;
}
