import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {
    const [profileData, setProfileData] = useState(null); 
    async function getProfile() {
        const data = await getDataFromServer(token, "/api/profile");
        console.log(data);
        setProfileData(data);
    }
    useEffect(() => {
       getProfile();
    }, []);
    if (!profileData) {
        return <div>Loading...</div>; // Show loading message while waiting for data
    }
    return (
        <header className="flex gap-4 items-center">
            <img src={profileData.image_url} className="rounded-full w-16 h-16" />
            <h2 className="font-Comfortaa font-bold text-2xl">{profileData.username}</h2>
        </header>
    );
}
