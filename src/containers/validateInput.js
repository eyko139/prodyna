import React from "react"

export default function validateInfo(values) {
    let errors = {};
    const letterInput = document.getElementById("letterInput")
    const textInput = document.getElementById("textInput")
  

    //Error for empty or non-alpha letter input
    if (!/^[a-z]/i.test(values.letter)) {
        errors.letter= "Only letters";
        errors.field = "letter"
        letterInput.setCustomValidity("Only letters")
    }  
    if (values.letter === "") {
        errors.letter = "Field cannot be empty";
        errors.field = "letter"
        letterInput.setCustomValidity("Field cannot be empty")
    }
    if (/\s/.test(values.letter)) {
      errors.letter = "No spaces";
      errors.field = "letter";
      letterInput.setCustomValidity("Cant be only space!")
    }

    if (values.text === "" || !/[a-z]/i.test(values.text)) {
      errors.text = "Field cannot be empty";
      errors.field = errors.field + " text";
      textInput.setCustomValidity("Field cannot be empty")
    }
    
    if (!errors.letter) {
      letterInput.setCustomValidity("")
    }
    if (!errors.text) {
      textInput.setCustomValidity("")
    }


    return errors
}