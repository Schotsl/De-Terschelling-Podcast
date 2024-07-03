import styles from "./BannerTitle.module.scss";

type BannerTitleProps = {
  title: string;
};

export default function BannerTitle({ title }: BannerTitleProps) {
  return <h1 className={styles.title}>{title}</h1>;
}
