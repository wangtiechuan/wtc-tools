import { ExpandText } from '@victor/victor-react-comp';
import React from 'react';

function DevelopComp(props: any) {
  return <div onClick={props.onClick}>展开</div>;
}

function PackupComp(props: any) {
  return <div onClick={props.onClick}>收起</div>;
}

export default function Demo() {
  return (
    <>
      <ExpandText
        developComp={DevelopComp}
        packupComp={PackupComp}
        styleLineHeight="1em"
        maxLines={8}
        text="唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥唯粉唯粉唯粉唯粉唯粉唯粉唯粉唯各位各位各位各位各位各位各位各位哥"
      />
    </>
  );
}
