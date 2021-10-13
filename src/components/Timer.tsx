import styled from "styled-components";
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

const Timer = (props: timerComponentProps): JSX.Element => {
    return (
        <GridCellCenter>
            <div>
                <Circle>
                    <TimerText>{props.time}</TimerText>
                </Circle>
            </div>
        </GridCellCenter>
    );
};

export default Timer;
