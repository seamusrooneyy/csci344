import React, { useState, useEffect } from "react";

import Bookmark from "./Bookmark";
import Like from "./Like";

export default function Post({ token, postData}) {
    // console.log(postData);
return(
    <section className="bg-white border mb-10">
    <div className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">{postData.user.username}</h3>
        <button className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
    </div>
    <img src={postData.image_url} alt="placeholder image" width="300" height="300"
        className="w-full bg-cover" />
    <div className="p-4">
        <div className="flex justify-between text-2xl mb-3">
            <div className="flex gap-2">
                <Like likeId={postData.current_user_like_id} postId={postData.id} token={token} />
                <button><i className="far fa-comment"></i></button>
                <button><i className="far fa-paper-plane"></i></button>
            </div>
            <div>
                <Bookmark bookmarkId={postData.current_user_bookmark_id} postId={postData.id} token={token} />
            </div>
        </div>
        <p className="font-bold mb-3">{postData.likes.length} likes</p>
        <div className="text-sm mb-3">
            <p className="flex gap-2">
                <strong>{postData.user.username}</strong>
                {postData.caption}
                <button className="button">more</button>
            </p>
        </div>
        {/* I used chatGPT to help with displaying the varying number of comments */}
        {postData.comments && postData.comments.length > 0 && (
                    <div>
                        {postData.comments.map((comment, index) => (
                            <p key={index} className=" flex gap-2 text-sm mb-3">
                                <strong>{comment.user.username}</strong>
                                {comment.text}
                            </p>
                        ))}
                    </div>
                )}
        {/* <p className="text-sm mb-3">
            <strong>{postData.alt_text}</strong>
            Here is a comment text text text text text text text text.
        </p>
        <p className="text-sm mb-3">
            <strong>vanek97</strong>
            Here is another comment text text text.
        </p> */}
        <p className="uppercase text-gray-500 text-xs">{postData.display_time}</p>
    </div>
    <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-3 min-w-[80%]">
            <i className="far fa-smile text-lg"></i>
            <input type="text" className="min-w-[80%] focus:outline-none" placeholder="Add a comment..." />
        </div>
        <button className="text-blue-500 py-2">Post</button>
    </div>
</section>  
)
}