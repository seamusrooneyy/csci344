import React, {useState} from "react"

import { postDataToServer, deleteDataFromServer } from "../server-requests"

export default function Like({likeId, postId, token}){
    const [stateLikeId, setStateLikeId] = useState(likeId);

    async function createLike() {
        const sendData = {
            post_id: postId
        };

        console.log("creating a like...")

        const response = await postDataToServer(token, "/api/likes/", sendData);
        console.log(response);
        setStateLikeId(response.id);
         
    }
    async function deleteLike() {
        const url = '/api/likes/'+stateLikeId;
        console.log("deleting a like...")
        const response = await deleteDataFromServer(token, url);
        console.log(response); 
        setStateLikeId(null);
    }
    
    if (stateLikeId){
        return(
            <button aria-label="Unlike This Post" aria-checked = "true" role="toggle" onClick={deleteLike}><i className="fas text-red-600 fa-heart"></i></button>
        )
    }
    else{
        return(
            <button aria-label="Like This Post" aria-checked = "false" role="toggle"  onClick={createLike}><i className="far fa-heart"></i></button>
        )
    }
}