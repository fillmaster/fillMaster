import { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';

/**
 * This component is a wrapper for MuiMenu to make it have the default
 * item centered. It also adds some styling based on selected items and changes the
 * activation to mouse down.
 */
const HEIGHT = 20;

export type SelectorItem = {
  name: string;
  default: boolean;
  selected: boolean;
};

export type SelectorItems = SelectorItem[];

interface PositionedMenuProps {
  selectorItems: SelectorItems;
}

const PositionedMenu = ({ selectorItems }: PositionedMenuProps) => {
  const getDefault = () => getDefaultAndSelectedIndexes(selectorItems).default;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState(selectorItems[getDefault()].name);
  const open = Boolean(anchorEl);
  const handleClickButton = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = (event: MouseEvent<HTMLElement>) => {
    const { myValue } = event.currentTarget.dataset;
    if (myValue !== undefined) setSelectedOption(myValue);
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
        sx={{ outline: '1px solid', height: HEIGHT }}
      >
        {selectedOption}
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
          // '& li:hover': { backgroundColor: 'transparent' }, // maybe reintroduce hover when
          // // mui hover bug fixed, but generally irrelevant for phone use.
        }}
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
                  outline: item.default ? '1px solid hsl(200, 30%, 60%)' : 'none',
                  backgroundColor: item.selected ? 'hsla(230, 30%, 40%, 0.4)' : 'transparent',
                  '&:hover': {
                    backgroundColor: item.selected
                      ? 'hsla(230, 30%, 40%, 0.5)'
                      : 'hsla(230, 30%, 40%, 0.1)',
                  }, // maybe reintroduce hover when
                  // mui hover bug fixed, but generally irrelevant for phone use.
                }}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </div>
  );
};

export default PositionedMenu;

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
