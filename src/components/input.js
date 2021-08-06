import React from "react";
import "./input.css";

function Input(props) {
    const {handleSubmit, text, letter, caseSensitivity, handleChange, errors} = props;

    return (
        <div className="inputContainer">
            <h1>Input data below</h1>
            <div className="formContainer">
                <form method="" onSubmit={handleSubmit}>
                    <div className="formField letter">
                        {errors.letter && <p>{errors.letter}</p>}
                        <label htmlFor="letterInput">Letter:</label>
                        <input onChange={handleChange} id="letterInput" name="letter" type="text" maxLength="1" 
                        value={letter} placeholder="Input single letter" required>
                        </input>
                    </div>
                    <div className="formField">
                        <label htmlFor="textInput">Text:</label>
                        <textarea onChange={handleChange} id="textInput" name="text" 
                        type="text" rows="2" cols="50" value={text} placeholder="Input text here..." required>
                        </textarea>
                    </div>
                    <div className="formField">
                        <label htmlFor="case">Enable case sensitivity</label>
                        <input type="checkbox" onChange={handleChange} id="case" name="caseSensitivity" 
                            value={caseSensitivity} autocomplete="off"
                        ></input>
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