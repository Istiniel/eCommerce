import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function useGetRoutes() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const routes = useMemo(() => {
    let pathNames = pathname.split('/').map((path, index, array) => {
      const isTranslationExists = i18n.exists(path);
      const content = isTranslationExists ? t(path) : null;
      return {
        to: `${array.slice(0, index + 1).join('/')}` || '/',
        content: content || path || 'home',
      };
    });

    const filterSet = new Set();
    pathNames = pathNames.filter((path) => {
      if (filterSet.has(path.to)) {
        return false;
      }

      filterSet.add(path.to);
      return true;
    });
    return pathNames;
  }, [i18n, pathname, t]);

  return routes;
}

export default useGetRoutes;
