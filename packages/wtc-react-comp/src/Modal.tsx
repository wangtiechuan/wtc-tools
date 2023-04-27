import React, {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import './Modal.less';

export interface ModalProps {
  renderContainer?: HTMLElement;
  className?: string;
  positon?: 'top' | 'bottom' | 'center' | 'left' | 'right';
  onMaskClick?: () => void;
  onAnimationHideEnd?: () => void;
  contentClassName?: string;
  zIndex?: number;
}

export interface ModalParamsProps extends React.PropsWithChildren<ModalProps> {
  visible?: boolean;
}

export function Modal(props: ModalParamsProps) {
  const {
    className = '',
    visible,
    onMaskClick,
    children,
    renderContainer = document.body,
    positon = 'bottom',
    onAnimationHideEnd,
    contentClassName = '',
    zIndex = 100,
  } = props;
  const [animationClass, setAnimationClass] = useState('');
  const [containerClass, setContainerClass] = useState(
    Modal.config.containerHiddenClass,
  );
  const [visibleState, setVisibleState] = useState(visible);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      setVisibleState(true);
      setContainerClass(Modal.config.containerVisibleClass);
      setAnimationClass(Modal.config.animationFadeInClass);
    } else {
      setAnimationClass(Modal.config.animationFadeOutClass);
    }
  }, [visible]);

  useEffect(() => {
    const onAnimationEnd = () => {
      if (!visible) {
        setVisibleState(false);
        setContainerClass(Modal.config.containerHiddenClass);
        onAnimationHideEnd?.();
      }
      setAnimationClass('');
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('animationend', onAnimationEnd);
      return () => {
        container.removeEventListener('animationend', onAnimationEnd);
      };
    }
  }, [visible]);

  if (!visibleState) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`modal-container ${className} ${containerClass} ${positon} ${animationClass} `}
      style={{ zIndex }}
      ref={containerRef}
    >
      <div className="modal-mask" onClick={onMaskClick} />
      <div className={`modal-content ${contentClassName}`}>{children}</div>
    </div>,
    renderContainer,
  );
}

Modal.config = {
  containerHiddenClass: 'hidden',
  containerVisibleClass: 'visible',
  animationFadeInClass: 'fadeIn',
  animationFadeOutClass: 'fadeOut',
};

export interface ModalComponentProps {
  onClose?: () => void;
}

export interface ModalInstance {
  show: (
    component: ComponentType<ModalComponentProps>,
    props?: Record<string, any>,
  ) => void;
  hide: () => void;
  destroy: () => void;
}

export interface ModalOptions extends ModalProps {
  closeWhenMaskClick?: boolean;
}

export function createModal(options: ModalOptions = {}): ModalInstance {
  const {
    renderContainer,
    onMaskClick,
    closeWhenMaskClick = true,
    onAnimationHideEnd,
    ...otherProps
  } = options;
  const container = document.createElement('div');
  const instance: ModalInstance = {
    show(ComponentModal, props = {}) {
      const ModalContent = () => {
        const [visible, setVisible] = useState(true);
        const onClose = useCallback(() => {
          setVisible(false);
        }, []);
        return (
          <Modal
            visible={visible}
            renderContainer={renderContainer}
            onMaskClick={() => {
              onMaskClick?.();
              if (closeWhenMaskClick) {
                onClose();
              }
            }}
            onAnimationHideEnd={() => {
              onAnimationHideEnd?.();
              instance.destroy();
            }}
            {...otherProps}
          >
            <ComponentModal {...props} onClose={onClose} />
          </Modal>
        );
      };
      ReactDOM.render(<ModalContent />, container);
    },
    hide() {
      ReactDOM.unmountComponentAtNode(container);
    },
    destroy() {
      instance.hide();
      container.remove();
    },
  };
  if (renderContainer) {
    renderContainer.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
  return instance;
}
