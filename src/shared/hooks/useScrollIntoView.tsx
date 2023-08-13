import { RefObject, useEffect } from 'react';

function useScrollIntoView<T extends HTMLElement = HTMLElement>(ref: RefObject<T>): void {
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });
  }, [ref]);
}

export default useScrollIntoView;
