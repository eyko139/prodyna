import React from "react";
import "./results.css";

function Result(props) {
  const isLoading = props.results ? true : false;

  const hightlight = (paragraphToHighlight, letter) => {
    const paragraph = document.getElementById("p"+paragraphToHighlight)
    const initialInnerHtml = paragraph.innerHTML
    let innerArray = [...paragraph.innerHTML]
    if (!paragraph.classList.contains("highlighted")) {
      let newArray = innerArray.map(element => {
        if (element === letter) {
          return "<span class='highlight'>"+element+"</span>"
        }
        return element
      })
      paragraph.innerHTML = newArray.join("")
      paragraph.classList.toggle("highlighted")
    } else {
      paragraph.innerHTML = innerArray
      paragraph.classList.toggle("highlighted")
    }

  }
    return (
        <div className="resultContainer">
            <h1>{isLoading ? "Results:": "loading"}</h1>
              { props.results.map((element, index) => (
                <div className="resultCard" id={element.id}>
                  <h3>Result: {element.letter_occurances}</h3>
                  <p> Letter: {element.letter}<br/></p>
                  <p id={"p" + element.id}>{[...element.text]}"</p>
                  <p>Case sensitive search was <span>{element.is_case_sensitive ? "active" : "not active"}</span></p>
                <button id="delete" onClick={()=>{props.deleteResult(index, element.id)}}>Delete</button>
                <button onClick={() => {hightlight(element.id, element.letter)}}>Click</button>
                </div>
              ))
              }
        </div>
    )
};

export default Result;