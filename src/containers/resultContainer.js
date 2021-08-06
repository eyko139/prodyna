import React, { useState, useEffect } from "react"

import Result from "../components/result.js"
import SingleResult from "../components/singleResult.js"
function ResultContainer() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchResults = async() => {
        setLoading(true)
        try {
            const response = await fetch("/api", {
                method: "GET"
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse
            }
            throw new Error("Request failed!")
        }
        catch(Error) {
            console.log(Error)
        }
    }

    useEffect(() => {
        fetchResults().then(data => setResults(data))
        setLoading(false)
        setTimeout(() => {
          const firstResult = document.querySelectorAll("ul > li");
          console.log(firstResult[0])
          firstResult[0].insertAdjacentHTML("afterend", "<h4>Old results:</h2>")
        }, 150)
    }, [])

    const deleteResultApi = async(keyToRemove) => {
        const response = await fetch("/api", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: keyToRemove})
        })
    }

    const deleteResult = (index, keyToRemove) => {
        setResults(results.filter(result => result.id != keyToRemove))
        deleteResultApi(index)
    }
    return ( 
        <div className="resultCardContainer">
            <h1>Result: </h1>
          <ul>
            { loading ? " Loading..." : results.map((result, index) => (
              <li>
                <SingleResult 
                    letter={result.letter}
                    text={result.text}
                    id={result.id}
                    letterOccurances={result.letter_occurances}
                    is_case_sensitive={result.is_case_sensitive}
                    index={index}
                    deleteResult={deleteResult}
                />
              </li>
            ))}
          </ul>
        </div>
    )
}
export default ResultContainer;
