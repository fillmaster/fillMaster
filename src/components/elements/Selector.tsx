import { useState, MouseEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';

/**
 * This component is a wrapper for MuiMenu to make it have the default
 * item centered (vertically on top of the button). It also adds some styling based and includes fonts to read
 * the musical unicode values.
 */
const HEIGHT = 20;
const WIDTH = '2rem';

export type SelectorItem = {
  name: string; // Name to display on menu drop down.
  default: boolean;
  previewName?: string; // Name to display on button. Defaults to name.
  stateName: string; // name of state, handled where function was called from. Defaults to name.
  selected: boolean;
};

// must combine SelectorItemBasic and SelectorItemWithPreview and not use an array
// of SelectorItem to assure only one or other is used.
export type SelectorItems = SelectorItem[];

interface SelectorProps {
  selectorItems: SelectorItems;
  handleSetItem: (param: string) => void;
}

const Selector = ({ selectorItems, handleSetItem }: SelectorProps) => {
  const getDefault = () => getDefaultAndSelectedIndexes(selectorItems).default;
  const getSelected = () => getDefaultAndSelectedIndexes(selectorItems).selected;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptionName, setSelectedOptionName] = useState(selectorItems[getSelected()].name);
  const selectedOption = getSelectorObjectByName(selectorItems, selectedOptionName);

  useEffect(() => {
    handleSetItem(selectedOption.stateName);
  }, [selectedOptionName]);

  const open = Boolean(anchorEl);
  const handleClickButton = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = (event: MouseEvent<HTMLElement>) => {
    const { myValue } = event.currentTarget.dataset;
    if (myValue !== undefined) setSelectedOptionName(myValue);
    handleClose();
  };

  const offset = getTransformVerticalOffset(getDefault(), HEIGHT);

  return (
    <div>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickButton}
        sx={{
          outline: '1px solid',
          height: HEIGHT,
          width: WIDTH,
          minWidth: WIDTH,
          fontFamily: selectedOption.previewName ? 'Noto Music' : 'inherit',
        }}
      >
        {selectedOption.previewName ? selectedOption.previewName : selectedOption.name}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: offset,
          horizontal: 'center',
        }}
        sx={{
          '& li': {
            minHeight: 'auto', // needed to remove size change on < 600px screen width
          },
        }}
        TransitionComponent={Zoom}
        transitionDuration={{ appear: 10, enter: 200, exit: 400 }}
      >
        <Box
          sx={{
            '& *': {
              height: HEIGHT,
            },
          }}
        >
          {selectorItems.map((item) => {
            return (
              <MenuItem
                key={item.name}
                data-my-value={item.name}
                onClick={handleClickMenuItem}
                sx={{
                  justifyContent: 'center',
                  outline: item.default ? '1px solid hsl(200, 30%, 60%)' : 'none',
                  backgroundColor:
                    item.name === selectedOptionName ? 'hsla(230, 30%, 40%, 0.23)' : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      item.name === selectedOptionName
                        ? 'hsla(230, 30%, 40%, 0.3)'
                        : 'hsla(230, 30%, 40%, 0.07)',
                  },
                }}
              >
                {item.previewName && (
                  <text style={{ fontFamily: 'Noto Music' }}>{item.previewName}&nbsp;&nbsp;</text>
                )}
                {item.name}
              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </div>
  );
};

export default Selector;

function getSelectorObjectByName(selectorItems: SelectorItems, name: string) {
  for (let i = 0; i < selectorItems.length; i++) {
    if (selectorItems[i].name === name) {
      return selectorItems[i];
    }
  }
  throw new Error('No matching name found in SelectorItems');
}

function getTransformVerticalOffset(defaultIndex: number, height: number) {
  const PADDING = 8; // padding must match what is set by Mui, overriding padding of the menu
  // can cause issues.
  const offset = defaultIndex * height + height / 2 + PADDING + PADDING / 4;
  return offset;
}

function getDefaultAndSelectedIndexes(array: SelectorItems) {
  const indexes = { default: -1, selected: -1 };
  for (let i = 0; i < array.length; i++) {
    if (array[i].default) {
      if (indexes.default !== -1)
        throw new Error('SelectorItems must only contain ONE default value.');
      indexes.default = i;
    }
    if (array[i].selected) {
      if (indexes.selected !== -1)
        throw new Error('SelectorItems must only contain ONE selected value.');
      indexes.selected = i;
    }
  }
  if (indexes.default === -1) throw new Error("SelectorItems must contain a 'default' value.");
  if (indexes.selected === -1) throw new Error("SelectorItems must contain a 'selected' value.");

  return indexes;
}
