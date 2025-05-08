import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";
// fetch data from server, render that data 

export default function Posts({ token }) {
    // when useState is invoked it returns an array with 2 values:
    // 1. State Variable
    // 2. Function whose job it is to set the state variable and 
    //    then redraw the screen after the variable is set
    const [posts, setPosts] = useState([]);
    const [counter, setCounter] = useState(0);

    async function getPosts() {
        const data = await getDataFromServer(token, "/api/posts");
        console.log(data);
        setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    function addOneToCounter(){
        setCounter(counter + 1);
    }

    console.log("Redraw screen with: ", counter);
    return <div>
        {/* TODO: output all of the posts: {posts.length} */}
        {
            posts.map(post => (
                <Post key={post.id} token = {token} postData={post}/>
            )
            )
        }
        <br />
        <button onClick={addOneToCounter}>
            {counter}
        </button>
        </div>;
}
