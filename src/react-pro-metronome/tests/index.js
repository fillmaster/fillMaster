import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Howl } from 'howler'

import ProMetronome from 'src/'

describe('<ProMetronome />', () => {
  it('should shallow render a <ProMetronome /> as null', () => {
    const wrapper = shallow(<ProMetronome render={(props, state) => null} />)
    expect(wrapper.html()).to.equal(null)
  })

  it('should shallow render a <ProMetronome /> printing the default bpm', () => {
    const wrapper = shallow(
      <ProMetronome render={(props, state) => <div>{props.bpm}</div>} />
    )
    expect(wrapper.html()).to.equal('<div>80</div>')
  })

  it('should shallow render a <ProMetronome /> printing the configured bpm and subdivision', () => {
    const wrapper = shallow(
      <ProMetronome
        bpm={120}
        subdivision={3}
        render={(props, state) => (
          <div>
            {props.bpm}/{props.subdivision}
          </div>
        )}
      />
    )
    expect(wrapper.html()).to.equal('<div>120/3</div>')
  })

  it('should shallow render a <ProMetronome /> printing quarter notes and 16th notes and checking sound play', () => {
    let clock = sinon.useFakeTimers()
    sinon.stub(Howl.prototype, 'play')
    sinon.spy(ProMetronome.prototype, 'render')
    sinon.spy(ProMetronome.prototype, 'componentWillReceiveProps')
    sinon.spy(ProMetronome.prototype, 'componentWillUnmount')

    let interval = Math.floor(60000 / (80 * 4))
    const wrapper = mount(
      <ProMetronome
        bpm={80}
        subdivision={4}
        isPlaying={false}
        soundEnabled={true}
        soundPattern="3222322232223222"
        render={(props, state) => (
          <div>
            {state.qNote}/{state.subNote}
          </div>
        )}
      />
    )

    expect(wrapper.text()).to.equal('1/1')
    clock.tick(5 * interval + 5)
    expect(wrapper.text()).to.equal('1/1')
    wrapper.setProps({ isPlaying: true })
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('1/2')
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('1/3')
    wrapper.setProps({ isPlaying: false })
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('1/3')
    wrapper.setProps({ isPlaying: true })
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('1/4')
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('2/1')
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('2/2')
    clock.tick(10 * interval + 5)
    expect(wrapper.text()).to.equal('4/4')
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('1/1')

    sinon.assert.callCount(Howl.prototype.play, 16)

    wrapper.setProps({ bpm: 100, subdivision: 2, soundPattern: '32323232' })
    expect(ProMetronome.prototype.componentWillReceiveProps.callCount).to.equal(
      4
    )
    interval = Math.floor(60000 / (100 * 2))
    clock.tick(interval + 5)
    expect(wrapper.text()).to.equal('1/2')

    expect(ProMetronome.prototype.render.callCount).to.equal(22)
    expect(ProMetronome.prototype.componentWillUnmount.notCalled).to.equal(true)
    wrapper.unmount()
    expect(ProMetronome.prototype.componentWillUnmount.calledOnce).to.equal(
      true
    )

    clock.restore()
    Howl.prototype.play.restore()
  })

  it('should shallow render a <ProMetronome /> and check bpm, subdivision and soundPattern type and length errors', () => {
    sinon.stub(console, 'error')

    let interval = Math.floor(60000 / (80 * 4))
    const wrapper = mount(
      <ProMetronome
        bpm="80"
        subdivision={2}
        soundEnabled={false}
        render={(props, state) => (
          <div>
            {state.qNote}/{state.subNote}
          </div>
        )}
      />
    )

    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(
      console.error,
      'Warning: Failed prop type: Invalid prop `bpm` of type `string` supplied to ProMetronome, expected `number`.'
    )
    console.error.resetHistory()
    wrapper.setProps({ bpm: 350 })
    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(
      console.error,
      'Warning: Failed prop type: Invalid prop `bpm` with value 350 supplied to ProMetronome. Allowed range is 1-300.'
    )
    console.error.resetHistory()
    wrapper.setProps({ bpm: 80, subdivision: '2' })
    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(
      console.error,
      'Warning: Failed prop type: Invalid prop `subdivision` of type `string` supplied to ProMetronome, expected `number`.'
    )
    console.error.resetHistory()
    wrapper.setProps({ subdivision: 12 })
    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(
      console.error,
      'Warning: Failed prop type: Invalid prop `subdivision` with value 12 supplied to ProMetronome. Allowed range is 1-8.'
    )
    console.error.resetHistory()
    wrapper.setProps({
      subdivision: 2,
      soundEnabled: true,
      soundPattern: 323232323
    })
    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(
      console.error,
      'Warning: Failed prop type: Invalid prop `soundPattern` of type `number` supplied to ProMetronome, expected `string`.'
    )
    console.error.resetHistory()
    wrapper.setProps({ soundPattern: '323232323' })
    sinon.assert.callCount(console.error, 1)
    sinon.assert.calledWithMatch(
      console.error,
      "Warning: Failed prop type: Invalid prop `soundPattern` with length 9 supplied to ProMetronome. Length value doesn't match with the subdivision, expected 8."
    )
    console.error.resetHistory()
    wrapper.setProps({ soundPattern: '32323232' })
    sinon.assert.notCalled(console.error)

    console.error.restore()
  })
})
