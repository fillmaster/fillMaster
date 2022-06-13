export const numToStringArray = (array: number[]) => {
  return array.map(String);
};

export const stringToNumArray = (array: string[]) => {
  return Array.from(array.toString().split(','), Number);
};
