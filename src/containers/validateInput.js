import React from "react"

export default function validateInfo(values) {
    let errors = {};

    //Error for empty or non-alpha letter input
    if (!/^[a-z]|\s/i.test(values.letter)) {
        errors.letter= "Only letters";
        errors.field = "letter"
    }
    if (values.letter === "" ) {
        errors.letter = "Field cannot be empty";
        errors.field = "letter"
    }

    return errors
}