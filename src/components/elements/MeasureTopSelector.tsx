import { BeatsPerBar } from '../../consts/beatsPerBar';
import Selector from './Selector';

type MeasureTopSelectorItem = {
  name: BeatsPerBar; // Name to display on menu drop down.
  default: boolean;
  stateName: BeatsPerBar; // name of state, handled where function was called from. Defaults to name.
  selected: boolean;
};
export type MeasureTopSelectorItems = MeasureTopSelectorItem[];

interface MeasureTopSelectorProps {
  selectorItems: MeasureTopSelectorItems;
  handleSetItem: (param: BeatsPerBar) => void;
  disabled: boolean;
}

const MeasureTopSelector = ({
  selectorItems,
  handleSetItem,
  disabled,
}: MeasureTopSelectorProps) => {
  return (
    <Selector selectorItems={selectorItems} handleSetItem={handleSetItem} disabled={disabled} />
  );
};

export default MeasureTopSelector;
