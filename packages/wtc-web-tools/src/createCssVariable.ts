export function createCssVariable(name: string, value: string) {
  document.documentElement.style.setProperty(`--${name}`, value);
}
