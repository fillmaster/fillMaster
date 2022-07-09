import { useEffect, useState } from 'react';
import shuffleArray from '../utils/randomFunctions';

const DEFUALT_PAUSE_DURATION = 30;
const DEFAULT_DURATION = 1000;

interface RandomAnimatorProps {
  arrayToRandomise: Array<string>;
  duration?: number;
  pauseDuration?: number;
  handleSetItem: (param: string) => void;
}

async function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function flickThroughArray<T>(
  array: Array<T>,
  duration: number,
  pauseDuration: number,
  callback: (value: T) => void
): Promise<void> {
  let timeSpend = 0;
  for (let i = 0; i < array.length; i++) {
    // Maybe the callback becomes undefined
    // if the component unmounts before the loop is finished
    // In that case we just cancel the flicking
    if (typeof callback === 'undefined') return Promise.resolve();

    callback(array[i]);
    // eslint-disable-next-line no-await-in-loop
    await sleep(pauseDuration);
    timeSpend += pauseDuration;
    if (timeSpend >= duration) {
      return Promise.resolve();
    }
  }
  return flickThroughArray(array, duration - timeSpend, pauseDuration, callback);
}

const Randomiser = ({
  arrayToRandomise,
  duration = DEFAULT_DURATION,
  pauseDuration = DEFUALT_PAUSE_DURATION,
  handleSetItem,
}: RandomAnimatorProps) => {
  const randomArray = shuffleArray(arrayToRandomise);
  const [randomItem, setRandomItem] = useState(randomArray[0]);

  useEffect(() => {
    flickThroughArray(randomArray, duration, pauseDuration, setRandomItem);
  }, []);

  return (
    <>
      {handleSetItem(randomItem)}
      {randomItem}
    </>
  );
};

export default Randomiser;
