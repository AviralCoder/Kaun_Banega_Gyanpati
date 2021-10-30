import { Redirect } from "react-router-dom";
import styled from "styled-components";
import useDimension from "../hooks/useDimension";
import { colors } from "../lib/colors/colors";
import { mobileComponentProps } from "../types/types";

const Div = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    background-color: ${colors.primary};
`;

const Title = styled.h1`
    color: white;
    text-align: center;
    font-family: "Raleway", sans-serif;
`;

export default function Mobile(props: mobileComponentProps): JSX.Element {
    const dimensions = useDimension();

    if (dimensions.width! > 768) {
        return <Redirect to="/" />;
    }

    return (
        <Div>
            <Title>{props.title}</Title>
        </Div>
    );
}
