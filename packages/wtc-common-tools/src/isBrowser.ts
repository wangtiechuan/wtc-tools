export const isBrowser = () => {
  try {
    return typeof window !== 'undefined';
  } catch (e) {
    console.log(e);
  }
  return false;
};
