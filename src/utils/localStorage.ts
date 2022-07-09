const updateLocalStorage = <T>(key: string, value: T): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error updating local storage with key ${key}`, error);
    return false;
  }
};

const parseJSON = <T>(json: string | null): T | undefined => {
  try {
    return json === 'undefined' ? undefined : JSON.parse(json ?? '');
  } catch {
    return undefined;
  }
};

export { parseJSON };
export default updateLocalStorage;
