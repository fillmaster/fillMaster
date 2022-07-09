import { useEffect, useState } from 'react';
import shuffleArray from '../utils/randomFunctions';

const DEFAULT_PAUSE_DURATION = 30;
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
  if (pauseDuration <= 0) {
    throw new Error('pauseDuration must be greater than 0');
  }

  let timeSpend = 0;

  for (let i = 0; i < array.length; i++) {
    if (timeSpend >= duration) {
      return Promise.resolve();
    }
    // We don't want to overshoot
    const actualPauseDuration =
      duration - timeSpend > pauseDuration ? pauseDuration : duration - timeSpend;

    // Maybe the callback becomes undefined
    // if the component unmounts before the loop is finished
    // In that case we just cancel the flicking
    if (typeof callback === 'undefined') return Promise.resolve();

    callback(array[i]);
    // eslint-disable-next-line no-await-in-loop
    await sleep(actualPauseDuration);
    timeSpend += actualPauseDuration;
  }
  return flickThroughArray(array, duration - timeSpend, pauseDuration, callback);
}

const Randomiser = ({
  arrayToRandomise,
  duration = DEFAULT_DURATION,
  pauseDuration = DEFAULT_PAUSE_DURATION,
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
