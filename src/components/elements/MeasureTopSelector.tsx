import { BeatsPerBar } from '../../utils/classes/patternMaker';
import Selector from './Selector';

type MeasureTopSelectorItem = {
  name: BeatsPerBar; // Name to display on menu drop down.
  default: boolean;
  stateName: BeatsPerBar; // name of state, handled where function was called from. Defaults to name.
};
type MeasureTopSelectorItems = MeasureTopSelectorItem[];

interface MeasureTopSelectorProps {
  selectorItems: MeasureTopSelectorItems;
  handleSetItem: (param: string) => void;
}

const MeasureTopSelector = ({ selectorItems, handleSetItem }: MeasureTopSelectorProps) => {
  return <Selector selectorItems={selectorItems} handleSetItem={handleSetItem} />;
};

export default MeasureTopSelector;
