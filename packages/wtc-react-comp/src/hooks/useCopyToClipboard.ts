import writeText from 'copy-to-clipboard';
import { useCallback } from 'react';
import useStateCanMerge from './useStateCanMerge';
import useMountedState from './useMountedState';

export interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

const useCopyToClipboard = (): [CopyToClipboardState, (value: string) => void] => {
  const isMounted = useMountedState();
  const [state, setState] = useStateCanMerge<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  });

  const copyToClipboard = useCallback((value) => {
    if (!isMounted()) {
      return;
    }
    let noUserInteraction;
    let normalizedValue;
    try {
      // only strings and numbers casted to strings can be copied to clipboard
      if (typeof value !== 'string' && typeof value !== 'number') {
        const error = new Error(
          `Cannot copy typeof ${typeof value} to clipboard, must be a string`,
        );
        if (process.env.NODE_ENV === 'development') console.error(error);
        setState({
          value,
          error,
          noUserInteraction: true,
        });
        return;
      }
      // empty strings are also considered invalid
      else if (value === '') {
        const error = new Error(`Cannot copy empty string to clipboard.`);
        if (process.env.NODE_ENV === 'development') console.error(error);
        setState({
          value,
          error,
          noUserInteraction: true,
        });
        return;
      }
      normalizedValue = value.toString();
      noUserInteraction = writeText(normalizedValue);
      setState({
        value: normalizedValue,
        error: undefined,
        noUserInteraction,
      });
    } catch (error) {
      setState({
        value: normalizedValue,
        // @ts-ignore
        error,
        // @ts-ignore
        noUserInteraction,
      });
    }
  }, []);

  return [state, copyToClipboard];
};

export default useCopyToClipboard;