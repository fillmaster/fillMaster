export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
};

export default shuffleArray;
