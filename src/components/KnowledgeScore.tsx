import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { knowledgeScoreComponentProps } from "../types/types";
import Button from "./Button";
import domtoimage from "dom-to-image";
import { SetAlertPropetiesContext, AlertPropertiesContext } from "../App";

const KnowledgeScoreDiv = styled.div`
    border: 2px solid ${colors.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin: 0 20px;
    flex-direction: column;
    box-shadow: 0 0 20px 5px ${colors.secondary};
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
    const setAlertProperties = useContext(SetAlertPropetiesContext);
    const alertProperties = useContext(AlertPropertiesContext);
    const [buttonText, setButtonText] = useState("Download");
    const [headerText, setHeaderText] = useState(
        "You have gained this much knowledge -"
    );

    return (
        <React.Fragment>
            <KnowledgeScoreDiv id="knowledge_score">
                <div>
                    <Header>{headerText}</Header>

                    <Score>{props.score}</Score>
                </div>

                <Button
                    onClick={() => {
                        const node = document.getElementById("knowledge_score");

                        setButtonText(":)");
                        setHeaderText(
                            `The user has fairly won ${props.score} gyanpoints in the KBG app!`
                        );

                        domtoimage
                            .toJpeg(node!, { quality: 0.95 })
                            .then((dataUrl) => {
                                const link = document.createElement("a");
                                link.download = "score.jpeg";
                                link.href = dataUrl;
                                link.click();
                                link.remove();

                                setButtonText("Download");
                                setHeaderText(
                                    `"You have gained this much knowledge -"`
                                );
                            });

                        setButtonText(":)");
                        setHeaderText(
                            `The user has fairly won ${props.score} in the KBG app!`
                        );
                    }}
                >
                    {buttonText}
                </Button>
            </KnowledgeScoreDiv>
        </React.Fragment>
    );
};

export default KnowledgeScore;
