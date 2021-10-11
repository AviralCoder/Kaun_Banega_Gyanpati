import styled from "styled-components";
import { questionComponentProps } from "../types/types";

const QuestionText = styled.p`
    color: white;
`;

const Question = (props: questionComponentProps): JSX.Element => {
    return (
        <section className="question">
            <QuestionText>{props.question}</QuestionText>
        </section>
    );
};

export default Question;
