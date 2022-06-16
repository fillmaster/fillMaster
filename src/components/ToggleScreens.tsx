import '../App.css';

import { useState } from 'react';
import StepMenu from './StepMenu';

const ToggleScreens = () => {
  const [activeDiv, setActiveDiv] = useState('div1');

  const toggleDiv = () => {
    // eslint-disable-next-line no-unused-expressions
    activeDiv === 'div1' ? setActiveDiv('div2') : setActiveDiv('div1');
  };

  return (
    <>
      <div className={activeDiv === 'div1' ? 'div1 show' : 'div1 hide'} id="div1">
        <StepMenu />
        <button type="button" onClick={toggleDiv}>
          {' '}
          Hide div1
        </button>
      </div>
      <div className={activeDiv === 'div2' ? 'div2 show' : 'div2 hide'} id="div2">
        Div 2
        <button type="button" onClick={toggleDiv}>
          {' '}
          Hide div2
        </button>
      </div>
    </>
  );
};

export default ToggleScreens;
