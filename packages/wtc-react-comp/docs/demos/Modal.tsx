import { createModal, Modal } from '@victor/victor-react-comp';
import React, { useState } from 'react';

function DemoContent(props: any) {
  return <div onClick={props.onClose}>DemoContent</div>;
}

function Modal1() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        点击显示(组件)
      </div>
      <Modal
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
      >
        <DemoContent
          onClose={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </>
  );
}

function Modal2() {
  return (
    <>
      <div
        onClick={() => {
          const modal = createModal({ positon: 'center' });
          modal.show(DemoContent);

          const modal2 = createModal({ positon: 'bottom' });
          modal2.show(DemoContent);
        }}
      >
        点击显示(方法)
      </div>
    </>
  );
}

export default function Demo() {
  return (
    <>
      <Modal1 />
      <Modal2 />
    </>
  );
}
