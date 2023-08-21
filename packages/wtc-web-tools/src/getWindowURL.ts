type WindowURLProps = typeof window.URL;
export function getWindowURL(): WindowURLProps | undefined {
  // @ts-ignore
  if (window.URL && window.URL.createObjectURL) {
    return window.URL;
  }
  // @ts-ignore
  if (window.webkitURL && window.webkitURL.createObjectURL) {
    return window.webkitURL;
  }

  return undefined;
}

export function getWURLRevokeObjectURL() {
  return getWindowURL()?.revokeObjectURL;
}
