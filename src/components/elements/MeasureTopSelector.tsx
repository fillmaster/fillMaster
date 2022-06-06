import { BeatsPerBar } from '../../utils/classes/patternMaker';
import Selector from './Selector';

type MeasureTopSelectorItem = {
  name: string; // Name to display on menu drop down.
  default: boolean;
  previewName?: string; // Name to display on button. Defaults to name.
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
