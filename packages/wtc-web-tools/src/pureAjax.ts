interface AnyObject {
  [k: string]: any;
}

function concatUrl(url?: string, query?: string) {
  if (!url) {
    if (!query) {
      return '';
    }
    return query;
  }
  if (!query) {
    return url;
  }
  if (url.includes('?')) {
    if (url.endsWith('&')) {
      return `${url}${query}`;
    }
    return `${url}&${query}`;
  }
  return `${url}?${query}`;
}

function queryString(strObj?: AnyObject) {
  let queryStr = '';
  if (!strObj) {
    return queryStr;
  }
  Object.keys(strObj).forEach((key) => {
    queryStr += `${key}=${strObj[key]}&`;
  });
  if (queryStr) {
    queryStr = queryStr.slice(0, queryStr.length - 1);
  }
  return queryStr;
}

export enum PureAjaxMethod {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
}

export interface PureAjaxRes {
  status: number;
  data: any;
  statusText: string;
}

export interface PromiseHasAbort<T> extends Promise<T> {
  abort: () => void;
}

export interface PureAjaxOptons {
  method?: PureAjaxMethod;
  url: string;
  params?: AnyObject;
  data?: any;
  headers?: AnyObject;
  responseType?: XMLHttpRequestResponseType;
  withCredentials?: boolean;
  onUploadProgress?: XMLHttpRequestEventTarget['onprogress'];
  onDownloadProgress?: XMLHttpRequestEventTarget['onprogress'];
  timeout?: number;
  beforeSend?: (xhr: XMLHttpRequest) => boolean | Promise<boolean>;
}
export function pureAjax(options: PureAjaxOptons) {
  const {
    method: _method = PureAjaxMethod.GET,
    params = {},
    url,
    data = null,
    headers,
    responseType,
    withCredentials,
    onUploadProgress,
    onDownloadProgress,
    timeout,
    beforeSend,
  } = options;

  // @ts-ignore
  const method: PureAjaxMethod = _method.toUpperCase();

  let xhr: XMLHttpRequest;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // @ts-ignore
    xhr = new ActiveXObject('Mricosoft.XMLHTTP');
  }

  // 上传
  if (onUploadProgress && xhr.upload) {
    xhr.upload.onprogress = onUploadProgress;
  }

  // 下载
  if (onDownloadProgress) {
    xhr.onprogress = onDownloadProgress;
  }

  if (responseType) {
    xhr.responseType = responseType;
  }

  if (withCredentials) {
    xhr.withCredentials = withCredentials;
  }

  if (timeout) {
    xhr.timeout = timeout;
  }

  const setHeaders = () => {
    if (headers) {
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  };

  const toSend = async () => {
    if ([PureAjaxMethod.GET, PureAjaxMethod.DELETE].includes(method)) {
      const query = queryString(params);
      xhr.open(method, concatUrl(url, query));
      setHeaders();
      const ispass = await beforeSend?.(xhr);
      if (ispass || ispass === undefined) {
        xhr.send(null);
      }
    } else if ([PureAjaxMethod.POST, PureAjaxMethod.PUT, PureAjaxMethod.PATCH].includes(method)) {
      xhr.open(method, url);
      setHeaders();
      const ispass = await beforeSend?.(xhr);
      if (ispass || ispass === undefined) {
        xhr.send(data);
      }
    }
  };

  // @ts-ignore
  const pro: PromiseHasAbort<PureAjaxRes> = new Promise<PureAjaxRes>((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const res: PureAjaxRes = {
            status: xhr.status,
            data: xhr.response,
            statusText: xhr.statusText,
          };
          resolve(res);
        } else {
          reject({ status: xhr.status });
        }
      }
    };

    xhr.onerror = (error) => {
      reject({ error });
    };

    xhr.onabort = (abort) => {
      reject({ abort });
    };

    toSend();
  });

  pro.abort = () => {
    xhr.abort();
  };

  return pro;
}
