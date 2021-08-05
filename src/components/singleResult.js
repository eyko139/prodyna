import React, { useEffect } from "react"


function SingleResult(props) {
  const isLoading = props.letter ? true : false;

  useEffect(() => {
    const paragraph = document.getElementById("p"+props.id)
    let newArray = [...paragraph.innerHTML].map(element => {
        if (props.is_case_sensitive === true) {
            if (element === props.letter) {
                return "<span class='highlight'>"+element+"</span>"
            }
            return element;
        }
        if (props.is_case_sensitive === false) {
            if (element.toLowerCase() === props.letter.toLowerCase()) {
                return "<span class='highlight'>"+element+"</span>"
            }
            return element
            }
        })
    paragraph.innerHTML = newArray.join("")
    }, [])

    const hightlight = (id) => {
        const lettersToHighLight = document.getElementById("p"+id).querySelectorAll(".highlight")
        for (let i=0; i < lettersToHighLight.length; i++) {
            lettersToHighLight.item(i).classList.toggle("highlighted")
        }
    }
    return (
        <div className="resultContainer">
            <h1>{isLoading ? "Results:": "loading"}</h1>
                <div className="resultCard" id={props.id}>
                  <h3>Result: {props.letterOccurances} ({props.is_case_sensitive ? "case sensitive" : "not case sensitive"})</h3>
                <div className="recap">
                    <div className="searchedLetter">
                        <h4>Searched letter:</h4>
                        <p>{props.letter}</p>
                    </div>
                    <div className="searchedText">
                        <h4>Searched text:</h4>
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
}

export default SingleResult;