// API RESPONSE TYPES

import React from "react";

export type Questions = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
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

/// QUESTION COMPONENT PROPS

export type questionComponentProps = {
    question: string;
};

/// TIMER COMPONENT PROPS

export type timerComponentProps = {
    time: number;
};

/// OPTION COMPONENT PROPS

export type optionComponentProps = {
    isCorrect: boolean;
};

/// LIFELINE COMPONENT PROPS

export type lifelineComponentProps = {
    children: React.ReactNode;
    onClick: () => void;
};
