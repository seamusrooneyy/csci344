import React, { useState, useEffect } from "react";

export default function suggestion({token, suggestionData}){
return(
            <section key={suggestionData.id} className="flex justify-between items-center mb-4 gap-2">
                <img src={suggestionData.image_url} className="rounded-full w-12 h-12" />
                <div className="w-[180px]">
                    <p className="font-bold text-sm">{suggestionData.username}</p>
                    <p className="text-gray-500 text-xs">suggested for you</p>
                </div>
                <button className="text-blue-500 text-sm py-2">follow</button>
            </section>
)}
