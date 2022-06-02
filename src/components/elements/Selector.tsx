import { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';

const HEIGHT = '30px';
const FONT_SIZE = '10px';

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

  return (
    <div>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: FONT_SIZE }}
      >
        Dashboard
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
          vertical: -500,
          horizontal: 'center',
        }}
      >
        <Box
          sx={{
            '& > *': {
              fontSize: FONT_SIZE,
              height: HEIGHT,
              minHeight: '0px', // needed to override
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

type Indexes = {
  default: number;
  selected: number;
};

function getDefaultAndSelectedIndexes(array: SelectorItems) {
  ensureNoMultipleDefaultOrSelected(array);
  const indexes: Indexes = { default: -1, selected: -1 };
  for (let i = 0; i < array.length; i++) {
    if (array[i].default) {
      indexes.default = i;
    }
    if (array[i].selected) {
      indexes.selected = i;
    }
  }
  if (indexes.default === -1) throw new Error("SelectorItems must contain a 'default' value.");
  if (indexes.selected === -1) throw new Error("SelectorItems must contain a 'selected' value.");

  return indexes;
}

function ensureNoMultipleDefaultOrSelected(array: SelectorItems) {
  let defaultCount = 0;
  let selectedCount = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].default) {
      defaultCount += 1;
    }
    if (array[i].selected) {
      selectedCount += 1;
    }
    if (defaultCount > 1) throw new Error('SelectorItems must only contain ONE default value.');
    if (selectedCount > 1) throw new Error('SelectorItems must only contain ONE selected value.');
  }
}
