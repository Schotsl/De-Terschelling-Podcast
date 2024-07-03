import styles from "./HeaderTitle.module.scss";

type HeaderTitleProps = {
  title: string;
};

export default function HeaderTitle({ title }: HeaderTitleProps) {
  return <h1 className={styles.title}>{title}</h1>;
}
