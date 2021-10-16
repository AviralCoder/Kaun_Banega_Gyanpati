import React, { createContext, useEffect, useState } from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";
import Question from "./components/Question";
import { Layout } from "./layout/layout";
import Timer from "./components/Timer";
import { Switch, Route, useHistory } from "react-router-dom";
import Four from "./pages/404";

import { OptionGrid } from "./layout/OptionGrid";
import Button from "./components/Button";
import Lifeline from "./components/Lifeline";
import GoogleIcon from "./images/google.png";
import styled from "styled-components";
import Flexbox from "./layout/Flexbox";
import FlipIcon from "./images/flip.jpg";
import Tooltip from "./components/Tooltip";
import KnowledgeScore from "./components/KnowledgeScore";
import Menu from "./components/Menu";
import MenuIcon from "./images/menu.jpg";
import Settings from "./pages/Settings";
import Alert from "./components/Alert";
import Instructions from "./components/Instructions";
import { Howl } from "howler";
import { fetchEasyQuestions } from "./api/api";
import { shuffle } from "./utils/utils";

const GamePropertiesContext = createContext<GameProperties>({
    knowledgePoints: 0,
    gameStarted: false,
    diffcultyLevel: "easy",
});
const SetHasLostContext = createContext<
    React.Dispatch<React.SetStateAction<boolean>>
>(() => {});
const SetGamePropertiesContext = createContext<
    React.Dispatch<React.SetStateAction<GameProperties>>
>(() => {});
const SetAlertPropetiesContext = createContext<
    React.Dispatch<React.SetStateAction<AlertProperties>>
>(() => {});

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

interface AlertProperties {
    visible: boolean;
    heading: string;
    body: () => JSX.Element;
    buttonText: string;
    onButtonClick: () => void;
}
interface GameProperties {
    knowledgePoints?: number;
    gameStarted: boolean;
    diffcultyLevel: string;
}
interface QuestionProperties {
    question: string;
    options: string[];
    correct: string;
}

const App = (): JSX.Element => {
    //hooks
    const [hasLost, setHasLost] = useState<boolean>(false);
    const [alertProperties, setAlertProperties] = useState<AlertProperties>({
        visible: true,
        heading: "Welcome",
        body: () => <Instructions />,
        buttonText: "OK.",
        onButtonClick: () => startGame(),
    });
    const [gameProperties, setGameProperties] = useState<GameProperties>({
        gameStarted: false,
        diffcultyLevel: "easy",
    });
    const [questionProperties, setQuestionProperties] =
        useState<QuestionProperties>({
            question: "",
            options: [],
            correct: "",
        });

    const history = useHistory();

    //audio object
    const AUDIOS = {
        intro: new Howl({
            src: ["/kbc_sounds.mp3"],
        }),
        correct: new Howl({
            src: ["/correct.mp3"],
        }),
        wrong: new Howl({
            src: ["/wrong.mp3"],
        }),
    };

    useEffect(() => {
        console.log(questionProperties);
    }, [questionProperties]);

    //important functions

    const fetchQuestions = async () => {
        if (gameProperties.diffcultyLevel === "easy") {
            const res = await fetchEasyQuestions();

            let answers: string[] = [
                ...res.results[0].incorrect_answers,
                res.results[0].correct_answer,
            ];
            answers = shuffle(answers);

            setQuestionProperties({
                ...questionProperties,
                options: answers,
                correct: res.results[0].correct_answer,
                question: res.results[0].question,
            });
        }
    };

    const startGame = () => {
        setAlertProperties({
            ...alertProperties,
            visible: false,
        });
        AUDIOS.intro.play();
        setGameProperties({ ...gameProperties, gameStarted: true });
        fetchQuestions();
    };

    const checkAnswer = (elem: string) => {
        if (elem === questionProperties.correct) {
            setGameProperties({
                ...gameProperties,
                gameStarted: false,
            });
            AUDIOS.correct.play();
            setAlertProperties({
                ...alertProperties,
                visible: true,
                heading: "Correct!",
                body: () => {
                    return <p>You answered the question correct!</p>;
                },
                buttonText: "Next!",
                onButtonClick: () => {
                    fetchQuestions();
                    setAlertProperties({ ...alertProperties, visible: false });
                    setGameProperties({
                        ...gameProperties,
                        gameStarted: true,
                    });
                },
            });
        } else {
            setGameProperties({
                ...gameProperties,
                gameStarted: false,
            });
            AUDIOS.wrong.play();
            setAlertProperties({
                ...alertProperties,
                visible: true,
                heading: "Wrong!!",
                body: () => {
                    return (
                        <p>
                            You answered the question wrong! The answer is{" "}
                            {questionProperties.correct}
                        </p>
                    );
                },
                buttonText: "Restart :(",
                onButtonClick: () => {
                    setHasLost(true);

                    window.location.reload();
                },
            });
        }
    };

    const focusOutCB = () => {
        if (document.visibilityState === "hidden") {
            setAlertProperties({
                ...alertProperties,
                visible: true,
                heading: "Uh, oh! 😱",
                body: () => (
                    <p>
                        Looks like you changed tabs, (most probably to search
                        for the answer) which is not allowed in this game! Don't
                        switch tabs!!! Didn't switch tabs? Report a bug!
                    </p>
                ),
                buttonText: "Retry :(",
                onButtonClick: () => {
                    window.location.reload();
                },
            });
            setHasLost(true);
            setGameProperties({ ...gameProperties, gameStarted: false });
        } else {
            return;
        }
    };

    useEffect(() => {
        window.addEventListener("visibilitychange", focusOutCB);

        return () => window.removeEventListener("visibilitychange", focusOutCB);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <GamePropertiesContext.Provider value={gameProperties}>
                <SetHasLostContext.Provider value={setHasLost}>
                    <SetGamePropertiesContext.Provider
                        value={setGameProperties}
                    >
                        <SetAlertPropetiesContext.Provider
                            value={setAlertProperties}
                        >
                            <GlobalStyles bgColor={colors.primary} />

                            <Switch>
                                <Route path="/" exact>
                                    <Menu
                                        logo={MenuIcon}
                                        onClick={() =>
                                            history.push("/settings")
                                        }
                                    />

                                    {alertProperties.visible ? (
                                        <Alert
                                            heading={alertProperties.heading}
                                            body={alertProperties.body}
                                            buttonText={
                                                alertProperties.buttonText
                                            }
                                            onButtonClick={
                                                alertProperties.onButtonClick
                                            }
                                        />
                                    ) : null}

                                    <Layout>
                                        <Timer />
                                        {/* over here replace 100 by the knowledge points */}
                                        <KnowledgeScore
                                            score={hasLost ? 0 : 100}
                                        />

                                        <section>
                                            <Question
                                                question={
                                                    questionProperties.question
                                                }
                                            />
                                            <OptionGrid>
                                                {questionProperties.options.map(
                                                    (elem) => (
                                                        <Button
                                                            style={{
                                                                margin: 20,
                                                            }}
                                                            key={elem}
                                                            onClick={() =>
                                                                checkAnswer(
                                                                    elem
                                                                )
                                                            }
                                                        >
                                                            {elem}
                                                        </Button>
                                                    )
                                                )}
                                            </OptionGrid>
                                        </section>

                                        <section>
                                            <LifelinesHeader>
                                                Lifelines
                                            </LifelinesHeader>

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

                                <Route path="/settings">
                                    <Settings />
                                </Route>

                                <Route path="*">
                                    <Four />
                                </Route>
                            </Switch>
                        </SetAlertPropetiesContext.Provider>
                    </SetGamePropertiesContext.Provider>
                </SetHasLostContext.Provider>
            </GamePropertiesContext.Provider>
        </React.Fragment>
    );
};

export default App;
export {
    SetHasLostContext,
    GamePropertiesContext,
    SetGamePropertiesContext,
    SetAlertPropetiesContext,
};
