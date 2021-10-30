// basic react entry point that 
const constant : string = "hello types"

console.log(constant + 2)
console.log('now with swipes!');


import React from "react"
import ReactDOM from "react-dom"
import Page from "./page"

ReactDOM.render(
    <React.StrictMode>
        <Page/>
    </React.StrictMode>,
    document.getElementById('root')
)
