import React from "react";
import GlobalStyles from "./styles/global";
import { colors } from "./lib/colors/colors";

const App = (): JSX.Element => {
    return (
        <React.Fragment>
            <GlobalStyles bgColor={colors.primary} />
        </React.Fragment>
    );
};

export default App;
