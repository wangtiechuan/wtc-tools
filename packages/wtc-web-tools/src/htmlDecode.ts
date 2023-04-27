export function htmlDecode(text: string) {
  let demo: HTMLDivElement | null = document.createElement('div');
  demo.innerHTML = text;
  const outPutText = demo.innerText || demo.textContent;
  demo = null;
  return outPutText;
}
