import styled from "styled-components";
import {Button} from '@material-ui/core/';

export const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const Column = styled.div`
    max-width: 35px;
`;

export const Block = styled.span`
    padding: 5px;
    margin: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    position: relative;
    width: 20px;
    height: 30px;
    transition: transform 200ms linear;
    box-shadow: inset 2px 0 8px 0.6px rgba(0,0,0,0.6);
    transform-style: preserve-3d;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      border-radius: 50%;
      box-shadow: -1px -4.5px 9px 5px rgba(70,0,0,.7) inset;
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      opacity: .2;
      border-radius: 50%;
      background: radial-gradient(circle at 10px 10px, #fff, #000);
    }
`;

export const ButtonMargin = styled(Button)`
  margin: 0 0.4rem !important;
`;