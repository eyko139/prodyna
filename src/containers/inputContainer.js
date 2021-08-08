import React, { useState, useEffect, useRef } from "react";
import Input from "../components/inputForm";
import validate from "./validateInput";
import useFirstRender from "./validationHook";

function IndexContainer() {

  //User Input
  const [values, setValues] = useState({
    text: "",
    letter: "",
    caseSensitivity: false
  })

  //Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  //custom hook returns true for first render, false for every subsequent render
  let firstRender = useFirstRender()
  useEffect(() => {
    if (!firstRender || validationErrors) {
      setValidationErrors(validate(values))
      console.log(validationErrors)
    }
  },[firstRender, values])

  //Sets the corresponding values for all input forms 
  const handleChange = ({ target }) => {
    const { name, value } = target
    if (target.name === "text" || target.name === "letter") {
      setValues({
        ...values,
        [name]: value
      })
    }
    else {
      target.checked ? setValues({...values, caseSensitivity: true}) : setValues({...values, caseSensitivity: false})
    }
  };

  //API put request, called on form submission
  async function postData(url = "", data = {}) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
          const jsonResponse = await response.json()
          return jsonResponse;
        }
      throw new Error("Request failed!")
    }
    catch(netWorkError) {
      console.log(netWorkError)
    }
  }

  //Form submission:
  //Checks for errors and runs validation check in case there was no input
  const handleSubmit = (event) => {
    event.preventDefault()

    if (Object.keys(validationErrors).length !== 0 || values.letter == "") {
      setValidationErrors(validate(values))
      return
    }
    postData("/api", {
      apitext: values.text,
      apiletter: values.letter,
      case_sensitive_search: values.caseSensitivity,
      key: Date.now(),
    })
    .then(data => {
      window.location.href = data.url;
    });
    
  }

  
  return (
    <div data-testid="inputForm">
      <Input
        handleSubmit={handleSubmit}
        caseSensitivity={values.caseSensitivity}
        text={values.text}
        letter={values.letter}
        handleChange={handleChange}
        errors={validationErrors}
      />
    </div>
  )
}

  export default IndexContainer;