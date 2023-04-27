// @ts-ignore
// import { fetch } from 'ccxt/js/src/static_dependencies/node-fetch';
import { Observable, Subscriber } from 'rxjs';

const fetchInstance = fetch;

export class FetchSubscriber<T = any> extends Subscriber<T> {
  static AbortError = 'AbortError';

  private completed: boolean;

  private controller: AbortController;

  constructor(
    observer: Subscriber<T>,
    input: RequestInfo | URL,
    init?: RequestInit,
    judgeError?: (data: any) => boolean,
  ) {
    super(observer);
    const controller = new AbortController();
    const { signal } = controller;

    this.controller = controller;
    this.completed = false;

    fetchInstance(input, Object.assign({}, init, { signal }))
      .then((res: any) => {
        if (!res.ok) {
          observer.error(res);
          return;
        }
        if (judgeError?.(res)) {
          observer.error(res);
          return;
        }
        // @ts-ignore
        observer.next(res);
      })
      .catch((error: any) => {
        if (!error.name || error.name !== FetchSubscriber.AbortError) {
          observer.error(error);
        }
      })
      .finally(() => {
        this.completed = true;
        observer.complete();
      });
  }

  unsubscribe() {
    if (this.completed === false) {
      this.controller.abort(FetchSubscriber.AbortError);
      this.completed = true;
    }
    super.unsubscribe();
  }
}

export function fetchSub<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit,
  judgeError?: (data: any) => boolean,
) {
  return new Observable<T>(
    (observer) => new FetchSubscriber<T>(observer, input, init, judgeError),
  );
}
