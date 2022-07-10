import { forTestingPurposesOnly } from '../../src/components/Randomiser';

const { flickThroughArray, flickSlowDown, predictLastFlick } = forTestingPurposesOnly;

const sleepFunc = jest.fn(() => Promise.resolve());

describe('flickSlowDown', () => {
  it('should return values that get exponitally bigger', () => {
    const duration = 900;
    const pauseDurations = [30];

    let timeTaken = 0;
    let overThreshold = false;
    let gettingBigger = false;

    while (timeTaken < duration) {
      pauseDurations.push(
        flickSlowDown(pauseDurations[pauseDurations.length - 1], timeTaken, duration)
      );
      timeTaken += pauseDurations[pauseDurations.length - 1];
      if (pauseDurations[pauseDurations.length - 1] > pauseDurations[pauseDurations.length - 2]) {
        if (overThreshold) {
          gettingBigger = true;
        } else overThreshold = true;
      } else if (overThreshold) {
        gettingBigger = false;
        break;
      }
    }
    expect(gettingBigger && overThreshold).toBe(true);
  });
});

describe('flickThroughArray', () => {
  it('should only return values inside the array', async () => {
    const array = [1, 2, 3, 4, 5];
    const duration = 200;
    const pauseDuration = 10;
    const callback = jest.fn();

    const result = await flickThroughArray(array, { duration, pauseDuration, callback, sleepFunc });
    expect(array).toContain(result);
    expect(callback).toBeCalled();
  });
  it('should only call the callback with values from the array', async () => {
    const array = [1, 2, 3, 4, 5];
    const duration = 2000;
    const pauseDuration = 10;
    const callback = jest.fn<void, [number]>();

    await flickThroughArray(array, { duration, pauseDuration, callback, sleepFunc });

    expect(callback.mock.calls.reduce((acc, args) => array.includes(args[0]) && acc, true)).toBe(
      true
    );
    expect(callback).toBeCalled();
  });

  it('should return the value the last callback recieved', async () => {
    const array = [1, 2, 3, 4, 5];
    const duration = 2000;
    const pauseDuration = 10;
    const callback = jest.fn<void, [number]>();

    const result = await flickThroughArray(array, { duration, pauseDuration, callback, sleepFunc });
    expect(callback).toBeCalled();
    expect(result).toBe(callback.mock.lastCall[0]);
  });

  it('should throw an error if pauseDuration is 0', async () => {
    const array = [1, 2, 3, 4, 5];
    const duration = 200;
    const pauseDuration = 0;
    const callback = jest.fn();

    const promise = flickThroughArray(array, { duration, pauseDuration, callback, sleepFunc });
    expect(promise).rejects.toThrow();
    expect(callback).toBeCalledTimes(0);
  });
});

describe('predictLastFlick', () => {
  it('should return the last flick of flickThroughArray', async () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const duration = 200;
    const pauseDuration = 10;
    const callback = jest.fn();

    const result = await predictLastFlick(array, { duration, pauseDuration });
    const flickResult = await flickThroughArray(array, {
      duration,
      pauseDuration,
      callback,
      sleepFunc,
    });

    expect(result).toEqual(flickResult);
    expect(callback).toBeCalled();
    expect(callback.mock.lastCall[0]).toEqual(flickResult);
  });
});
