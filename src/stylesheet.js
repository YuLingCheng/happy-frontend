import { keyframes } from 'styled-components';

const colors = {
  blue: 'rgb(24, 144, 255)',
  blueDark: '#0c3a65',
  blueLight: '#f5faff',
  bottleGreenTransparent: 'rgba(0, 113, 139, 0.54)',
  bottleGreen: '#19dcea',
  white: '#fff',
  lightGrey: 'rgb(232, 232, 232)',
  yellow: '#faad14',
  yellowTransparent: 'rgba(252, 209, 67, 0.3)',
  green: '#52c41a',
};

export const colorUsage = {
  mainColor: colors.blue,
  secondaryColor: colors.bottleGreen,
  darkColor: colors.blueDark,
  reverseColor: colors.blueLight,
  rootContainerBg: colors.yellowTransparent,
  childBaseColor: colors.bottleGreenTransparent,
  highlightChildColor: colors.yellow,
  highlightContainerColor: colors.green,
  white: colors.white,
  lightGrey: colors.lightGrey,
};

export const fontFamily = {
  main: `Helvetica, sans-serif`, // eslint-disable-line
  code: 'Monospace',
};

export const heartbeatAnimation = keyframes`
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;
