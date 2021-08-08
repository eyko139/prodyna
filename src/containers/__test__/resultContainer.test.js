
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act  } from "react-dom/test-utils";
import ResultContainer from "../resultContainer";
import { screen } from "@testing-library/react";

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

//API interaction (fetch)
describe("handle fetch", () => {
    //save and restore original fetch function in case of test-leak
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch
    });
    afterEach(() => {
        global.fetch = originalFetch;
    })
    it("fetches data", async() => {
        const fakeResponse = {
            headers: { "Content-type": "application/json"},
            status: 200,
            letter: "a",
            text: "This is a mock string",
            id: "1345",
            letter_occurances: "1",
            is_case_sensitive: "false",
            index: "0"    
        };
        const mRes = { json: jest.fn().mockResolvedValue(fakeResponse) };
        const mockedFetch = jest.fn().mockReturnValue(mRes);
        global.fetch = mockedFetch

        await act(async() => {
            render(<ResultContainer />, container);
        })
        expect(fetch).toHaveBeenCalledTimes(1);

        // const firstRender = jest.spyOn(React, "useEffect").mockImplementation(() => {
        //     setResults(fakeResponse);
        // });
        // const executed = firstRender();
        // expect(firstRender).toHaveBeenCalled();
        // expect(executed).toBe(true);
        });
});
