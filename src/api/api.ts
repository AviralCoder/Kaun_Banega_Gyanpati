import { Response } from "../types/types";

export const fetchEasyQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://trivia-api-kbg.herokuapp.com/questions/difficulty/easy/random";

    return await (await fetch(endPoint)).json();
};

export const fetchMediumQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://trivia-api-kbg.herokuapp.com/questions/difficulty/medium/random";

    return await (await fetch(endPoint)).json();
};

export const fetchDifficultQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://trivia-api-kbg.herokuapp.com/questions/difficulty/hard/random";

    return await (await fetch(endPoint)).json();
};
