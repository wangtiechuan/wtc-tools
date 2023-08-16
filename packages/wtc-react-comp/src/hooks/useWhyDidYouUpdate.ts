import { useEffect, useRef } from 'react';

export type IProps = Record<string, any>;
// 帮助开发者排查是哪个属性改变导致了组件的 rerender。
// 打开控制台，可以看到改变的属性。
export default function useWhyDidYouUpdate(componentName: string, props: IProps) {
  const prevProps = useRef<IProps>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
}


// const [randomNum, setRandomNum] = useState(Math.random());
// useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props, randomNum });
