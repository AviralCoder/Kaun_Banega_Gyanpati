import React from "react";
import { optionComponentProps } from "../types/types";
import Button from "./Button";

const Option = (props: optionComponentProps): JSX.Element => {
    return (
        <React.Fragment>
            <Button style={{ margin: "20px 20px" }}>hi</Button>
        </React.Fragment>
    );
};

export default Option;
