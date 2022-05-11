const stringWithLength = strLength => (props, propName, componentName) => {
  if (props[propName]) {
    const propValue = props[propName],
      propType = typeof propValue
    if (propType !== 'string')
      return new Error(
        'Invalid prop `' +
          propName +
          '` of type `' +
          propType +
          '` supplied to ' +
          componentName +
          ', expected `string`.'
      )
    if (propValue.length > 0 && propValue.length !== strLength)
      return new Error(
        'Invalid prop `' +
          propName +
          '` with length ' +
          propValue.length +
          ' supplied to ' +
          componentName +
          ". Length value doesn't match with the subdivision, expected " +
          strLength +
          '.'
      )
  }
}

export default stringWithLength
