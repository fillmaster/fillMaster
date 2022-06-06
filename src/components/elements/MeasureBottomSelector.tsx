import { MeasureDivision } from '../../utils/classes/patternMaker';
import Selector from './Selector';

type MeasureBottomSelectorItem = {
  name: string; // Name to display on menu drop down.
  default: boolean;
  previewName?: string; // Name to display on button. Defaults to name.
  stateName: MeasureDivision; // name of state, handled where function was called from. Defaults to name.
};
type MeasureBottomSelectorItems = MeasureBottomSelectorItem[];

interface MeasureBottomSelectorProps {
  selectorItems: MeasureBottomSelectorItems;
  handleSetItem: (param: string) => void;
}

const MeasureBottomSelector = ({ selectorItems, handleSetItem }: MeasureBottomSelectorProps) => {
  return <Selector selectorItems={selectorItems} handleSetItem={handleSetItem} />;
};

export default MeasureBottomSelector;
