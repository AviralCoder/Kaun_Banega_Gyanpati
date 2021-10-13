import React from "react";
import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { knowledgeScoreComponentProps } from "../types/types";

const KnowledgeScoreDiv = styled.div`
    border: 2px solid ${colors.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin: 0 20px;
    flex-direction: column;
    transform: scale(0.9);
`;

const Header = styled.h1`
    font-size: 2rem;
    color: white;
    text-align: center;
`;

const Score = styled.h1`
    font-size: 5rem;
    color: white;
    text-align: center;
`;

const KnowledgeScore = (props: knowledgeScoreComponentProps): JSX.Element => {
    return (
        <React.Fragment>
            <KnowledgeScoreDiv>
                <Header>You have gained this much knowledge - </Header>

                <Score>{props.score}</Score>
            </KnowledgeScoreDiv>
        </React.Fragment>
    );
};

export default KnowledgeScore;
