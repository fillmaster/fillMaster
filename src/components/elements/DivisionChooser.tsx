import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { PlayNotes } from '../../utils/classes/patternMaker';

interface DivisionChooserProps {
  handleSetNoteDivision: (division: PlayNotes) => void;
  noteDivision: string;
}

const DivisionChooser = ({ handleSetNoteDivision, noteDivision }: DivisionChooserProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="note-division-button"
        aria-controls={open ? 'note-division-options' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {noteDivision === 'firstNoteOnly' && 'o'}
        {noteDivision === 'quarterNotes' && '♩'}
        {noteDivision === 'eighthNotes' && '♫'}
        {noteDivision === 'sixteenthNotes' && '♬♬'}
      </Button>
      <Menu
        id="note-division-options"
        aria-labelledby="note-division-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            handleSetNoteDivision('firstNoteOnly');
            handleClose();
          }}
        >
          o First Note of the bar only
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetNoteDivision('quarterNotes');
            handleClose();
          }}
        >
          ♩ Quarter Notes
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetNoteDivision('eighthNotes');
            handleClose();
          }}
        >
          ♫ Eighth Notes
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetNoteDivision('sixteenthNotes');
            handleClose();
          }}
        >
          ♬♬ 16th notes
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DivisionChooser;
