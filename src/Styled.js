import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const Column = styled.div`
    max-width: 50px;
`;

export const Block = styled.span`
    padding: 5px;
    margin: 5px;
    display: inline-flex;
    border-radius: 100%;
    position: relative;
    width: 30px;
    height: 30px;
    transition: transform 200ms linear;
    animation: rotate 4s linear infinite;
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
      box-shadow: -8px 1.5px 8px 1px rgba(0,0,0,.7) inset;
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