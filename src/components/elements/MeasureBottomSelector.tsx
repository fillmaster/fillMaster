import { MeasureDivision } from '../../consts/measureDivisions';
import Selector from './Selector';

type MeasureBottomSelectorItem = {
  name: string; // Name to display on menu drop down.
  default: boolean;
  stateName: MeasureDivision; // name of state, handled where function was called from. Defaults to name.
  selected: boolean;
};
export type MeasureBottomSelectorItems = MeasureBottomSelectorItem[];

interface MeasureBottomSelectorProps {
  selectorItems: MeasureBottomSelectorItems;
  handleSetItem: (param: string) => void;
  disabled: boolean;
}

const MeasureBottomSelector = ({
  selectorItems,
  handleSetItem,
  disabled,
}: MeasureBottomSelectorProps) => {
  return (
    <Selector selectorItems={selectorItems} handleSetItem={handleSetItem} disabled={disabled} />
  );
};

export default MeasureBottomSelector;
