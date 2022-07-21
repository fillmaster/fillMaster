import { useEffect, useState } from 'react';
import shuffleArray from '../utils/randomFunctions';

const DEFAULT_PAUSE_DURATION = 18;
const DEFAULT_DURATION = 1000;
const SLOW_DOWN_THRESHOLD_FRACTION = 0.4;
const ITERATION_SLOW_DOWN_MULTIPLIER = 60;
// Smooths out the animation and makes the animation less step
const SLOW_DOWN_OVER_MULTIPLIER = 1.4;

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

function flickSlowDown(curPauseDuration: number, timeSpentTotal: number, startDuration: number) {
  if (curPauseDuration < 0) {
    throw new Error('curPauseDuration should be positive');
  }
  // Slowdown
  if (timeSpentTotal >= SLOW_DOWN_THRESHOLD_FRACTION * startDuration) {
    // this is basically 1/totalTimeLeft so we get an exponential slow down
    const exponential = SLOW_DOWN_OVER_MULTIPLIER / (startDuration - timeSpentTotal);
    // We use a multiplier to make these values bigger
    const addAmount = curPauseDuration * exponential * ITERATION_SLOW_DOWN_MULTIPLIER;

    return curPauseDuration + addAmount;
  }
  return curPauseDuration;
}

type PredictLastFlickOptions<T> = Omit<FlickThroughOptions<T>, 'callback' | 'sleepFunc'>;

async function predictLastFlick<T>(
  array: Array<T>,
  { duration, pauseDuration }: PredictLastFlickOptions<T>
) {
  return flickThroughArray(array, {
    duration,
    pauseDuration,
    sleepFunc: () => Promise.resolve(),
    callback: () => {},
  });
}

interface FlickThroughOptions<T> {
  duration: number;
  pauseDuration: number;
  callback: (value: T) => void;
  sleepFunc?: (ms: number) => Promise<unknown>;
}

async function flickThroughArray<T>(
  array: Array<T>,
  { duration, pauseDuration, callback, sleepFunc = sleep }: FlickThroughOptions<T>
): Promise<T> {
  if (pauseDuration <= 0) {
    throw new Error('pauseDuration must be greater than 0');
  }

  let slowedPauseDuration = pauseDuration;
  let timeSpend = 0;
  let i = 0;

  while (timeSpend < duration) {
    if (i >= array.length) {
      i = 0;
    }
    const timeLeft = duration - timeSpend;
    // We don't want to overshoot
    const actualPauseDuration = Math.min(timeLeft, slowedPauseDuration);
    // the true time we already spent in the loop with recursion
    const timeSpentTotal = duration - duration + timeSpend;

    slowedPauseDuration = flickSlowDown(slowedPauseDuration, timeSpentTotal, duration);

    // eslint-disable-next-line no-await-in-loop
    await sleepFunc(actualPauseDuration);
    // Maybe the callback becomes undefined
    // if the component unmounts before the loop is finished
    // In that case we just cancel the flicking
    if (typeof callback === 'undefined') return array[i > 0 ? i - 1 : array.length - 1];
    callback(array[i]);

    timeSpend += actualPauseDuration;
    i += 1;
  }
  return array[i - 1];
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
    let callback: ((value: string) => void) | undefined = (value: string) => {
      setRandomItem(value);
    };

    flickThroughArray(randomArray, { duration, pauseDuration, callback });
    // Should return instantly
    predictLastFlick(randomArray, { duration, pauseDuration }).then((value) => {
      handleSetItem(value);
    });

    return () => {
      callback = undefined;
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{randomItem}</>;
};

export default Randomiser;
export const forTestingPurposesOnly = {
  flickSlowDown,
  flickThroughArray,
  predictLastFlick,
};
