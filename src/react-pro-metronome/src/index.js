import React, { PureComponent } from 'react'
import PropTypes, { number } from 'prop-types'
import { Howl } from 'howler'

import { numberInRange, stringWithLength } from '../utils/advanced-prop-types'

import click3SoundFileMP3 from './sounds/click3.mp3'
import click3SoundFileOGG from './sounds/click3.ogg'
import click3SoundFileAAC from './sounds/click3.aac'

import click2SoundFileMP3 from './sounds/click2.mp3'
import click2SoundFileOGG from './sounds/click2.ogg'
import click2SoundFileAAC from './sounds/click2.aac'

import click1SoundFileMP3 from './sounds/click1.mp3'
import click1SoundFileOGG from './sounds/click1.ogg'
import click1SoundFileAAC from './sounds/click1.aac'

const MAXBPM = 300
const MAXSUBDIVISION = 8

class ProMetronome extends PureComponent {
  state = {
    qNote: 1,
    subNote: 1
  }

  clickSounds = [
    new Howl({
      src: [click1SoundFileMP3, click1SoundFileOGG, click1SoundFileAAC],
      preload: true
    }),
    new Howl({
      src: [click2SoundFileMP3, click2SoundFileOGG, click2SoundFileAAC],
      preload: true
    }),
    new Howl({
      src: [click3SoundFileMP3, click3SoundFileOGG, click3SoundFileAAC],
      preload: true
    })
  ]

  update = () => {
    const { soundEnabled, soundPattern, subdivision } = this.props
    const { qNote, subNote } = this.state

    if (soundEnabled && soundPattern.length === 4 * subdivision) {
      const soundLevel = soundPattern.charAt(
        (qNote - 1) * subdivision + subNote - 1
      )
      if (soundLevel > 0 && soundLevel <= 3)
        this.clickSounds[soundLevel - 1].play()
    }

    if (subNote < subdivision) {
      this.setState(prevState => ({
        subNote: prevState.subNote + 1
      }))
    } else {
      this.setState(prevState => ({
        // modification: prevState.qNote === X (Beats per Bar)
        qNote: prevState.qNote === this.props.beatsPerBar ? 1 : prevState.qNote + 1,
        subNote: 1
      }))
    }
  }

  calculateInterval = (bpm, subdivision) => {
    return Math.floor(60000 / (bpm * subdivision))
  }

  componentDidMount() {
    if (this.props.isPlaying) {
      this.timerID = setInterval(
        this.update,
        this.calculateInterval(this.props.bpm, this.props.subdivision)
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying != this.props.isPlaying) {
      if (nextProps.isPlaying) {
        this.timerID = setInterval(
          this.update,
          this.calculateInterval(nextProps.bpm, nextProps.subdivision)
        )
      } else {
        clearInterval(this.timerID)
      }
    } else if (
      nextProps.isPlaying &&
      (nextProps.bpm !== this.props.bpm ||
        nextProps.subdivision !== this.props.subdivision)
    ) {
      clearInterval(this.timerID)
      this.timerID = setInterval(
        this.update,
        this.calculateInterval(nextProps.bpm, nextProps.subdivision)
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    return this.props.render(this.props, this.state)
  }
}

ProMetronome.propTypes = {
  bpm: numberInRange(1, MAXBPM),
  subdivision: numberInRange(1, MAXSUBDIVISION),
  isPlaying: PropTypes.bool,
  soundEnabled: PropTypes.bool,
  soundPattern: (props, propName, componentName) =>
    stringWithLength(beatsPerBar * props['subdivision'])(props, propName, componentName),
  render: PropTypes.func.isRequired,
  // modification: add beatsPerBar prop
  beatsPerBar: PropTypes.number,
}

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: 1,
  isPlaying: true,
  soundEnabled: false,
  soundPattern: '',
  // modification: default beats of 4
  beatsPerBar: 4,
}

export default ProMetronome
