const numberInRange = (min, max) => (props, propName, componentName) => {
  if (props[propName]) {
    const propValue = props[propName],
      propType = typeof propValue
    if (propType !== 'number')
      return new Error(
        'Invalid prop `' +
          propName +
          '` of type `' +
          propType +
          '` supplied to ' +
          componentName +
          ', expected `number`.'
      )
    if (propValue < min || propValue > max)
      return new Error(
        'Invalid prop `' +
          propName +
          '` with value ' +
          propValue +
          ' supplied to ' +
          componentName +
          '. Allowed range is ' +
          min +
          '-' +
          max +
          '.'
      )
  }
}

export default numberInRange
