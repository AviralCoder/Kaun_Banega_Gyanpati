import React from "react";
import styled from "styled-components";
import { flexboxComponentProps } from "../types/types";

const Flexed = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
`;

const Flexbox = (props: flexboxComponentProps) => {
    return (
        <React.Fragment>
            <Flexed>{props.children}</Flexed>
        </React.Fragment>
    );
};

export default Flexbox;
