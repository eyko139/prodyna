import React, { useState, useEffect } from "react"

import Result from "../components/result.js"

function ResultContainer() {
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchResult = async() => {
            setLoading(true)
            const response = await fetch("api/result")
            .then(response => {
               if (response.ok) {
                    return response.json()}
               })
            .then(response => {
                return response
            })
            setResult(response)
            console.log(response.text)
        }
        fetchResult();
    }, [])

    return ( 
        <div>
            <Result 
               isloading={ Number.isInteger(result.occurances) === true ? result : "Loading..."} 
               result={result}
            />
        </div>
    )
}
export default ResultContainer;