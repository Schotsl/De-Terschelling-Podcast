import Link from "next/link";

import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@/types";

import styles from "./Breadcrumb.module.scss";

export default function HeaderBreadcrumb({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav className={styles.breadcrumb}>
      <ul className={styles.breadcrumb__list}>
        <li className={styles.breadcrumb__list__item} key="/">
          <Link className={styles.breadcrumb__list__item__link} href="/">
            <FontAwesomeIcon
              icon={faHome}
              size={"sm"}
              className={styles.breadcrumb__list__item__link__home}
            />
          </Link>
        </li>

        <li className={styles.breadcrumb__list__item} key="separator">
          <FontAwesomeIcon
            icon={faChevronRight}
            className={styles.breadcrumb__list__item__chevron}
          />
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <>
            <li className={styles.breadcrumb__list__item} key={breadcrumb.href}>
              <Link
                href={breadcrumb.href}
                className={styles.breadcrumb__list__item__link}
              >
                {breadcrumb.title}
              </Link>
            </li>

            {index !== breadcrumbs.length - 1 && (
              <li
                key={`${breadcrumb.href}-seperator`}
                className={styles.breadcrumb__list__item}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={"sm"}
                  className={styles.breadcrumb__list__item__chevron}
                />
              </li>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
}
