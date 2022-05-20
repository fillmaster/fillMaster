import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import SetupStep from './StepSetup';
import MetronomeContainer from './MetronomeContainer';

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
  const [activeStep, setActiveStep] = useState(0);
  const [beatIdea, setBeatIdea] = useState('');
  const [fillStart, setFillStart] = useState('');
  const [fill, setFill] = useState('');
  const [tempo, setTempo] = useState('');
  const [render, setRender] = useState(true);
  const [sliderValues, setSliderValues] = useState<number[]>([60, 120]);

  const handleSetSliderValues = (values: Array<number>) => {
    setSliderValues(values);
  };

  const restartMetronome = () => {
    setRender(true);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
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
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <div>Drum Beat: {beatIdea}</div>
          <b>
            <div>Fill on Beat {fillStart} of bar 4</div>
          </b>
          <b>
            <div>Fill style: {fill}</div>
          </b>
          <div>@ {tempo} bpm</div>
          <MetronomeContainer
            render={render}
            restartMetronome={restartMetronome}
            tempo={tempo}
            fillStart={fillStart}
          />
          <button type="button" onClick={() => setRender(false)}>
            restart
          </button>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            START OVER
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default VerticalLinearStepper;
