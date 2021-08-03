import React, { useState, useEffect } from "react";
import Input from "../components/input";
import { BrowserRouter,
  Switch,
  Route,
  Link } from "react-router-dom";

function IndexContainer() {

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Request failed!")
    }, networkError => console.log(networkError.message))
    return response;
    //Insert a render response function?
  }

  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    postData("/api/input", {
      text,
      letter,
      caseSensitivity,
    })
    .then(data => {
      console.log(data);
      setResult(data.occurances)
      window.location.href = data.url;
    });
    
  }
  const [caseSensitivity, setCaseSensitivity] = useState(false);
  const handleCase = ({ target }) => {
        caseSensitivity ? setCaseSensitivity(false) : setCaseSensitivity(true);
    }

  const [text, setText] = useState("")
  const handleTextChange = ({ target }) => {
    setText(target.value);
  }

  const [letter, setLetter] = useState("")
  const handleLetterChange = ({ target }) => {
    setLetter(target.value)
  }

  // useEffect(() => {
  //     console.log(caseSensitivity);
  // }, [caseSensitivity])
  // useEffect(() => {
  //     console.log(text)
  // }, [text, letter])
  
  return (
      <Input
        handleTextChange={handleTextChange}
        handleLetterChange={handleLetterChange}
        handleCaseChange={handleCase}
        handleSubmit={handleSubmit}
        caseSensitivity={caseSensitivity}
        text={text}
        letter={letter}
        caseSensitivity={caseSensitivity}
      />
  )
}

  export default IndexContainer;