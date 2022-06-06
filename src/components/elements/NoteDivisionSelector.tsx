import { PlayNotes } from '../../utils/classes/patternMaker';
import Selector from './Selector';

type NoteDivisionSelectorItem = {
  name: string; // Name to display on menu drop down.
  default: boolean;
  previewName: string; // Name to display on button. Defaults to name.
  stateName: PlayNotes; // name of state, handled where function was called from. Defaults to name.
};
type NoteDivisionSelectorItems = NoteDivisionSelectorItem[];

interface NoteDivisionSelectorProps {
  selectorItems: NoteDivisionSelectorItems;
  handleSetItem: (param: string) => void;
}

const NoteDivisionSelector = ({ selectorItems, handleSetItem }: NoteDivisionSelectorProps) => {
  return <Selector selectorItems={selectorItems} handleSetItem={handleSetItem} />;
};

export default NoteDivisionSelector;
