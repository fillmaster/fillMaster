# react-pro-metronome

[![Travis][build-badge]][build]
[![Coveralls][coveralls-badge]][coveralls]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads-badge]][npm-downloads]
[![Prettier][prettier-badge]][prettier]
[![License][license-badge]][license]

React component that creates a Metronome. The cool thing is that it uses a [render prop](https://reactjs.org/docs/render-props.html), so you can decide the look of your own metronome.

## Functionalities

* The basic functionality of a metronome: set a click to a specified BPM.
* You can set a subdivision between quarter notes and have a click on those subdivisions.
* You can globally decide if you want sound or just a visual click.
* If you are using sounds, you can decide the click sound level of each note (including subdivisions) between no-sound, low, medium and high.
* Because we use a render prop, the appearance of your metronome is entirely up to you!! You can focus on making it as cool as you want, and we'll give you the metronome functionality.

## Installation

```
npm install react-pro-metronome
```

## Load

```js
import ProMetronome from 'react-pro-metronome'
```

## Usage

To create your own metronome in your app, just insert the component using its props to configure it, and define what you want to render (how you want it to look like) inside of the render prop.
Here you have an easy example of a metronome with a click in 8th notes, that just renders the current quarter note and the subdivision note, and that has different click sound for quarter notes and for the subdivision...

```js
<ProMetronome
  bpm={95}
  subdivision={2}
  soundEnabled={true}
  soundPattern="31313131"
  render={(props, state) => (
    <div>
      {state.qNote}/{state.subNote}
    </div>
  )}
/>
```

This will render (at 95 bpm)....

```
1/1... 1/2... 2/1... 2/2... 3/1... 3/2... 4/1... 4/2... 1/1
```

## Configuration parameters

### Component props

|  Parameter   | Description                                                                                                                                                                                                                                                                                                              |   Type   |                  Values                  | Default |
| :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------: | :--------------------------------------: | :-----: |
|     bpm      | Set the click speed (_beeps per minute_).                                                                                                                                                                                                                                                                                |  number  |                  1-300                   |   80    |
| subdivision  | Set the number of notes(clicks) you want to have from one quarter note and the next one. For example, if you want your metronome to have a click in 16th notes, you'll have to set subdivision at 4 (each quarter note has four 16th note).                                                                              |  number  |                   1-8                    |    1    |
|  isPlaying   | Play/Stop the metronome                                                                                                                                                                                                                                                                                                  | boolean  |                true/false                |  true   |
| soundEnabled | Enable/disable all click sounds.                                                                                                                                                                                                                                                                                         | boolean  |                true/false                |  false  |
| soundPattern | Define the sound level for each one of the notes of a bar, including subdivisions. It's a string that has to have the length of the number of notes you have in a bar (including subdivisions) in which each character define the sound level: '0' (no sound), '1' (low sound), '2' (medium sound) and '3' (high sound). |  string  | String composed by: '0', '1', '2' or '3' |   ''    |
|    render    | Function where you can define what you want the component to render.                                                                                                                                                                                                                                                     | function |                 function                 |    -    |

### Render prop

|   Parameter   | Description                                                                                              |  Type  |         Values          | Default |
| :-----------: | -------------------------------------------------------------------------------------------------------- | :----: | :---------------------: | :-----: |
|     props     | Object with all the props the component is using (passed to the component or default values established) | Object |            -            |    -    |
|  state.qNote  | Current quarter note.                                                                                    | number |           1-4           |    -    |
| state.subNote | Current subdivision note.                                                                                | number | 1-[_props.subdivision_] |    -    |

## References

* If you still don't know how cool [render props](https://reactjs.org/docs/render-props.html) are, you should go and check the list [awesome-react-render-props](https://github.com/jaredpalmer/awesome-react-render-props) created by [Jared Palmer](https://github.com/jaredpalmer).

## Legal

Released under MIT license.

[build-badge]: https://img.shields.io/travis/rigobauer/react-pro-metronome/master.svg?style=flat-square
[build]: https://travis-ci.org/rigobauer/react-pro-metronome
[coveralls-badge]: https://img.shields.io/coveralls/rigobauer/react-pro-metronome/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/rigobauer/react-pro-metronome
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square
[commitizen]: http://commitizen.github.io/cz-cli/
[npm-badge]: https://img.shields.io/npm/v/react-pro-metronome.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-pro-metronome
[npm-downloads-badge]: https://img.shields.io/npm/dm/react-pro-metronome.svg?style=flat-square
[npm-downloads]: https://npm-stat.com/charts.html?package=react-pro-metronome
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
[coveralls-badge]: https://img.shields.io/coveralls/rigobauer/react-pro-metronome/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/rigobauer/react-pro-metronome
[license-badge]: https://img.shields.io/npm/l/react-pro-metronome.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
