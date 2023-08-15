import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import styles from './NavLink.module.scss'

type NavLinkProps = {
  href: string,
  content: string,
}

const NavLink: React.FC<NavLinkProps> = ({href, content}) => {
  return (
    <RouterLink to={href} className={styles.link}>{content}</RouterLink>
  );
};

export default NavLink;