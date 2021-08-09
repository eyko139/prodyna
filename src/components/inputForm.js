import React from "react"; import "./input.css";

function InputForm(props) {
    const {handleSubmit, text, letter, caseSensitivity, handleChange, errors} = props;

    return (
        <div className="inputContainer" >
            <h1>Input data below</h1>
            <div className="formContainer">
                <form method="" onSubmit={handleSubmit}>
                    <div className="formField letter">
                        <label htmlFor="letterInput">Letter:</label>
                        <div className="letterInput">
                          {errors.letter && <div className="error letter">{errors.letter}</div>}
                          <input onChange={handleChange} id="letterInput" name="letter" type="text" maxLength="1" 
                          value={letter} placeholder="Input letter..."
                          autoComplete="off">
                          </input>
                        </div>
                    </div>
                    <div className="formField text">
                        <label htmlFor="textInput">Text:</label>
                        <div className="textInput">
                          {errors.text && <div className="error letter">{errors.text}</div>}
                          <textarea onChange={handleChange} id="textInput" name="text" 
                          type="text" rows="5" cols="50" value={text} placeholder="Input text..."
                          autoComplete="off">
                          </textarea>
                        </div>
                    </div>
                    <div className="formField">
                        <label htmlFor="case">Enable case sensitivity</label>
                        <input type="checkbox" onChange={handleChange} id="case" name="caseSensitivity" 
                            value={caseSensitivity} autoComplete="off"
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
export default InputForm;