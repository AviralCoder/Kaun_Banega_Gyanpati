import React, { createContext, useEffect, useRef, useState } from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";
import Question from "./components/Question";
import { Layout } from "./layout/layout";
import Timer from "./components/Timer";
import { Switch, Route, useLocation } from "react-router-dom";
import Four from "./pages/404";

import { OptionGrid } from "./layout/OptionGrid";
import Button from "./components/Button";
import Lifeline from "./components/Lifeline";
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
import { shuffle, removeEncoding } from "./utils/utils";
import fifty_fifty from "./images/5050.png";
import ChatIcon from "./images/chat.jpg";
import Report from "./pages/report";

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
const AlertPropertiesContext = createContext<AlertProperties>({
    visible: false,
    heading: "",
    body: () => <p></p>,
    buttonText: "",
    onButtonClick: () => {
        return;
    },
});

const LifelineLogo = styled.img`
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
    incorrret: string[];
}

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
    beep: new Howl({
        src: ["/clock.mp3"],
    }),
};

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
    const knowledgePoints = useRef<number>(0);
    const [questionProperties, setQuestionProperties] =
        useState<QuestionProperties>({
            question: "",
            options: [],
            correct: "",
            incorrret: [],
        });
    const [lifelineProperties, setLifelineProperties] = useState({
        googleUsed: false,
        halfUsed: false,
        flipUsed: false,
    });
    const location = useLocation();

    // code to remove spinner when app is loaded

    useEffect(() => {
        document.getElementById("center")?.remove();
    }, []);

    useEffect(() => {
        console.log(questionProperties);
    }, [questionProperties]);

    //important functions

    const fetchQuestions = async () => {
        setQuestionProperties({ ...questionProperties, question: "Loading.." });
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
            setGameProperties({ ...gameProperties, gameStarted: true });
        }
    };

    const startGame = (): void => {
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
            knowledgePoints.current = knowledgePoints.current + 100;
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
                            {removeEncoding(questionProperties.correct)}. You
                            scored {knowledgePoints.current}
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

    const focusOutCB = (): void => {
        if (location.pathname === "/") {
            if (document.visibilityState === "hidden") {
                AUDIOS.wrong.play();
                setAlertProperties({
                    ...alertProperties,
                    visible: true,
                    heading: "Uh, oh! 😱",
                    body: () => (
                        <p>
                            Looks like you changed tabs, (most probably to
                            search for the answer) which is not allowed in this
                            game! Don't switch tabs!!! Didn't switch tabs?
                            Report a bug!
                        </p>
                    ),
                    buttonText: "Retry :(",
                    onButtonClick: () => {
                        window.location.reload();
                    },
                });
                setHasLost(true);
                setGameProperties({ ...gameProperties, gameStarted: false });
                window.removeEventListener("visibilitychange", focusOutCB);
            } else {
                return;
            }
        } else {
            return;
        }
    };

    const flipQuestion = (): void => {
        setAlertProperties({
            ...alertProperties,
            visible: true,
            heading: "Are you sure?",
            body: () => (
                <p>
                    Do you really want to take the flip the question lifeline?
                    Click Yes to flip or press esc on your keyboard to cancel.
                    Be fast! The timer won't reset and is still running!
                </p>
            ),
            buttonText: "Yes",
            onButtonClick: () => {
                fetchQuestions();
                setLifelineProperties({
                    ...lifelineProperties,
                    flipUsed: true,
                });
                setAlertProperties({ ...alertProperties, visible: false });
            },
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setAlertProperties({ ...alertProperties, visible: false });
            } else {
                return;
            }
        });
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
                            <AlertPropertiesContext.Provider
                                value={alertProperties}
                            >
                                <GlobalStyles bgColor={colors.primary} />

                                <Switch>
                                    <Route path="/" exact>
                                        <a href="/settings">
                                            <Menu
                                                logo={MenuIcon}
                                                onClick={() => {}}
                                                top="40px"
                                                left="40px"
                                            />
                                        </a>

                                        <a href="/report">
                                            <Menu
                                                logo={ChatIcon}
                                                top="130px"
                                                left="40px"
                                                onClick={() => {}}
                                            />
                                        </a>

                                        {alertProperties.visible ? (
                                            <Alert
                                                heading={
                                                    alertProperties.heading
                                                }
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
                                                score={
                                                    hasLost
                                                        ? 0
                                                        : knowledgePoints.current
                                                }
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
                                                                {removeEncoding(
                                                                    elem
                                                                )}
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
                                                    {!lifelineProperties.flipUsed ? (
                                                        <Tooltip
                                                            text={
                                                                "Change the question!"
                                                            }
                                                        >
                                                            <Lifeline
                                                                onClick={
                                                                    flipQuestion
                                                                }
                                                            >
                                                                <LifelineLogo
                                                                    src={
                                                                        FlipIcon
                                                                    }
                                                                    alt="Flip Icon"
                                                                />
                                                            </Lifeline>
                                                        </Tooltip>
                                                    ) : null}

                                                    <Tooltip text="Remove 2 of the wrong answers!">
                                                        <Lifeline
                                                            onClick={() => {
                                                                console.log(
                                                                    "50:50 life line taken"
                                                                );
                                                            }}
                                                        >
                                                            <LifelineLogo
                                                                src={
                                                                    fifty_fifty
                                                                }
                                                                alt="50:50 icon"
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

                                    <Route path="/report">
                                        <Report />
                                    </Route>

                                    <Route path="*">
                                        <Four />
                                    </Route>
                                </Switch>
                            </AlertPropertiesContext.Provider>
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
    AlertPropertiesContext,
    AUDIOS,
};
