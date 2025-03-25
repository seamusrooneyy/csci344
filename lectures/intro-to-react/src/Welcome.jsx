import React from "react";
export function Welcome({name, imgUrl}){
    // State variables go at the top
    const [style, setStyle] = useState("card");
    const [times, setTimes] = useState(0);


    function toggleClass(){
        console.log("change the card class");
        if (style === "card"){
            setStyle("active-card")
        }else{
            setStyle("card")
        }
        setTimes(times+1)
        console.log(times)        
    }


    return <section className={style} onClick={toggleClass}>
        <h2>Hello, {name}</h2>
        {/* <img src="https://picsum.photos/200?a=b" alt="" /> */}
        <img src={imgUrl} />
        <button>This has been clicked {times} times.</button>
        </section>;
}