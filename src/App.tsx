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
import { Howl, Howler } from "howler";

const SetHasLostContext = createContext<
    React.Dispatch<React.SetStateAction<boolean>>
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
}

interface GameProperties {
    knowledgePoints: number;
}

const App = (): JSX.Element => {
    const [hasLost, setHasLost] = useState<boolean>(false);
    const [alertProperties, setAlertProperties] = useState<AlertProperties>({
        visible: true,
    });
    const [gameProperties, setGameProperties] = useState<GameProperties>({
        knowledgePoints: 0,
    });

    const history = useHistory();

    const AUDIOS = {
        intro: new Howl({
            src: ["/kbc_sounds.mp3"],
        }),
    };

    useEffect(() => {
        window.addEventListener("focusout", () => {});
        window.focus();

        return () => window.removeEventListener("focusout", () => {});

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <SetHasLostContext.Provider value={setHasLost}>
                <GlobalStyles bgColor={colors.primary} />

                <Switch>
                    <Route path="/" exact>
                        <Menu
                            logo={MenuIcon}
                            onClick={() => history.push("/settings")}
                        />

                        {alertProperties.visible ? (
                            <Alert
                                heading="Welcome!"
                                body={() => <Instructions />}
                                buttonText="OK."
                                onButtonClick={() => {
                                    setAlertProperties({
                                        ...alertProperties,
                                        visible: false,
                                    });
                                    AUDIOS.intro.play();
                                }}
                            />
                        ) : null}

                        <Layout>
                            <Timer />
                            <KnowledgeScore score={40} />

                            <section>
                                <Question question="Which of these coding languages are statically typed?" />
                                <OptionGrid>
                                    <Button style={{ margin: "20px 20px" }}>
                                        Python
                                    </Button>

                                    <Button style={{ margin: "20px 20px" }}>
                                        JavaScript
                                    </Button>

                                    <Button style={{ margin: "20px 20px" }}>
                                        TypeScript
                                    </Button>

                                    <Button style={{ margin: "20px 20px" }}>
                                        Lua
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

                    <Route path="/settings">
                        <Settings />
                    </Route>

                    <Route path="*">
                        <Four />
                    </Route>
                </Switch>
            </SetHasLostContext.Provider>
        </React.Fragment>
    );
};

export default App;
export { SetHasLostContext };
