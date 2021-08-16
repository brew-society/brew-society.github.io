window.onload = function () {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    if (q == undefined || q == null) window.location.href = "/";

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/teacher/" + q);

    xhr.onreadystatechange = function () {
        
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        console.log(response);
 
        document.title = `${response.name} | The Brew Society`;

        document.getElementById("output").innerHTML = response.description;
        document.getElementById("name").innerHTML = response.name;
        document.getElementById("short").innerHTML = response.short || "";
        
        // response.articles.forEach(element => {
            
        //     appendLink(element, container);

        // });

    };

    xhr.send(); 

    loadTeacherArticles(q);

}; 


function loadTeacherArticles(id) {

    var articles = document.getElementById('articles');

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/teacher/" + id + "/articles");

    xhr.onreadystatechange = function () {
        
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            appendTeacherArticle(response[i], articles);

        }

    };

    xhr.send(); 

}

function appendTeacherArticle(data, container) {

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