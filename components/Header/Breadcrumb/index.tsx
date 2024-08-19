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
          <Link
            href="/"
            aria-label="Home"
            className={styles.breadcrumb__list__item__link}
          >
            <FontAwesomeIcon
              icon={faHome}
              size={"sm"}
              className={styles.breadcrumb__list__item__link__home}
            />
          </Link>

          <FontAwesomeIcon
            icon={faChevronRight}
            className={styles.breadcrumb__list__item__chevron}
          />
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li className={styles.breadcrumb__list__item} key={breadcrumb.href}>
            <Link
              href={breadcrumb.href}
              aria-label={breadcrumb.title}
              className={styles.breadcrumb__list__item__link}
            >
              {breadcrumb.title}
            </Link>

            {index !== breadcrumbs.length - 1 && (
              <FontAwesomeIcon
                icon={faChevronRight}
                size={"sm"}
                className={styles.breadcrumb__list__item__chevron}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
