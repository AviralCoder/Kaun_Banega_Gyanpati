import React from "react";
import { lifelineComponentProps } from "../types/types";

const Lifeline = (props: lifelineComponentProps): JSX.Element => {
    return <section onClick={props.onClick}>{props.children}</section>;
};

export default Lifeline;
