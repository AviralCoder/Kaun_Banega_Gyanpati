import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { menuComponentProps } from "../types/types";

const OuterDiv = styled.div`
    background-color: ${colors.secondary};
    position: absolute;
    top: 20px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const Menu = (props: menuComponentProps) => {
    return (
        <OuterDiv onClick={props.onClick}>
            <img src={props.logo} alt="Menu logo" width={40} />
        </OuterDiv>
    );
};

export default Menu;
