import React from "react";
import { Welcome } from "./Welcome";
import "./App.css"
import "./Welcome.css"

export default function App() {

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <Welcome 
                name = "Seamus"
                imgUrl={"https://picsum.photos/200?a=1"}/>
                <Welcome 
                name = "Sarah"
                imgUrl={"https://picsum.photos/200?a=2"}/>
                <p>Hello React!</p>
            </main>
        </>
    );
}