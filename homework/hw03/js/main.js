import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "seamus";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    getPosts();
    getUser();
    getSuggestions();
    getStories();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
//await / async syntax:
async function getPosts() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    renderPosts(data);
}
async function getUser() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    renderUser(data);
}
//await / async syntax:
async function getSuggestions() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    renderSuggestions(data);
}
//await / async syntax:
async function getStories() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    renderStories(data);
}
function renderStory(storyJSON){
    const template = `
                <div class="flex flex-col justify-center items-center">
                <img src="${storyJSON.user.image_url}" alt="story_image" class="rounded-full w-14 h-14 border-4 border-gray-300" />
                <p class="text-xs text-gray-500">${storyJSON.user.username}</p>
            </div>
    `;
    const container = document.querySelector("main header");
    container.insertAdjacentHTML("beforeend", template);
}
function renderStories(storyListJSON){
    storyListJSON.forEach(renderStory)
}

function renderSuggestion(suggestionJSON){
    const template = `
    <section class="flex justify-between items-center mb-4 gap-2">
         <img src="${suggestionJSON.image_url}" alt="suggestion_image" class="rounded-full w-8 h-8 object-cover" />
         <div class="w-[180px]">
            <p class="font-bold text-sm">${suggestionJSON.username}</p>
            <p class="text-gray-500 text-xs">suggested for you</p>
        </div>
        <button class="text-blue-500 text-sm py-2">follow</button>
    </section>
    `;
    const container = document.querySelector("aside div");
    container.insertAdjacentHTML("beforeend", template);
}
function renderSuggestions(suggestionListJSON){
    suggestionListJSON.forEach(renderSuggestion);
}

function renderUser(userJSON){
    const template = `
        <img src="${userJSON.image_url}" alt="User_image" class="rounded-full w-16 h-16 object-cover" />
        <h2 class="font-Comfortaa font-bold text-2xl">${userJSON.username}</h2>
    `;
    const container = document.querySelector('aside header');
    container.insertAdjacentHTML('beforeend', template);
}

function renderPost(postJSON){
    const template = `
    <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${postJSON.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${postJSON.image_url}" alt="placeholder image" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${renderLikeButton(postJSON)}
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3">${postJSON.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        Here is a caption about the photo.
                        Text text text text text text text text text
                        text text text text text text text text... <button class="button">more</button>
                    </p>
                </div>
                <p class="text-sm mb-3">
                    <strong>lizzie</strong>
                    Here is a comment text text text text text text text text.
                </p>
                <p class="text-sm mb-3">
                    <strong>vanek97</strong>
                    Here is another comment text text text.
                </p>
                <p class="uppercase text-gray-500 text-xs">1 day ago</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
    `;
    const container = document.querySelector('main');
    container.insertAdjacentHTML("beforeend",template);
}

function renderPosts(postListJSON){
    postListJSON.forEach(renderPost);
}



//await / async syntax:
window.createBookmark = async function (postID) {
    const postData = {
        "post_id": postID
    };
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });
    const data = await response.json();
    console.log(data);
}

function renderBookmarkButton(postJSON){
    let template = '';
    if (postJSON.current_user_bookmark_id){
        template = `
        <button onclick="window.deleteBookmark(${postJSON.current_user_bookmark_id})">
        <i class="fas fa-bookmark"></i>
        </button>
        `
    } else {
        template = `      
        <button onclick="window.createBookmark(${postJSON.id})">
        <i class="far fa-bookmark"></i>
        </button>
        `
    }
    return template;
}
window.deleteBookmark = async function (bookmarkID){
        const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
}

window.createLike = async function (postID){
    const postData = {
        "post_id": postID
    };
    
        const response = await fetch("https://photo-app-secured.herokuapp.com/api/likes/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log(data);
}
function renderLikeButton(postJSON){
    let template = '';
    if(postJSON.current_user_like_id){
        template = `
        <button onclick="window.deleteLike(${postJSON.current_user_like_id})">
        <i class="fa-solid fa-heart text-red-700">
        </i></button>
        `;
    } else{
        template = `
        <button onclick="window.createLike(${postJSON.id})">
        <i class="far fa-heart">
        </i></button>
        `
    }
    return template;
}
window.deleteLike = async function (LikeID){
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/likes/${LikeID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
