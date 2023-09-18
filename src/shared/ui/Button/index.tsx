import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  children: React.ReactNode;
  onClick?: (e?: React.SyntheticEvent) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  buttonType?: 'solid' | 'outlined';
  className?: string
}

const Button = (props: Props) => {
  const { children, onClick, type, buttonType, className } = props;

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={classNames(
        { [styles.solid]: buttonType === 'solid', [styles.outlined]: buttonType === 'outlined' },
        styles.button,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
