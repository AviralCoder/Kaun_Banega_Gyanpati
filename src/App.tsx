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
import {
    fetchDifficultQuestions,
    fetchEasyQuestions,
    fetchMediumQuestions,
} from "./api/api";

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
    knowledgePoints: number;
    gameStarted: boolean;
    diffcultyLevel: string;
}

interface QuestionProperties {
    question: string;
    options: string[];
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
        knowledgePoints: 0,
        gameStarted: false,
        diffcultyLevel: "easy",
    });
    const [questionProperties, setQuestionProperties] =
        useState<QuestionProperties>({
            question: "",
            options: ["", "", "", ""],
        });

    const history = useHistory();

    //audio object
    const AUDIOS = {
        intro: new Howl({
            src: ["/kbc_sounds.mp3"],
        }),
    };

    //important functions

    const fetchQuestions = async () => {
        if (gameProperties.diffcultyLevel === "easy") {
            const res = await fetchEasyQuestions();
        } else if (gameProperties.diffcultyLevel === "medium") {
            const res = await fetchMediumQuestions();
        } else if (gameProperties.diffcultyLevel === "hard") {
            const res = await fetchDifficultQuestions();
        }
    };

    const startGame = () => {
        setAlertProperties({
            ...alertProperties,
            visible: false,
        });
        AUDIOS.intro.play();
        setGameProperties({ ...gameProperties, gameStarted: true });
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
                                        <KnowledgeScore score={40} />

                                        <section>
                                            <Question question="Which of these coding languages are statically typed?" />
                                            <OptionGrid>
                                                <Button
                                                    style={{
                                                        margin: "20px 20px",
                                                    }}
                                                >
                                                    Python
                                                </Button>

                                                <Button
                                                    style={{
                                                        margin: "20px 20px",
                                                    }}
                                                >
                                                    JavaScript
                                                </Button>

                                                <Button
                                                    style={{
                                                        margin: "20px 20px",
                                                    }}
                                                >
                                                    TypeScript
                                                </Button>

                                                <Button
                                                    style={{
                                                        margin: "20px 20px",
                                                    }}
                                                >
                                                    Lua
                                                </Button>
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
