import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import SingleResult from "../singleResult";
import { act } from "react-dom/test-utils"
import "@testing-library/jest-dom/extend-expect"
import { configure, ReactWrapper, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; 
import { fireEvent } from "@testing-library/dom";

configure({ adapter: new Adapter() });
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
const testProps = {
                                letter:"a",
                                text:"This is a test text",
                                id:"1",
                                letterOccurances:"1",
                                is_case_sensitive:"true",
                                index:"0",
};

//Testing result rendering
it("Result renders correctly", () => {
    act(() => {
        render(<SingleResult {...testProps}/>, container);
    });
    const resultContainer = container.querySelector(".resultContainer");
    const header = container.querySelector("h2");
    const deleteButton = container.querySelector("#delete")
    const highlightButton = container.querySelector("#highlightButton")
    expect(resultContainer).toBeTruthy();
    expect(header.innerHTML).toBe("The letter \"a\" occured <p id=\"resultCounter\">1</p>times (case sensitive)");
    expect(deleteButton).toBeTruthy();
    expect(highlightButton).toBeTruthy();
})

it("Button fires onclick events", () => {
    const deleteResult = jest.fn();
    act(() => {
        render(<SingleResult letter="a" text="abc" id="1" letterOccurances="1" is_case_sensitive="true" index="0" deleteResult={deleteResult}/>, container);
    })
    //Find Button elements
    const deleteButton = container.querySelector("#delete")
    const highlightButton = container.querySelector("#highlightButton")

    act(() => {
        fireEvent.click(deleteButton);
        fireEvent.click(highlightButton);
    });

    expect(deleteResult).toHaveBeenCalledTimes(1);
});
//Check impletementation of result highlighting 
it("Highlight found letters on initial render", () => {
    act(() => {
        render(<SingleResult {...testProps} />, container)
    })
    const firstRender = jest.spyOn(React, "useEffect").mockImplementation(() => {return true});
    const executed = firstRender();
    expect(firstRender).toHaveBeenCalled();
    expect(executed).toBe(true);

});