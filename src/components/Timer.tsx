// uncomment all

// import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import { SetHasLostContext } from "../App";
import { colors } from "../lib/colors/colors";
// import { timerComponentProps } from "../types/types";

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
    // const [timerValue, setTimerValue] = useState(60);
    // const setHasLost = useContext(SetHasLostContext);

    // useEffect(() => {
    //     // const interval = setInterval(() => {
    //     //     if (timerValue === 0) {
    //     //         alert("lost!");
    //     //         clearInterval(interval);
    //     //         setHasLost(true);
    //     //     } else setTimerValue((timer) => timer - 1);
    //     // }, 1000);
    //     // return () => clearInterval(interval);
    // });

    return (
        <GridCellCenter>
            <div>
                <Circle>
                    <TimerText>
                        60 {/* REPLACE THIS WITH TIMER VALUE*/}
                    </TimerText>
                </Circle>
            </div>
        </GridCellCenter>
    );
};

export default Timer;
