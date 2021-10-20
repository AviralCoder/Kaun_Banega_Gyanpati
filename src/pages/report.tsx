import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../lib/colors/colors";
import { useForm } from "@formspree/react";
import ButtonBack from "../components/Button";

const Title = styled.h1`
    color: white;
    margin-top: 50px;
    text-align: center;
    font-size: 3rem;
`;

const Description = styled.p`
    color: white;
    margin: 20px 40px;
    font-size: 1.3rem;
    text-align: center;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
`;

const Input = styled.input`
    padding: 1.4rem;
    border-radius: 20px;
    background: white;
    font-size: 1rem;
    width: 500px;
    outline: 0;
    border: 0;
    margin-top: 20px;
`;

const Textarea = styled.textarea`
    padding: 1.2rem;
    background: white;
    border-radius: 20px;
    font-size: 1rem;
    margin-top: 30px;
    width: 500px;
    height: 300px;
    border: 0;
`;

const Button = styled.button`
    border: 0;
    width: 500px;
    padding: 1.4rem;
    color: white;
    font-size: 1rem;
    border-radius: 20px;
    margin-top: 20px;
    background-color: ${colors.secondary};
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

interface Values {
    email: string;
    body: string;
}

const Report = (): JSX.Element => {
    const [form, handleSubmit] = useForm("xayazozo");
    const [values, setValues] = useState<Values>({
        email: "",
        body: "",
    });

    if (form.succeeded) {
        return (
            <React.Fragment>
                <Title>Thanks!</Title>

                <Center>
                    <a href="/">
                        <ButtonBack>Back to home!</ButtonBack>
                    </a>
                </Center>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Title>Report</Title>

            <Description>Report a bug or suggest a feature!</Description>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (
                        values.body.replaceAll(" ", "") === "" ||
                        values.email.replaceAll(" ", "") === ""
                    ) {
                        window.alert("Please put in values.");
                    } else {
                        handleSubmit(e);
                    }
                }}
            >
                <Center>
                    <Input
                        placeholder="Your email (so that I can get back to you)"
                        name="email"
                        value={values.email}
                        type="email"
                        autoComplete="off"
                        onChange={(e) =>
                            setValues({ ...values, email: e.target.value })
                        }
                    />
                </Center>

                <Center>
                    <Textarea
                        placeholder="Report bug or suggest feature "
                        name="body"
                        value={values.body}
                        onChange={(e) => {
                            setValues({ ...values, body: e.target.value });
                        }}
                    />
                </Center>

                <Center>
                    <Button type="submit">
                        {form.submitting ? "Loading..." : "Submit"}
                    </Button>
                </Center>
            </form>
        </React.Fragment>
    );
};

export default Report;
