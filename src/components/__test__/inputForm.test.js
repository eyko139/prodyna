
import React from "react";
import InputForm from "../inputForm";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

//Correct Input form render WITHOUT validation errors
it("check input form render", () => {
    const { queryByRole, queryAllByRole, getByLabelText } = render(<InputForm
                                errors={{letter:"",
                                        text: ""}}
    
    />);

    const container = queryByRole("container");
    const textbox = queryAllByRole("textbox");
    const checkbox = getByLabelText("Enable case sensitivity");
    expect(container).toBeTruthy();
    expect(textbox).toBeTruthy();
    expect(checkbox).toBeTruthy();
});

//Correct input form render WITH letter input error
it("check form render with letter input error", () => {
    const { getByText } = render(<InputForm errors={{letter: "Only letters"}}/>);
    const error = getByText("Only letters");

    expect(error).toBeTruthy();
});

//Correct input form render WITH text input error 
it("check form render with letter text error", () => {
    const { getByText } = render(<InputForm errors={{text: "Field cannot be empty"}}/>);
    const error = getByText("Field cannot be empty");

    expect(error).toBeTruthy();
});

//Testing all input fields on values onChange
describe("changeInInput", () => {
    it("onChange", () => {
        const { getByLabelText } = render(<InputForm errors={{letter: "Can't be empty", text: "Can't be empty"}}/>);
        const letterInput = getByLabelText("Letter:")
        fireEvent.change(letterInput, { target: { value: "testValue" }});
        expect(letterInput.value).toBe("testValue");
    });
    it("onChange", () => {
        const { getByLabelText } = render(<InputForm errors={{letter: "Can't be empty", text: "Can't be empty"}}/>);
        const letterInput = getByLabelText("Text:")
        fireEvent.change(letterInput, { target: { value: "testValue" }});
        expect(letterInput.value).toBe("testValue");
    });
    it("onChange", () => {
        const { getByLabelText } = render(<InputForm errors={{letter: "Can't be empty", text: "Can't be empty"}}/>);
        const letterInput = getByLabelText("Enable case sensitivity")
        fireEvent.change(letterInput, { target: { value: "testValue" }});
        expect(letterInput.value).toBe("testValue");
    });
});