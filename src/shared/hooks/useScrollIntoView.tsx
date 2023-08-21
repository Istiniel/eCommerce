import { RefObject, useEffect } from 'react';

function useScrollIntoView<T extends HTMLElement = HTMLElement>(ref: RefObject<T>): void {
  useEffect(() => {
    ref.current?.scrollIntoView(true);
  }, [ref]);
}

export default useScrollIntoView;
