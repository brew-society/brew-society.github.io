window.onload = function () {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    if (q == undefined || q == null) window.location.href = "/";

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/article/" + q);

    xhr.onreadystatechange = function () {
        
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        console.log(response);

        document.getElementById("output").innerHTML = response.body;
        document.getElementById("title").innerHTML = response.title;
        document.getElementById("course").innerHTML = response.course.title || "";
        document.getElementById("course").setAttribute('href', `/course/?q=${response.course.id || ""}`);
        
        var container = document.getElementById('linkContainer');

        response.articles.forEach(element => {
            
            appendLink(element, container);

        });

    };

    xhr.send(); 

}; 

function appendLink(data, container) {

    // <a href="/article/index.html?q=6">Intro to Functions</a>

    var link = document.createElement("A");

    link.innerHTML = data.title;
    link.setAttribute('href', '/article/?q=' + data.id);

    container.append(link);

}