import { HueRotateImg } from '@victor/victor-react-comp';
import React from 'react';

export default function Demo() {
  const demoImg =
    'https://i5.3conline.com/images/piclib/201103/23/batch/1/89463/13008568150802t0bjcuuwr_medium.jpg';
  return <HueRotateImg src={demoImg} backUpImgSrc={demoImg} filterRotate={180}/>;
}
