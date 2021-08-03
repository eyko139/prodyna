import React from "react";

function Result(props) {
  const isLoading = props.results ? true : false;
    return (
        <div>
            <h1>{isLoading ? "Results:": "loading"}</h1>
            <ul>
              { props.results.map((element, index) => (
                <li key={index}>
                <div>
                <p>
                  Searched Text: "{element.text}"<br/>
                  Searched Letter: {element.letter}<br/>
                  Searched Letter occures {element.letter_occurances} times in the text<br/>
                  Case sensitive search was {element.is_case_sensitive ? "active" : "not active"}
                </p>
                </div>
                </li>
              ))
              }
          </ul>
        </div>
    )
};

export default Result;
