import { createContext } from "react";
import { knowledgeScoreContextProps } from "../types/types";

const KnowledgeScoreContext = createContext<number>(0);

const ScoreContext = (props: knowledgeScoreContextProps) => {
    return (
        <KnowledgeScoreContext.Provider value={props.value}>
            {props.children}
        </KnowledgeScoreContext.Provider>
    );
};

export default ScoreContext;
