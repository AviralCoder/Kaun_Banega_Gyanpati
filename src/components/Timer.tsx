import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
    SetHasLostContext,
    GamePropertiesContext,
    SetGamePropertiesContext,
    SetAlertPropetiesContext,
} from "../App";
import { colors } from "../lib/colors/colors";
import { timerComponentProps } from "../types/types";

const TimerText = styled.p`
    color: #fff;
    font-size: 6rem;
    font-family: sans-serif;
    font-weight: 300;
`;

const Circle = styled.div`
    border: 10px solid ${colors.secondary};
    width: 16rem;
    height: 16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 20px 20px ${colors.secondary};
`;

const GridCellCenter = styled.div`
    text-align: center;
    padding: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Timer = (props: any): JSX.Element => {
    const [timerValue, setTimerValue] = useState(60);
    const setHasLost = useContext(SetHasLostContext);
    const gameProperties = useContext(GamePropertiesContext);
    const setGameProperties = useContext(SetGamePropertiesContext);
    const setAlertPropertes = useContext(SetAlertPropetiesContext);

    useEffect(() => {
        let interval: any;

        if (gameProperties.gameStarted === true) {
            interval = setInterval(() => {
                if (timerValue <= 0) {
                    clearInterval(interval);
                    setHasLost(true);
                    setGameProperties({
                        ...gameProperties,
                        gameStarted: false,
                    });
                    setAlertPropertes({
                        heading: "You lost! 😓",
                        visible: true,
                        body: () => (
                            <p>
                                You lost because you crossed 60s to answer this
                                question!
                            </p>
                        ),
                        buttonText: "Retry :(",
                        onButtonClick: () => {
                            window.location.reload();
                        },
                    });
                } else setTimerValue((timer) => timer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    });

    return (
        <GridCellCenter>
            <div>
                <Circle>
                    <TimerText>{timerValue}</TimerText>
                </Circle>
            </div>
        </GridCellCenter>
    );
};

export default Timer;
