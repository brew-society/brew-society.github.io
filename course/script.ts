var loaded = false;

window.onload = function () {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    if (q == undefined || q == null) window.location.href = "/";

    loadBasicData(q);
    loadArticles(q);

}; 

function loadArticles(id) {

    var articles = document.getElementById('articles');

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/course/" + id + "/articles");

    xhr.onreadystatechange = function () { 
        
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        for (var i = 0; i < response.length; i++) {

            appendArticle(response[i], articles);

        }

    };

    xhr.send(); 

}

function appendArticle(data, container) {

    // Create Objects
    var link = document.createElement("A");
    var article = document.createElement("ARTICLE");
    var type = document.createElement("LABEL");
    var title = document.createElement("H2");
    var short = document.createElement("P");

    // Setup Inner HTML
    link.setAttribute("href", "/article/?q=" + data.id);
    
    type.innerHTML = data.type; 
    title.innerHTML = data.title;
    short.innerHTML = data.short;

    // Add it Together
    article.append(type);
    article.append(title);
    article.append(short);
    link.append(article);

    // Add to Scene
    container.append(link);

}

function loadBasicData(id) {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/course/" + id);

    xhr.onreadystatechange = function () {
         
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        // console.log(this.responseText);
        document.getElementById("title").innerHTML = response.title;
        document.getElementById("short").innerHTML = response.short;
        document.getElementById("body").innerHTML = response.description;

    }; 

    xhr.send(); 

}