import React, { useEffect } from "react"


function SingleResult(props) {

  const highlightResults = () => {
    const paragraph = document.getElementById("p"+props.id)
    let newArray = [...paragraph.innerHTML].map(element => {
        if (props.is_case_sensitive === true) {
            if (element === props.letter) {
                return "<span class='highlight'>"+element+"</span>"
            }
            return element;
        };
        if (props.is_case_sensitive === false) {
            if (element.toLowerCase() === props.letter.toLowerCase()) {
                return "<span class='highlight'>"+element+"</span>"
            }
            return element
            }
        });
    paragraph.innerHTML = newArray.join("")
  };

    useEffect(() => {
        highlightResults();
    });

    const hightlight = (id) => {
        const lettersToHighLight = document.getElementById("p"+id).querySelectorAll(".highlight")
        for (let i=0; i < lettersToHighLight.length; i++) {
            lettersToHighLight.item(i).classList.toggle("highlighted")
        }
    };
    return (
        <div className="resultContainer">
                <div className="resultCard" id={props.id}>
                  <h3>The letter "{props.letter}" occured <h2>{props.letterOccurances}</h2>{props.letterOccurances == 1 ? "time " : "times "}
                     ({props.is_case_sensitive ? "case sensitive" : "not case sensitive"})</h3>
                <div className="recap">
                    <div className="searchedText">
                        <p>Searched text:</p>
                        <p className="textParagraph" id={"p" + props.id}>{props.text}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button id="delete" onClick={()=>{props.deleteResult(props.index, props.id)}}>Delete</button>
                    <button id="highlightButton"onClick={() => {hightlight(props.id)}}>Hightlight Letter</button>
                </div>
                </div>
        </div>
    )
};

export default SingleResult;
