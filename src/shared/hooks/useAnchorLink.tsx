import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useAnchorLink(): void {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
}

export default useAnchorLink;
