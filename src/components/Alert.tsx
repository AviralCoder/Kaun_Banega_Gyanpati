import React from "react";
import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { alertComponentProps } from "../types/types";

const AlertOuterOpacityDiv = styled.div`
    position: fixed;
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.427);
    z-index: 999999;
    color: white;
`;

const AlertInnerModalDiv = styled.div`
    width: 80%;
    height: 80%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${colors.primary};
    overflow: scroll;
    animation-name: opacityChange;
    animation-duration: 2s;

    @keyframes opacityChange {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const AlertTitle = styled.h1`
    color: #fff;
    text-align: center;
    font-size: 2rem;
    padding-top: 20px;
`;

const AlertBody = styled.div`
    margin: 20px 50px;
    font-size: 1.4rem;
`;

const BottomButton = styled.button`
    padding: 1.5rem 7rem;
    background: transparent;
    border: 4px solid ${colors.secondary};
    background: ${colors.secondary};
    border-radius: 30px;
    font-size: 1.5rem;
    position: fixed;
    bottom: 20;
    color: #fff;
    margin-top: 20px;
    transition: 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        background: transparent;
        column-rule: ${colors.secondary};
    }
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
`;

const Alert = (props: alertComponentProps): JSX.Element => {
    return (
        <React.Fragment>
            <AlertOuterOpacityDiv>
                <AlertInnerModalDiv>
                    <AlertTitle>{props.heading}</AlertTitle>

                    {props.img ? <img src={props.img} alt={props.img} /> : null}

                    <AlertBody>{props.body()}</AlertBody>

                    {props.buttonText ? (
                        <Center>
                            <BottomButton onClick={props.onButtonClick}>
                                {props.buttonText}
                            </BottomButton>
                        </Center>
                    ) : null}
                </AlertInnerModalDiv>
            </AlertOuterOpacityDiv>
        </React.Fragment>
    );
};

export default Alert;
