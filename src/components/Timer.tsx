import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
    SetHasLostContext,
    GamePropertiesContext,
    SetGamePropertiesContext,
    SetAlertPropetiesContext,
    AlertPropertiesContext,
    AUDIOS,
} from "../App";
import { colors } from "../lib/colors/colors";

interface CircleProps {
    outlineColour: string;
}

const TimerText = styled.p`
    color: #fff;
    font-size: 6rem;
    font-family: sans-serif;
    font-weight: 300;
`;

const Circle = styled.div<CircleProps>`
    border: 10px solid ${(props) => props.outlineColour};
    width: 16rem;
    height: 16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 20px 20px ${(props) => props.outlineColour};
    transition: 0.3s ease;
`;

const GridCellCenter = styled.div`
    text-align: center;
    padding: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Timer = (): JSX.Element => {
    const [timerValue, setTimerValue] = useState(60);
    const setHasLost = useContext(SetHasLostContext);
    const gameProperties = useContext(GamePropertiesContext);
    const setGameProperties = useContext(SetGamePropertiesContext);
    const setAlertPropertes = useContext(SetAlertPropetiesContext);
    const alertProperties = useContext(AlertPropertiesContext);
    const [colours, setColours] = useState(colors.secondary);

    useEffect(() => {
        setTimerValue(60);
    }, [gameProperties.gameStarted]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (timerValue <= 10) {
            setColours(colors.red);
            AUDIOS.beep.play();
        } else {
            setColours(colors.secondary);
            AUDIOS.beep.stop();
        }

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
                    AUDIOS.wrong.play();
                    setAlertPropertes({
                        ...alertProperties,
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
                <Circle outlineColour={colours}>
                    <TimerText>{timerValue}</TimerText>
                </Circle>
            </div>
        </GridCellCenter>
    );
};

export default Timer;
