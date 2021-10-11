// API RESPONSE TYPES

export type Questions = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    ncorrect_answers: string[];
};

export type Response = {
    response_code: number;
    results: Questions[];
};

// COLOR TYPES

export type Colors = {
    primary: string;
    secondary: string;
};
