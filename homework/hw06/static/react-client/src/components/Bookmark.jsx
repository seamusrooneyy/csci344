import React, {useState} from "react"

import { postDataToServer, deleteDataFromServer } from "../server-requests"

export default function Bookmark({bookmarkId, postId, token}){
    const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

    async function createBookmark() {
        const sendData = {
            post_id: postId
        };

        console.log("creating a bookmark...")

        const response = await postDataToServer(token, "/api/bookmarks", sendData);
        console.log(response);
        setStateBookmarkId(response.id);
         
    }
    async function deleteBookmark() {
        const url = '/api/bookmarks/'+stateBookmarkId;
        console.log("deleting a bookmark...")
        const response = await deleteDataFromServer(token, url);
        console.log(response); 
        setStateBookmarkId(null);
    }
    if (stateBookmarkId){
        return(
            <button aria-label="Unbookmark This Post" aria-checked = "true" role="toggle"  onClick={deleteBookmark}>
                <i className="fas fa-bookmark"></i>
            </button>
        )
    }
    else{
        return(
            <button aria-label="Bookmark This Post" aria-checked = "false" role="toggle" onClick={createBookmark}>
                <i className="far fa-bookmark"></i>
            </button>
        )
    }
}