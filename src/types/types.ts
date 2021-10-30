// API RESPONSE TYPES

import React from "react";

export type Response = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

// COLOR TYPES

export type Colors = {
    primary: string;
    secondary: string;
    red: string;
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

/// FLEXBOX COMPONENT PROPS

export type flexboxComponentProps = {
    children: React.ReactNode;
};

/// TOOLTIP COMPONENT PROPS

export type tooltipComponentProps = {
    children: React.ReactNode;
    text: string;
};

/// KNOWLEDGE SCORE COMPONENT PROPS

export type knowledgeScoreComponentProps = {
    children?: React.ReactNode;
    score: number;
};

/// MENY COMPONENT PROPS

export type menuComponentProps = {
    logo: string;
    onClick: () => void;
    top: string;
    left: string;
};

/// KNOWLEDGE SCORE CONTEXT PROPS

export type knowledgeScoreContextProps = {
    value: number;
    children: React.ReactNode;
};

/// ALERT COMPONENT PROPS

export type alertComponentProps = {
    heading: string;
    body: () => JSX.Element;
    buttonText?: string;
    onButtonClick?: () => void;
    button2Text?: string;
    onButton2Click?: () => void;
};
