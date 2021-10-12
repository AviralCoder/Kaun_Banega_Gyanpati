import React from "react";
import styled from "styled-components";
import { tooltipComponentProps } from "../types/types";

const TooltipContainer = styled.div`
    position: relative;

    .tooltip-box {
        position: absolute;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        top: calc(100% + 5px);
        display: none;
        text-align: center;
    }

    .tooltip-box.visible {
        display: block;
    }

    .tooltip-arrow {
        position: absolute;
        top: -10px;
        left: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
    }
`;

const Tooltip = ({ children, text }: tooltipComponentProps) => {
    const [show, setShow] = React.useState(false);

    return (
        <TooltipContainer>
            <div className={show ? "tooltip-box visible" : "tooltip-box"}>
                {text}
                <span className="tooltip-arrow" />
            </div>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
        </TooltipContainer>
    );
};

export default Tooltip;
