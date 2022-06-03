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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDefault = () => getDefaultAndSelectedIndexes(selectorItems).default;
  const offset = getTransformVerticalOffset(getDefault(), HEIGHT);

  return (
    <div>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectorItems[getDefault()].name}
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
              <MenuItem key={item.name} onClick={handleClose}>
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
  const PADDING = 8;
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
