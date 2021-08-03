import React from "react";

function Input(props) {
    const { handleCase, handleCaseChange, handleLetterChange, handleSubmit, handleTextChange, text, letter, caseSensitivity} = props;

    return (
        <form method="" onSubmit={handleSubmit}>
            <label htmlFor="textInput">Input Text</label>
            <textarea onChange={handleTextChange} id="text" name="text" type="text" rows="2" cols="50" value={text} placeholder="Input text here..."></textarea>
            <label htmlFor="letterInput">Search for Letter</label>
            <input onChange={handleLetterChange} type="text" maxLength="1"value={letter}></input>
            <button  type="submit">Submit</button>
            <label htmlFor="Case">Enable case sensitivity</label>
            <input type="checkbox" onClick={handleCaseChange} id="case" value={caseSensitivity ? true : false }></input>
        </form>
        
    )
}
export default Input;