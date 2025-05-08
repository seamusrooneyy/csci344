import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Stories({ token }) {
    const [storiesData, setStoriesData] = useState(null); 
    async function getStories() {
        const data = await getDataFromServer(token, "/api/stories");
        console.log(data);
        setStoriesData(data);
    }
    useEffect(() => {
       getStories();
    }, []);  

    if (!storiesData) {
        return <div>Loading...</div>; // Show loading message while waiting for data
    }
    
    return (
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
            {storiesData.map((element, index) => (
                    <div key={index} className="flex flex-col justify-center items-center">
                        <img src={element.user.image_url} className="rounded-full border-4 w-12 h-12 border-gray-300"  />
                        <p className="text-xs text-gray-500">{element.user.username}</p>
                    </div>
            ))}
        </header>
    );
}
