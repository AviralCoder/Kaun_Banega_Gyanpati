import { Response } from "../types/types";

export const fetchEasyQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://triviaapi-production.up.railway.app//questions/difficulty/easy/random";

    return await (await fetch(endPoint)).json();
};

export const fetchMediumQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://triviaapi-production.up.railway.app//questions/difficulty/medium/random";

    return await (await fetch(endPoint)).json();
};

export const fetchDifficultQuestions = async (): Promise<Response> => {
    const endPoint: string =
        "https://triviaapi-production.up.railway.app//questions/difficulty/hard/random";

    return await (await fetch(endPoint)).json();
};
