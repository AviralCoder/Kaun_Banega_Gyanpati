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
import Alert from "./components/Alert";
import Instructions from "./components/Instructions";
import { Howl } from "howler";
import {
    fetchDifficultQuestions,
    fetchEasyQuestions,
    fetchMediumQuestions,
} from "./api/api";
import { shuffle, removeEncoding } from "./utils/utils";
import ChatIcon from "./images/chat.jpg";
import Report from "./pages/report";
import toast, { Toaster } from "react-hot-toast";
import { HARD_CHANGE, MEDIUM_CHANGE, WON } from "./lib/lib";
import domtoimage from "dom-to-image";
import useDimension from "./hooks/useDimension";
import Mobile from "./error/Mobile";

const GamePropertiesContext = createContext<GameProperties>({
    knowledgePoints: 0,
    gameStarted: false,
    diffcultyLevel: "easy",
});

//dont judge this section of the code!
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
    button2Text?: string;
    onButton2Click?: () => void;
}

type DifficultyLevel = "easy" | "medium" | "hard";

interface GameProperties {
    knowledgePoints?: number;
    gameStarted: boolean;
    diffcultyLevel: DifficultyLevel;
}
interface QuestionProperties {
    question: string;
    options: string[];
    correct: string;
    incorrret: string[];
}

//audio object
// audios of intor, correct, wrong and beep.
// intro sound played when the game starts
// correct sound played when correct answer is done
// wrong sound played when user loses i.e. switches tab, gives wrong answer, timer goes out
// howler.js used
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
    //some state
    const [hasLost, setHasLost] = useState<boolean>(false);
    const [alertProperties, setAlertProperties] = useState<AlertProperties>({
        visible: true,
        heading: "Sorry!",
        body: () => <Instructions />,
        buttonText: "OK.",
        onButtonClick: () => {
            console.log("fail");
        }
//         onButtonClick: async () => {
//             setAlertProperties({
//                 ...alertProperties,
//                 body: () => (
//                     <p>
//                         Please wait while we activate the dyno (will take around
//                         5-10s). This will automatically close when dyno is
//                         activated.
//                     </p>
//                 ),
//                 onButtonClick: () => {},
//             });
//             await fetchEasyQuestions();
//             setAlertProperties({ ...alertProperties, visible: false });
//             startGame();
        },
    });
    const [gameProperties, setGameProperties] = useState<GameProperties>({
        gameStarted: false,
        diffcultyLevel: "easy",
    });
    const difficultyLevel = useRef<DifficultyLevel>("easy");
    const knowledgePoints = useRef<number>(0);
    const [questionProperties, setQuestionProperties] =
        useState<QuestionProperties>({
            question: "",
            options: [],
            correct: "",
            incorrret: [],
        });
    const [lifelineProperties, setLifelineProperties] = useState({
        flipUsed: false,
        flip2Used: false,
    });
    const location = useLocation();
    const dimension = useDimension();

    // code to remove spinner when app is loaded

    useEffect(() => {
        document.getElementById("center")?.remove();
    }, []);

    //important functions

    // fetches a question, puts a loading text while the question is being fetched
    const fetchQuestions = async () => {
        // set the questiont to laoding
        setQuestionProperties({
            ...questionProperties,
            question: "Loading..",
            options: [],
        });
        if (difficultyLevel.current === "easy") {
            // fetch easy questions and set text to that question..
            const res = await fetchEasyQuestions();

            let answers: string[] = [
                ...res.incorrect_answers,
                res.correct_answer,
            ];
            // shuffle the options
            answers = shuffle(answers);

            setQuestionProperties({
                ...questionProperties,
                options: answers,
                correct: res.correct_answer,
                question: res.question,
            });
        } else if (difficultyLevel.current === "medium") {
            const res = await fetchMediumQuestions();

            let answers: string[] = [
                ...res.incorrect_answers,
                res.correct_answer,
            ];
            // shuffle options
            answers = shuffle(answers);

            setQuestionProperties({
                ...questionProperties,
                options: answers,
                correct: res.correct_answer,
                question: res.question,
            });
        } else if (difficultyLevel.current === "hard") {
            const res = await fetchDifficultQuestions();

            let answers: string[] = [
                ...res.incorrect_answers,
                res.correct_answer,
            ];
            // shuffle options
            answers = shuffle(answers);

            setQuestionProperties({
                ...questionProperties,
                options: answers,
                correct: res.correct_answer,
                question: res.question,
            });
        }
        // set game started to true so that the timer starts
        setGameProperties({ ...gameProperties, gameStarted: true });
    };

    // all questions to run when the game start
    const startGame = (): void => {
        setAlertProperties({
            ...alertProperties,
            visible: false,
        });
        AUDIOS.intro.play();
        setGameProperties({ ...gameProperties, gameStarted: true });
        fetchQuestions();
    };

    const checkDifficulty = (): void => {
        if (knowledgePoints.current === MEDIUM_CHANGE) {
            toast("Difficulty changed to Medium!", {
                icon: "👏🏻",
                style: { zIndex: 9999999999 },
            });
            difficultyLevel.current = "medium";
        } else if (knowledgePoints.current === HARD_CHANGE) {
            toast("Difficulty changed to Hard!", {
                icon: "👏🏻",
                style: { zIndex: 9999999999 },
            });
            difficultyLevel.current = "hard";
        } else if (knowledgePoints.current === WON) {
            setAlertProperties({
                ...alertProperties,
                visible: true,
                heading: "You did it!",
                body: () => (
                    <p>
                        You have won the game! You answered all the questions
                        right! There aren't any more quetions. Well done!{" "}
                    </p>
                ),
                buttonText: "Play again!",
                onButtonClick: () => window.location.reload(),
            });
        }
    };

    const downloadScore = (): void => {
        const node = document.getElementById("alert-inner");

        setAlertProperties({
            ...alertProperties,
            visible: true,
            heading: "Congrats!",
            button2Text: "KBG!",
            buttonText: ":)",
            body: () => (
                <p>The user has fairly won {knowledgePoints.current}</p>
            ),
        });

        domtoimage.toJpeg(node!, { quality: 0.95 }).then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "score.jpeg";
            link.href = dataUrl;
            link.click();
            link.remove();

            setAlertProperties({
                ...alertProperties,
                visible: true,
                heading: "Downloaded!",
                buttonText: "Play Again :(",
                body: () => <p>Your score has been downloaded!</p>,
                onButtonClick: () => {
                    window.location.reload();
                },
            });
        });
    };

    const checkAnswer = (elem: string): void => {
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
                    checkDifficulty();
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
                button2Text: "Download Score",
                onButton2Click: () => downloadScore(),
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

    const flipQuestion = (flip: string): void => {
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
                if (flip === "1") {
                    setLifelineProperties({
                        ...lifelineProperties,
                        flipUsed: true,
                    });
                } else {
                    setLifelineProperties({
                        ...lifelineProperties,
                        flip2Used: true,
                    });
                }
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

    console.log(location);

    if (dimension.width! <= 768) {
        if (location.pathname !== "/width=mobile") {
            window.location.href = "/width=mobile";
        }
    }

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
                                        <Toaster />

                                        <a
                                            href="/report"
                                            title="Go to report page"
                                        >
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
                                                button2Text={
                                                    alertProperties.button2Text
                                                }
                                                onButton2Click={
                                                    alertProperties.onButton2Click
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
                                                {lifelineProperties.flip2Used &&
                                                lifelineProperties.flipUsed ? (
                                                    <LifelinesHeader>
                                                        All lifelines used!
                                                    </LifelinesHeader>
                                                ) : (
                                                    <LifelinesHeader>
                                                        Lifelines
                                                    </LifelinesHeader>
                                                )}

                                                <Flexbox>
                                                    {!lifelineProperties.flipUsed ? (
                                                        <Tooltip
                                                            text={
                                                                "Change the question!"
                                                            }
                                                        >
                                                            <Lifeline
                                                                onClick={() =>
                                                                    flipQuestion(
                                                                        "1"
                                                                    )
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

                                                    {!lifelineProperties.flip2Used ? (
                                                        <Tooltip
                                                            text={
                                                                "Change the question!"
                                                            }
                                                        >
                                                            <Lifeline
                                                                onClick={() =>
                                                                    flipQuestion(
                                                                        "2"
                                                                    )
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
                                                </Flexbox>
                                            </section>
                                        </Layout>
                                    </Route>

                                    <Route path="/report">
                                        <Report />
                                    </Route>

                                    <Route path="/width=mobile">
                                        <Mobile title="Sorry, please view this game on a laptop/desktop for best experience" />
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
