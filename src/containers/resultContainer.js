import React, { useState, useEffect } from "react"

import Result from "../components/result.js"
import SingleResult from "../components/singleResult.js"
function ResultContainer() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchResults = async() => {
            setLoading(true)
            const response = await fetch("/hello", {
              method: "GET"
            })
            .then(response => {
               if (response.ok) {
                    return response.json()}
               })
            .then(response => {
                console.log(response);
                return response
            })
            setResults(response)
        }
        fetchResults();
    }, [])
    console.log(results)

    const deleteResultApi = async(keyToRemove) => {
        const response = await fetch("/hello", {
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
        <div>
            {/* <Result
              results={results}
              deleteResult={deleteResult}
            /> */}

            { results.map((result, index) => (
                <SingleResult 
                    letter={result.letter}
                    text={result.text}
                    id={result.id}
                    letterOccurances={result.letter_occurances}
                    is_case_sensitive={result.is_case_sensitive}
                    index={index}
                    deleteResult={deleteResult}
                />
            ))}
        </div>
    )
}
export default ResultContainer;