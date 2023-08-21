import React from 'react';
import styles from './NavButton.module.scss';

type NavButtonProps = {
  callback: VoidFunction;
  content: string;
};

const NavButton: React.FC<NavButtonProps> = ({ callback, content }) => {
  return (
    <button className={styles.link} onClick={callback}>
      {content}
    </button>
  );
};

export default NavButton;
