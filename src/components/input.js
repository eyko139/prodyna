import React from "react";
import "./input.css";

function Input(props) {
    const { handleCase, handleCaseChange, handleLetterChange, handleSubmit, handleTextChange, text, letter, caseSensitivity} = props;

    return (
        <div className="inputContainer">
            <h1>Input data below</h1>
            <div className="formContainer">
                <form method="" onSubmit={handleSubmit}>
                    <div className="formField">
                        <label htmlFor="letterInput">Letter:</label>
                        <input onChange={handleLetterChange} id="letterInput" type="text" maxLength="1"value={letter} placeholder="Input single letter"></input>
                    </div>
                    <div className="formField">
                        <label htmlFor="textInput">Text:</label>
                        <textarea onChange={handleTextChange} id="textInput" name="text" type="text" rows="2" cols="50" value={text} placeholder="Input text here..."></textarea>
                    </div>
                    <div className="formField">
                        <label htmlFor="case">Enable case sensitivity</label>
                        <input type="checkbox" onClick={handleCaseChange} id="case" value={caseSensitivity ? true : false }></input>
                    </div>
                    <div className="formField buttonfield">
                        <button  type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default Input;