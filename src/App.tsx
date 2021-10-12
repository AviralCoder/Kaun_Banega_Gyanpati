import React from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";
import Question from "./components/Question";
import { Layout } from "./layout/layout";
import Timer from "./components/Timer";
import { Switch, Route } from "react-router-dom";
import Four from "./pages/404";

const App = (): JSX.Element => {
    return (
        <React.Fragment>
            <GlobalStyles bgColor={colors.primary} />

            <Switch>
                <Route path="/" exact>
                    <Layout>
                        <Timer time={20} />
                        <Question question="Which name in India means Idle?" />
                        <Question question="Which name in India means Idle?" />
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
