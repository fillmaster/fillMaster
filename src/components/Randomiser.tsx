import { useEffect, useState } from 'react';
import shuffleArray from '../utils/randomFunctions';

interface RandomAnimatorProps {
  arrayToRandomise: Array<string>;
  handleSetItem: (param: string) => void;
}

const makeRepeated = (arr: Array<string>) => {
  // increase number before / arr.length to increase random-spin time
  const divider = 50;
  if (arr.length > divider) return arr.slice(0, divider);
  return Array.from({ length: divider / arr.length }, () => arr).flat();
};

const getRandomisedArray = (arrayToRandomise: Array<string>) => {
  const randomArray = makeRepeated(shuffleArray(arrayToRandomise));
  return randomArray;
};

const Randomiser = ({ arrayToRandomise, handleSetItem }: RandomAnimatorProps) => {
  const randomArray = makeRepeated(getRandomisedArray(arrayToRandomise));
  const [randomItem, setRandomItem] = useState(randomArray[0]);

  const flickThroughArray = async () => {
    for (let i = 0; i < randomArray.length; i++) {
      const milliseconds = 30;
      setRandomItem(randomArray[i]);
      setTimeout(() => setRandomItem(randomArray[i]), milliseconds);
    }
  };
  useEffect(() => {
    flickThroughArray();
  }, []);

  return (
    <>
      {handleSetItem(randomItem)}
      {randomItem}
    </>
  );
};

export default Randomiser;
