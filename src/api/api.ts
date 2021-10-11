import { Response } from "../types/types";

export const fetchEasyQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

    return await (await fetch(endPoint)).json();
};

export const fetchMediumQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";

    return await (await fetch(endPoint)).json();
};
