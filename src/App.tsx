import React, { useEffect, useState } from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";
import Question from "./components/Question";
import { Layout } from "./layout/layout";
import Timer from "./components/Timer";
import { Switch, Route } from "react-router-dom";
import Four from "./pages/404";
import {
    fetchDifficultQuestions,
    fetchEasyQuestions,
    fetchMediumQuestions,
} from "./api/api";

const App = (): JSX.Element => {
    const [question, setQuestion] = useState<string>("");
    const [difficultyLevel, setDifficultyLevel] = useState<string>("easy");

    const fetchQuestion = async () => {
        if (difficultyLevel === "easy") {
            const res = await fetchEasyQuestions();

            setQuestion(res.results[0].question);
        } else if (difficultyLevel === "medum") {
            const res = await fetchMediumQuestions();

            setQuestion(res.results[0].question);
        } else if (difficultyLevel === "hard") {
            const res = await fetchDifficultQuestions();

            setQuestion(res.results[0].question);
        } else {
            throw new Error("No difficulty passed!");
        }
    };

    useEffect(() => {
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <GlobalStyles bgColor={colors.primary} />

            <Switch>
                <Route path="/" exact>
                    <Layout>
                        <Timer time={20} />
                        <Question question="Which name in India means Idle?" />
                        <Question question={question} />
                        <Question question="Which name in India means Idle?" />
                    </Layout>
                </Route>

                <Route path="*">
                    <Four />
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default App;
