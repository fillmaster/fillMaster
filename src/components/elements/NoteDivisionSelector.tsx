import { PlayNotes } from '../../consts/playNotes';
import Selector from './Selector';

type NoteDivisionSelectorItem = {
  name: string; // Name to display on menu drop down.
  default: boolean;
  previewName: string; // Name to display on button. Defaults to name.
  stateName: PlayNotes; // name of state, handled where function was called from. Defaults to name.
  selected: boolean;
};
export type NoteDivisionSelectorItems = NoteDivisionSelectorItem[];

interface NoteDivisionSelectorProps {
  selectorItems: NoteDivisionSelectorItems;
  handleSetItem: (param: string) => void;
  disabled: boolean;
}

const NoteDivisionSelector = ({
  selectorItems,
  handleSetItem,
  disabled,
}: NoteDivisionSelectorProps) => {
  return (
    <Selector
      selectorItems={selectorItems}
      handleSetItem={handleSetItem}
      disabled={disabled}
      centered={false}
      highlightDefault
    />
  );
};

export default NoteDivisionSelector;
