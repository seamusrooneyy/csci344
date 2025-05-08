import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion"

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]); 
    async function getSuggestions() {
        const data = await getDataFromServer(token, "/api/suggestions");
        console.log(data);
        setSuggestions(data);
    }
    useEffect(() => {
       getSuggestions();
    }, []);  
    


    return <div className="mt-4">
        {/* TODO: output all of the posts: {posts.length} */}
        <p className="text-base text-gray-400 font-bold mb-4">Suggestions for you</p>
        {
            suggestions.map(suggestion => (
                <Suggestion key={suggestion.id} token = {token} suggestionData={suggestion}/>
            )
            )
        }
        </div>;
}