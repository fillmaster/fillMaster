import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { FillOnBar } from '../App';
import '../App.css';
import { BeatsPerBar } from '../consts/beatsPerBar';
import { MeasureDivision } from '../consts/measureDivisions';
import useLocalStorage from '../hooks/useLocalStorage';
import assertUnreachable from '../utils/assertUnreachable';
import PatternMaker, { DEFAULT_TIME_SIGNATURE } from '../utils/classes/patternMaker';
import getStringArrayBetweenTwoValues from '../utils/getArrayBetweenValues';
import MetronomeContainer from './MetronomeContainer';
import QuickRandomiser from './QuickRandomiser';
import SetupStep from './StepSetup';

const steps = [
  {
    label: 'Choose a Tempo Range',
    description:
      "Choose the tempo range you'd like to play in and a random tempo will be chosen for you.",
  },
  {
    label: 'Now think of a drum pattern:',
    description: 'Make up a drum pattern, but you must....',
  },
  {
    label: 'When to play your drum fill:',
    description: '',
  },
  {
    label: 'Drum fill style',
  },
  {
    label: 'Your tempo!',
    description: "Now we'll choose you a tempo based on your tempo range.",
  },
];

const DEFAULT_SLIDER_VALUES = [60, 120];

const VerticalLinearStepper = () => {
  const patternMaker = PatternMaker.getInstance();
  const [activeStep, setActiveStep] = useState(0);
  const [beatIdea, setBeatIdea] = useState('');
  const [fillStart, setFillStart] = useState('');
  const [fill, setFill] = useState('');
  const [tempo, setTempo] = useState('');
  const [key, setKey] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const fillOnBar = useContext(FillOnBar);
  const currentBarOfLoop = () =>
    // loops from 1 to fillOnBar (e.g. 1, 2, 3, 4, 1, 2, 3, 4)
    currentBar % fillOnBar === 0 ? fillOnBar : currentBar % fillOnBar;

  const [sliderValues, setSliderValues] = useLocalStorage('sliderValues', DEFAULT_SLIDER_VALUES);
  const [{ beats: timeSignatureTop, division: timeSignatureBottom }, setTimeSignature] =
    useLocalStorage('timeSignature', patternMaker.getSettings().timeSignature);

  const handleSetCurrentBar = (bar: number) => {
    setCurrentBar(bar);
  };

  const handleSetTimeSignatureTop = (beats: BeatsPerBar) => {
    setTimeSignature(({ division }) => ({
      beats,
      division,
    }));
  };

  const handleSetTimeSignatureBottom = (division: MeasureDivision) => {
    setTimeSignature(({ beats }) => ({
      beats,
      division,
    }));
  };

  const tempoOptions = () => getStringArrayBetweenTwoValues(sliderValues[0], sliderValues[1]);

  const handleSetSliderValues = (values: Array<number>) => {
    setSliderValues(values);
  };

  const restartMetronome = () => {
    setKey(key + 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSetBeatIdea = (beat: string) => {
    setBeatIdea(beat);
  };

  const handleSetFillStart = (start: string) => {
    setFillStart(start);
  };
  const handleSetFill = (_fill: string) => {
    setFill(_fill);
  };

  const handleSetTempo = (_tempo: string) => {
    setTempo(_tempo);
  };

  const handleResetApp = () => {
    setActiveStep(0);
    restartMetronome();
    togglePanel('panel1');
  };

  useEffect(() => {
    const handleResetSettings = () => {
      patternMaker.resetTimeSignature();
      setSliderValues(DEFAULT_SLIDER_VALUES);
      setTimeSignature(DEFAULT_TIME_SIGNATURE);
    };
    window.addEventListener('resetSettings', handleResetSettings);

    return () => window.removeEventListener('rsetSettings', handleResetSettings);
  }, [patternMaker]);

  useEffect(() => {
    restartMetronome();
  }, [timeSignatureTop]);

  // in development: change default to 'panel2' when testing
  // changes to 'panel2' to avoid having to step through.
  const [activePanel, setActivePanel] = useState('panel1');

  type Panel = 'panel1' | 'panel2';
  const togglePanel = (panel: Panel) => {
    switch (panel) {
      case 'panel1':
        return setActivePanel('panel1');
      case 'panel2':
        return setActivePanel('panel2');
      default:
        return assertUnreachable(panel);
    }
  };

  useEffect(() => {
    if (activeStep === steps.length) togglePanel('panel2');
  }, [activeStep]);

  return (
    <>
      {/* PANEL 1: STEP MENU */}
      <div className={activePanel === 'panel1' ? 'panel1 show' : 'panel1 hide'} id="panel1">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <SetupStep
                  index={index}
                  handleSetBeatIdea={handleSetBeatIdea}
                  handleSetFillStart={handleSetFillStart}
                  handleSetFill={handleSetFill}
                  handleSetTempo={handleSetTempo}
                  handleSetSliderValues={handleSetSliderValues}
                  sliderValues={sliderValues}
                  patternMaker={patternMaker}
                />
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? 'Start' : 'Next'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
      {/* PANEL 2: METRONOME */}
      <div className={activePanel === 'panel2' ? 'panel2 show' : 'panel2 hide'} id="panel2">
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <QuickRandomiser
                beatIdea={beatIdea}
                fillStart={fillStart}
                fill={fill}
                tempo={tempo}
                setBeatIdea={handleSetBeatIdea}
                setFillStart={handleSetFillStart}
                setFill={handleSetFill}
                setTempo={handleSetTempo}
                tempoOptions={tempoOptions}
                timeSignatureTop={timeSignatureTop}
              />
            </Grid>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                paddingLeft: '70vw',
              }}
            >
              <span>Bar:&nbsp;</span>
              <span>{currentBar > 0 ? `${currentBarOfLoop()} (${currentBar})` : ' '}</span>
            </Box>
          </Grid>
          <MetronomeContainer
            tempo={tempo}
            fillStart={fillStart}
            key={key}
            restartMetronome={restartMetronome}
            patternMaker={patternMaker}
            timeSignatureBottom={timeSignatureBottom}
            timeSignatureTop={timeSignatureTop}
            setTimeSignatureTop={handleSetTimeSignatureTop}
            setTimeSignatureBottom={handleSetTimeSignatureBottom}
            handleSetCurrentBar={handleSetCurrentBar}
          />
        </Paper>
        <Button onClick={handleResetApp} sx={{ mt: 10, left: '60%' }}>
          START OVER
        </Button>
      </div>
    </>
  );
};

export default VerticalLinearStepper;
