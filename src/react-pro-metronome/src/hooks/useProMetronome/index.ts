import { Howl } from 'howler';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import click3SoundFileAAC from '../../sounds/click3.aac';
import click3SoundFileMP3 from '../../sounds/click3.mp3';
import click3SoundFileOGG from '../../sounds/click3.ogg';

import click2SoundFileAAC from '../../sounds/click2.aac';
import click2SoundFileMP3 from '../../sounds/click2.mp3';
import click2SoundFileOGG from '../../sounds/click2.ogg';

import click1SoundFileAAC from '../../sounds/click1.aac';
import click1SoundFileMP3 from '../../sounds/click1.mp3';
import click1SoundFileOGG from '../../sounds/click1.ogg';

export type ProMetronome = {
  bpm: number;
  subdivision: number;
  isPlaying: boolean;
  soundEnabled: boolean;
  beatsPerBar: number;
  soundPattern: string;
};

const clickSounds = [
  new Howl({
    src: [click1SoundFileMP3, click1SoundFileOGG, click1SoundFileAAC],
    preload: true,
  }),
  new Howl({
    src: [click2SoundFileMP3, click2SoundFileOGG, click2SoundFileAAC],
    preload: true,
  }),
  new Howl({
    src: [click3SoundFileMP3, click3SoundFileOGG, click3SoundFileAAC],
    preload: true,
  }),
];

export default function useProMetronome({
  bpm,
  subdivision,
  isPlaying,
  beatsPerBar,
  soundEnabled,
  soundPattern,
}: ProMetronome) {
  const [currentBeat, setCurrentBeat] = useState(1);
  const [currentSubBeat, setCurrentSubBeat] = useState(1);
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();

  const update = useCallback(() => {
    if (soundEnabled && soundPattern.length === beatsPerBar * subdivision) {
      const soundLevel = +soundPattern.charAt((currentBeat - 1) * subdivision + currentSubBeat - 1);

      if (soundLevel > 0 && soundLevel <= 3) {
        clickSounds[soundLevel - 1].play();
      }
    }

    if (currentSubBeat < subdivision) {
      setCurrentSubBeat((prevState) => prevState + 1);
    } else {
      setCurrentSubBeat(1);
      setCurrentBeat((prevState) => (prevState === beatsPerBar ? 1 : prevState + 1));
    }
  }, [soundEnabled, soundPattern, subdivision, currentSubBeat, currentBeat]);

  const intervalDuration = useMemo(
    () => Math.floor(60000 / (bpm * subdivision)),
    [bpm, subdivision]
  );

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(update, intervalDuration);
    }

    return () => clearInterval(intervalId.current);
  }, [isPlaying, update, intervalDuration]);

  return { currentBeat, currentSubBeat };
}
