import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import '../App.css';
import PatternMaker from '../utils/classes/patternMaker';
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

const VerticalLinearStepper = () => {
  const patternMaker = PatternMaker.getInstance();
  const [activeStep, setActiveStep] = useState(0);
  const [beatIdea, setBeatIdea] = useState('');
  const [fillStart, setFillStart] = useState('');
  const [fill, setFill] = useState('');
  const [tempo, setTempo] = useState('');
  const [key, setKey] = useState(0);
  const [sliderValues, setSliderValues] = useState<number[]>([60, 120]);
  const [timeSignatureTop, setTimeSignatureTop] = useState(
    patternMaker.getSettings().timeSignature.beats as string
  );
  const [timeSignatureBottom, setTimeSignatureBottom] = useState(
    patternMaker.getSettings().timeSignature.division as string
  );

  const handleSetTimeSignatureTop = (beats: string) => {
    setTimeSignatureTop(beats);
  };

  const handleSetTimeSignatureBottom = (division: string) => {
    setTimeSignatureBottom(division);
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
    togglePanel();
  };

  // in development: change default to 'panel2' when testing
  // changes to 'panel2' to avoid having to step through.
  const [activePanel, setActivePanel] = useState('panel1');

  const togglePanel = () => {
    if (activePanel === 'panel1') {
      setActivePanel('panel2');
    } else {
      setActivePanel('panel1');
    }
  };

  useEffect(() => {
    if (activeStep === steps.length) togglePanel();
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
            <Grid item xs={8}>
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
            <Grid item xs={4}>
              <Button onClick={handleResetApp} sx={{ mt: 1, mr: 1 }}>
                START OVER
              </Button>
            </Grid>
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
          />
        </Paper>
      </div>
    </>
  );
};

export default VerticalLinearStepper;
