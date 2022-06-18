import getStringArrayBetweenTwoValues from '../../utils/getArrayBetweenValues';
import { BeatsPerBar } from '../beatsPerBar';

const fillStarts = (beatsPerBar: BeatsPerBar) => {
  return getStringArrayBetweenTwoValues(1, Number(beatsPerBar));
};

export default fillStarts;
