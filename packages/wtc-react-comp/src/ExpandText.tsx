import React, {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './ExpandText.less';

interface ExpandActonCompProps {
  onClick?: () => void;
}

interface ExpandTextProps {
  className?: string;
  text?: string;
  maxLines?: number;
  styleLineHeight: string;
  developComp?: ComponentType<ExpandActonCompProps>;
  packupComp?: ComponentType<ExpandActonCompProps>;
}

export function ExpandText(props: ExpandTextProps) {
  const {
    className,
    text = '',
    maxLines,
    styleLineHeight,
    developComp: DevelopComp,
    packupComp: PackupComp,
  } = props;
  const textEl = useRef<HTMLDivElement>(null);

  const [maxHeight, setMaxHeight] = useState<number | undefined>(0);
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  const [isTextOverflowReal, setIsTextOverflowReal] = useState(isTextOverflow);
  const [maxHeightReal, setMaxHeightReal] = useState(maxHeight);

  const calcOverflow = useCallback(() => {
    const textElement = textEl.current;
    if (!textElement || !maxLines) {
      setIsTextOverflow(false);
      setMaxHeight(undefined);

      setIsTextOverflowReal(false);
      setMaxHeightReal(undefined);
      return;
    }

    const lineHeight = parseInt(getComputedStyle(textElement).lineHeight);
    const maxHeight = lineHeight * maxLines;
    const _isTextOverflow = textElement.scrollHeight > maxHeight;
    const _maxHeight = _isTextOverflow ? maxHeight : undefined;

    setIsTextOverflow(_isTextOverflow);
    setMaxHeight(_maxHeight);

    setIsTextOverflowReal(_isTextOverflow);
    setMaxHeightReal(_maxHeight);
  }, []);

  useEffect(() => {
    if (!DevelopComp && !PackupComp) {
      return;
    }
    calcOverflow();
  }, [text]);

  useEffect(() => {
    if (!DevelopComp && !PackupComp) {
      return undefined;
    }
    window.addEventListener('resize', calcOverflow, false);
    return () => {
      window.removeEventListener('resize', calcOverflow);
    };
  }, []);

  const numLineClassName = useMemo(() => {
    if (!maxLines) {
      return '';
    }
    if (!DevelopComp && !PackupComp) {
      return `num-line_${maxLines}`;
    }

    if (maxHeight) {
      return `num-line_${maxLines}`;
    }

    return '';
  }, [maxHeight, maxLines]);

  return (
    <div className={className}>
      <div
        ref={textEl}
        className={`num-line ${numLineClassName}`}
        style={{
          lineHeight: styleLineHeight,
          maxHeight: maxHeight === undefined ? 'none' : `${maxHeight}px`,
        }}
      >
        {text}
      </div>
      {isTextOverflowReal ? (
        isTextOverflow ? (
          DevelopComp ? (
            <DevelopComp
              onClick={() => {
                setIsTextOverflow(false);
                setMaxHeight(undefined);
              }}
            />
          ) : null
        ) : PackupComp ? (
          <PackupComp
            onClick={() => {
              setIsTextOverflow(true);
              setMaxHeight(maxHeightReal);
            }}
          />
        ) : null
      ) : null}
    </div>
  );
}
