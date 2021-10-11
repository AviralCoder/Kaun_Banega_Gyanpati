import React from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";
import Question from "./components/Question";
import { Layout } from "./layout/layout";

const App = (): JSX.Element => {
    return (
        <React.Fragment>
            <GlobalStyles bgColor={colors.primary} />

            <Layout>
                <Question question="Which name in India means Idle?" />
                <Question question="Which name in India means Idle?" />
                <Question question="Which name in India means Idle?" />
                <Question question="Which name in India means Idle?" />
            </Layout>
        </React.Fragment>
    );
};

export default App;
