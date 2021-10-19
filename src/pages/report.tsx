import React from "react";
import styled from "styled-components";
import { colors } from "../lib/colors/colors";

const Title = styled.h1`
    color: white;
    margin-top: 50px;
    text-align: center;
    font-size: 3rem;
`;

const Description = styled.p`
    color: white;
    margin: 20px 40px;
    font-size: 1.3rem;
    text-align: center;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
`;

const Input = styled.input`
    padding: 1.4rem;
    border-radius: 20px;
    background: white;
    font-size: 1rem;
    width: 500px;
    outline: 0;
    border: 0;
    margin-top: 20px;
`;

const Textarea = styled.textarea`
    padding: 1.2rem;
    background: white;
    border-radius: 20px;
    font-size: 1rem;
    margin-top: 30px;
    width: 500px;
    height: 300px;
    border: 0;
`;

const Button = styled.button`
    border: 0;
    width: 500px;
    padding: 1.4rem;
    color: white;
    font-size: 1rem;
    border-radius: 20px;
    margin-top: 20px;
    background-color: ${colors.secondary};
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const Report = (): JSX.Element => {
    return (
        <React.Fragment>
            <Title>Report</Title>

            <Description>Report a bug or suggest a feature!</Description>

            <Center>
                <Input placeholder="Your email (so that I can get back to you)" />
            </Center>

            <Center>
                <Textarea placeholder="Report bug or suggest feature " />
            </Center>

            <Center>
                <Button onClick={() => {}}>Submit</Button>
            </Center>
        </React.Fragment>
    );
};

export default Report;
