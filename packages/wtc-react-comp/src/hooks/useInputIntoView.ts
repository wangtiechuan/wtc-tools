import { useEffect } from "react";
import scrollIntoView from "scroll-into-view-if-needed";

interface UseInputIntoViewProps {
  inputRefs?: React.MutableRefObject<any>[];
  aimRef?: React.MutableRefObject<any>;
}

export function useInputIntoView(props: UseInputIntoViewProps) {
  const { inputRefs, aimRef } = props;

  useEffect(() => {
    const scFunc = (e?: any) => {
      const node = aimRef?.current || e?.target;
      if (!node) {
        return;
      }
      scrollIntoView(node, {
        behavior: "smooth",
        scrollMode: "if-needed",
      });
    };
    inputRefs?.forEach((ref) => {
      ref.current?.addEventListener("focus", scFunc, false);
    });

    return () => {
      inputRefs?.forEach((ref) => {
        ref.current?.removeEventListener("focus", scFunc);
      });
    };
  }, []);
}

export function InputIntoViewTemp(props: UseInputIntoViewProps) {
  useInputIntoView(props);
  return null;
}
