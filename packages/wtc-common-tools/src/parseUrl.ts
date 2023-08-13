export interface UrlInfo {
  protocol: string | null;
  host: string | null;
  path: string | null;
  params: Record<string, string | null>;
}

export function parseUrl(urlStr: string): UrlInfo | null {
  try {
    const url = new URL(urlStr);
    const params: Record<string, string | null> = {};

    url.searchParams.forEach((value, key) => {
      let _value = value;
      if (_value === 'undefined' || _value === 'null') {
        _value = '';
        return;
      }
      params[key] = value;
    });

    return {
      protocol: url.protocol,
      host: url.host,
      path: url.pathname,
      params,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function modifyUrlParams(
  url: string,
  params: Record<string, string>,
): string {
  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;

    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, value);
    }

    urlObj.search = searchParams.toString();
    return urlObj.toString();
  } catch (error) {
    console.log(error);
    return url;
  }
}
