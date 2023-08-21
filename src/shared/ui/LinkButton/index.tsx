import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LinkButton.module.scss';

interface Props {
  href: string;
  children?: React.ReactNode;
}

export const LinkButton = (props: Props) => {
  const { href, children } = props;

  return (
    <NavLink to={href} className={styles.linkButton}>
      {children}
    </NavLink>
  );
};
