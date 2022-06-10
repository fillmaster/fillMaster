// This function can wrapped around an array.find method if you are sure there will definitely
// be an item returned from the find.

function ensure<T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export default ensure;
