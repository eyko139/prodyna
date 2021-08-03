import React from "react";

function Result(props) {
    return (
        <div>
            <h1>{props.isLoading ? "Loading result...": "Result"}</h1>
            <p>Occurances: {props.result.occurances}</p>
            <button onClick={async() => {
                const response = await fetch("/hello",{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        apitext: "yet another test string",
                        apiletter: "s",
                        case_sensitive_search: true,
                    })
                    })
                .then(response => {
                    return response.json()
                })
                .then(response => console.log(response))
            }}
            >Click me</button>
        </div>
    )
}

export default Result;