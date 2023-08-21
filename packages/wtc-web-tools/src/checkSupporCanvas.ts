export function checkSupporCanvas() {
  try {
    return !!document.createElement('canvas').getContext;
  } catch (e) {
    console.log(e);
  }
  return false;
}
