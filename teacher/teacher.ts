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

}; 