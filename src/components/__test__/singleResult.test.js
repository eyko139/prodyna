import React from "react";
import SingleResult from "../singleResult";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import { deleteResult } from "../../containers/resultContainer";
import renderer from "react-test-renderer";
import {screen} from '@testing-library/dom';

afterEach(cleanup);
//Testing result rendering
it("Result renders correctly", () => {
    const { getByTitle, getByText, getByRole, getAllByRole } = render(<SingleResult 
                                letter="a"
                                text="This is a test text"
                                id="1"
                                letterOccurances="1"
                                is_case_sensitive="true"
                                index="0"
                                deleteResult={deleteResult}
                                    />);
    const container = getByRole("container");
    const header = getByRole("heading", {level: 2})
    const buttons = getAllByRole("button")
    expect(container).toBeTruthy();
    expect(header.innerHTML).toBe("The letter \"a\" occured <p id=\"resultCounter\">1</p>time (case sensitive)");
    expect(buttons).toBeTruthy();
})

//Testing highlight function
describe("clickHighlight", () => {
    it("onClick", () => {
        const renderFn = jest.fn().mockReturnValue(null);
        const wrapper = render(<SingleResult
                                letter="a"
                                text="Thisisatesttext"
                                id={Date.now()}
                                letterOccurances="1"
                                is_case_sensitive="true"
                                index="0"
                                deleteResult = {deleteResult}
                                />)

        // const { getByText, getAllByTitle, getByTitle} = render(<SingleResult 
                                // letter="a"
                                // text="This is a test text"
                                // id="1"
                                // letterOccurances="1"
                                // is_case_sensitive="true"
                                // index="0"
                                // deleteResult = {deleteResult}
        //                             />);
        const highlightButton = wrapper.getByTitle("highlightButton");
        expect(highlightButton).toBeTruthy();
        const searchedTExt = wrapper.getByTestId("searched");
        let highlightedLetters;
        setTimeout(() => {
            expect(searchedTExt.textContent).toBe("Thisisatesttext");
            highlightedLetters = screen.getAllByTitle("highlight");
            console.log(highlightedLetters)
        }, 150)
        fireEvent.click(highlightButton);
        expect(highlightedLetters.style.color).toBe("red");
    });
});

// test("Test 1", () => {
//     const component = renderer.create(
//       <SingleResult 
//                                 letter="a"
//                                 text="This is a test text"
//                                 id="1"
//                                 letterOccurances="1"
//                                 is_case_sensitive="true"
//                                 index="0"
//                                 deleteResult={deleteResult}
//                                 />
//     );
  
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });