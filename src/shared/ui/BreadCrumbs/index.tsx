import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BreadCrumbs.module.scss';
import useGetRoutes from '../../hooks/useGetRoutes';

const BreadCrumbs: React.FC = () => {
  const routes = useGetRoutes();

  return (
    <div className={styles.container}>
      {routes.map((route, index, array) => {
        return (
          <React.Fragment key={route.content}>
            <NavLink
              to={route.to}
              className={classNames({ [styles.disabled]: index === array.length - 1 }, styles.link)}
            >
              {route.content}
            </NavLink>
            {index !== array.length - 1 && <span className={styles.divider}> / </span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
