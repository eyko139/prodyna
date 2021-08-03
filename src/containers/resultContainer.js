import React, { useState, useEffect } from "react"

import Result from "../components/result.js"

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

    return ( 
        <div>
            <Result
              results={results}
            />
        </div>
    )
}
export default ResultContainer;
