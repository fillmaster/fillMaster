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
