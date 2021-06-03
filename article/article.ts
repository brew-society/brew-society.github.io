window.onload = function () {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    if (q == undefined || q == null) window.location.href = "/";

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/article/" + q);

    xhr.onreadystatechange = function () {
         
        document.getElementById("output").innerHTML = JSON.parse(this.responseText).body;

    };

    xhr.send(); 

}; 