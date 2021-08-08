import React, { useEffect } from "react"
import "./results.css";


function SingleResult(props) {

  const highlightResults = () => {
      try{ 
        const paragraph = document.getElementById(props.id+1)
        let newArray = [...paragraph.innerHTML].map(element => {
            if (props.is_case_sensitive === true) {
                if (element === props.letter) {
                    return "<span title='highlight' class='highlight'>"+element+"</span>"
                }
                return element;
            };
            if (props.is_case_sensitive === false) {
                if (element.toLowerCase() === props.letter.toLowerCase()) {
                    return "<span title='highlight' class='highlight'>"+element+"</span>"
                }
                return element
                }
            });
        paragraph.innerHTML = newArray.join("")
      }
      catch(Error) {
          console.log(Error)
      }
  };

    useEffect(() => {
        highlightResults();
    }, []);

    const hightlight = (id) => {
        const lettersToHighLight = document.getElementById(id+1).querySelectorAll(".highlight")
        for (let i=0; i < lettersToHighLight.length; i++) {
            lettersToHighLight.item(i).classList.toggle("highlighted")
        }
    };
    return (
        <div className="resultContainer" role="container">
                <div className="resultCard" id={props.id}>
                  <h2>The letter "{props.letter}" occured <p id="resultCounter">{props.letterOccurances}</p>{props.letterOccurances == 1 ? "time " : "times "}
                     ({props.is_case_sensitive ? "case sensitive" : "not case sensitive"})</h2>
                <div className="recap">
                    <div className="searchedText">
                        <p>Searched text:</p>
                        <p data-testid="searched" id={props.id + 1}>{props.text}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button id="delete" onClick={()=>{props.deleteResult(props.index, props.id)}} title="highlightButton">Delete</button>
                    <button id="highlightButton"onClick={() => {hightlight(props.id)}} title="deleteButton">Hightlight Letter</button>
                </div>
                </div>
        </div>
    )
};

export default SingleResult;