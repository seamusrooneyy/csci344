const ENDPOINT_WIKIPEDIA = "https://en.wikipedia.org/api/rest_v1/page/summary";

async function getWikipediaArticle(searchTerm) {
    // your code here...
    const response = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`);
    let data = (await response).json();
    return data;
}




function dataToHTML(wikiArticle) {
    // your code here...
    template = `
    <section class="card">
    <img src="${wikiArticle.thumbnail.source}">
    <div>
        <h2>${wikiArticle.displaytitle}</h2>
        ${wikiArticle.extract_html}
    </div>
    </section>
    `
    return template;
}



// Uncomment these functions when you're ready to test:
testGetWikipediaArticles(); // Part A
testDisplayArticles(); // Part B





// Please do not modify the testGetWikipediaArticles() function
async function testGetWikipediaArticles() {
    const western = await getWikipediaArticle("Western Carolina University");
    const unca = await getWikipediaArticle("UNC Asheville");
    const app = await getWikipediaArticle("Appalachian State");
    const charlotte = await getWikipediaArticle("UNC Charlotte");
    console.log(western);
    console.log(unca);
    console.log(app);
    console.log(charlotte);
    return [western, unca, app, charlotte];
}

// Please do not modify the testDisplayArticles() function
async function testDisplayArticles() {
    const container = document.querySelector("#wiki-previews");
    const pages = await testGetWikipediaArticles();
    pages.forEach((page) => {
        container.insertAdjacentHTML("beforeend", dataToHTML(page));
    });
}
