import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { menuComponentProps } from "../types/types";

interface styledProps {
    top: string;
    left: string;
}

const OuterDiv = styled.div<styledProps>`
    background-color: ${colors.secondary};
    position: fixed;
    top: ${(props) => props.top};
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: ${(props) => props.left};
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const Menu = (props: menuComponentProps): JSX.Element => {
    return (
        <OuterDiv onClick={props.onClick} top={props.top} left={props.left}>
            <img src={props.logo} alt="Menu logo" width={40} />
        </OuterDiv>
    );
};

export default Menu;
