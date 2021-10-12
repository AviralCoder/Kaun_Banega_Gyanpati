import React, { useEffect, useState } from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";
import Question from "./components/Question";
import { Layout } from "./layout/layout";
import Timer from "./components/Timer";
import { Switch, Route } from "react-router-dom";
import Four from "./pages/404";
import {
    fetchDifficultQuestions,
    fetchEasyQuestions,
    fetchMediumQuestions,
} from "./api/api";
import { OptionGrid } from "./layout/OptionGrid";
import Button from "./components/Button";
import { randomNumber } from "./utils/utils";
import Lifeline from "./components/Lifeline";
import GoogleIcon from "./images/google.png";
import styled from "styled-components";
import Flexbox from "./layout/Flexbox";
import FlipIcon from "./images/flip.jpg";
import Tooltip from "./components/Tooltip";

const GoogleIconImg = styled.img`
    width: 100px;
`;

const FlipIconImg = styled.img`
    width: 100px;
`;

const LifelinesHeader = styled.h1`
    text-align: center;
    font-size: 2rem;
    color: #fff;
`;

const App = (): JSX.Element => {
    const [question, setQuestion] = useState<string>("");
    const [difficultyLevel, setDifficultyLevel] = useState<string>("easy");
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

    const fetchQuestion = async () => {
        if (difficultyLevel === "easy") {
            const res = await fetchEasyQuestions();

            setQuestion(res.results[0].question);
            setCorrectAnswer(res.results[0].correct_answer);
            setWrongAnswers(res.results[0].incorrect_answers);
        } else if (difficultyLevel === "medum") {
            const res = await fetchMediumQuestions();

            setQuestion(res.results[0].question);
            setCorrectAnswer(res.results[0].correct_answer);
            setWrongAnswers(res.results[0].incorrect_answers);
        } else if (difficultyLevel === "hard") {
            const res = await fetchDifficultQuestions();

            setQuestion(res.results[0].question);
            setCorrectAnswer(res.results[0].correct_answer);
            setWrongAnswers(res.results[0].incorrect_answers);
        } else {
            throw new Error("No difficulty passed!");
        }
    };

    useEffect(() => {
        fetchQuestion();

        window.addEventListener("focusout", () => {});

        window.focus();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <GlobalStyles bgColor={colors.primary} />

            <Switch>
                <Route path="/" exact>
                    <Layout>
                        <Timer time={20} />
                        <Question question="Which name in India means Idle?" />

                        <section>
                            <Question question={question} />
                            <OptionGrid>
                                <Button style={{ margin: "20px 20px" }}>
                                    {correctAnswer}
                                </Button>

                                <Button style={{ margin: "20px 20px" }}>
                                    {wrongAnswers[0]}
                                </Button>

                                <Button style={{ margin: "20px 20px" }}>
                                    {wrongAnswers[1]}
                                </Button>

                                <Button style={{ margin: "20px 20px" }}>
                                    {wrongAnswers[2]}
                                </Button>
                            </OptionGrid>
                        </section>

                        <section>
                            <LifelinesHeader>Lifelines</LifelinesHeader>

                            <Flexbox>
                                <Tooltip text="15s to search Google!">
                                    <Lifeline
                                        onClick={() => {
                                            console.log(
                                                "google life line taken"
                                            );
                                        }}
                                    >
                                        <GoogleIconImg
                                            src={GoogleIcon}
                                            alt="Google Icon"
                                        />
                                    </Lifeline>
                                </Tooltip>

                                <Tooltip text="Flip the question!">
                                    <Lifeline
                                        onClick={() => {
                                            console.log(
                                                "google life line taken"
                                            );
                                        }}
                                    >
                                        <FlipIconImg
                                            src={FlipIcon}
                                            alt="Flip Icon"
                                        />
                                    </Lifeline>
                                </Tooltip>
                            </Flexbox>
                        </section>
                    </Layout>
                </Route>

                <Route path="*">
                    <Four />
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default App;
