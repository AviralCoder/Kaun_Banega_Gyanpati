import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../components/Button";
import { colors } from "../lib/colors/colors";

const Center = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const TextInBg = styled.h1`
    font-size: 10rem;
    color: ${colors.secondary};
    font-family: "Raleway";
`;

const DescriptionText = styled.p`
    text-align: center;
    color: white;
    font-size: 2.4rem;
`;

const Four = () => {
    const history = useHistory();

    return (
        <React.Fragment>
            <Center>
                <TextInBg>404</TextInBg>

                <DescriptionText>
                    The page you are looking for doesn't exist!
                </DescriptionText>

                <Button onClick={() => history.push("/")}>Back to Home</Button>
            </Center>
        </React.Fragment>
    );
};

export default Four;
