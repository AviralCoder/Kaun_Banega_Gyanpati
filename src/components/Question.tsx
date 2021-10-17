import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { questionComponentProps } from "../types/types";
import { removeEncoding } from "../utils/utils";

const QuestionDiv = styled.div`
    border: 2px solid ${colors.secondary};
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin: 0 20px;
`;

const QuestionText = styled.p`
    color: white;
    font-size: 1.1rem;
    user-select: none;
    text-align: center;
`;

const Question = (props: questionComponentProps): JSX.Element => {
    const editedText = removeEncoding(props.question);

    const finalText = editedText;

    return (
        <section className="question">
            <QuestionDiv>
                <QuestionText>{finalText}</QuestionText>
            </QuestionDiv>
        </section>
    );
};

export default Question;
