// This code can be used for the default value on a switch/case functions to ensure that all
// cases of a union type or enum have been accounted for. Pass the same param as used in the switch.

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

export default assertUnreachable;
