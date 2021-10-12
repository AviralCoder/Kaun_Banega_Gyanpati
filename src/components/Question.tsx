import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { questionComponentProps } from "../types/types";

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
    const editedText: string = props.question.replaceAll("&quot;", '"');
    const editedText2: string = editedText.replaceAll("&rsquo;", "'");
    const editedText3: string = editedText2.replaceAll("&#039;", "'");
    const editedText4: string = editedText3.replaceAll("&eacute;", "é");
    const editedText5: string = editedText4.replaceAll("&amp;", "&");

    const finalText = editedText5;

    return (
        <section className="question">
            <QuestionDiv>
                <QuestionText>{finalText}</QuestionText>
            </QuestionDiv>
        </section>
    );
};

export default Question;
