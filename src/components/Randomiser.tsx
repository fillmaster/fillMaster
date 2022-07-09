import { useEffect, useState } from 'react';
import shuffleArray from '../utils/randomFunctions';

const DEFAULT_PAUSE_DURATION = 30;
const DEFAULT_DURATION = 1300;
const SLOW_DOWN_THRESHOLD_FRACTION = 0.5;
const ITERATION_SLOW_DOWN_MULTIPLIER = 70;
// Smoothes out the animation and makes the animation less step
const SLOW_DOWN_OVER_MULTIPLIER = 1.5;

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
  callback: (value: T) => void,
  startDuration?: number
): Promise<void> {
  if (pauseDuration <= 0) {
    throw new Error('pauseDuration must be greater than 0');
  }

  let slowedPauseDuration = pauseDuration;
  let timeSpend = 0;

  const actualStartDuration = startDuration ?? duration;

  for (let i = 0; i < array.length; i++) {
    const timeLeft = duration - timeSpend;
    // We don't want to overshoot
    const actualPauseDuration = Math.min(timeLeft, slowedPauseDuration);
    // the true time we already spent in the loop with recursion
    const timeSpentTotal = actualStartDuration - duration + timeSpend;

    if (timeSpend >= duration) {
      return Promise.resolve();
    }
    // eslint-disable-next-line no-await-in-loop
    await sleep(actualPauseDuration);
    // Maybe the callback becomes undefined
    // if the component unmounts before the loop is finished
    // In that case we just cancel the flicking
    if (typeof callback === 'undefined') return Promise.resolve();
    callback(array[i]);

    // Slowdown
    if (timeSpentTotal >= SLOW_DOWN_THRESHOLD_FRACTION * actualStartDuration) {
      // this is basically 1/totalTimeLeft so we get an exponential slow down
      const exponential = SLOW_DOWN_OVER_MULTIPLIER / (actualStartDuration - timeSpentTotal);
      // We use a multiplier to make these values bigger
      const addAmount = slowedPauseDuration * exponential * ITERATION_SLOW_DOWN_MULTIPLIER;

      slowedPauseDuration += addAmount;
    }

    timeSpend += actualPauseDuration;
  }
  return flickThroughArray(
    array,
    duration - timeSpend,
    slowedPauseDuration,
    callback,
    startDuration ?? duration
  );
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
