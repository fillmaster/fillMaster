import { useRef, useEffect } from 'react';

function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export default useFirstRender;

// const firstRender = useFirstRender();


// // for other parts of app:
// useEffect(() => {
//   if (!firstRender) {
//     console.log('not firstRender');
//   }
// }, [firstRender]);
