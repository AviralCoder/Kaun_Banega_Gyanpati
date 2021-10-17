import React from "react";
import styled from "styled-components";
import { lifelineComponentProps } from "../types/types";

const StyledLifeline = styled.section`
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const Lifeline = (props: lifelineComponentProps): JSX.Element => {
    return (
        <StyledLifeline onClick={props.onClick}>
            {props.children}
        </StyledLifeline>
    );
};

export default Lifeline;
