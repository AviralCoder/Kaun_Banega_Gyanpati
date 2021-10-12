import styled from "styled-components";
import { colors } from "../lib/colors/colors";

const Button = styled.button`
    padding: 1.5rem;
    background: transparent;
    border: 4px solid ${colors.secondary};
    background: ${colors.secondary};
    border-radius: 30px;
    font-size: 1.5rem;
    color: #fff;
    margin-top: 20px;
    transition: 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        background: transparent;
        column-rule: ${colors.secondary};
    }
`;

export default Button;
