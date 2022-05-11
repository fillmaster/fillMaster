const getStringArrayBetweenTwoValues = (lowEnd: number, highEnd: number) => {
  const list = [];
  for (let i = lowEnd; i <= highEnd; i++) {
    list.push(i.toString());
  }
  return list;
};

export default getStringArrayBetweenTwoValues;
