import getStringArrayBetweenTwoValues from '../../utils/getArrayBetweenValues';
import { BeatsPerBar } from '../beatsPerBar';

const eAndA = ['e', '&', 'a'];

const getKickIdeas = (beatsPerBar: BeatsPerBar) => {
  const beatsArray = getStringArrayBetweenTwoValues(1, Number(beatsPerBar));
  const kickIdeas: string[] = [];
  for (let i = 0; i < beatsArray.length; i++) {
    eAndA.forEach((c) => kickIdeas.push(`Add a kick on the '${c}' of ${beatsArray[i]}`));
  }
  return kickIdeas;
};

const beatIdeas = (beatsPerBar: BeatsPerBar) => {
  return getKickIdeas(beatsPerBar);
};

export default beatIdeas;
