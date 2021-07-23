var hamburgerToggled = false;

window.addEventListener('load', function () {
 
    var container = document.getElementById('concepts');

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/header");

    xhr.onreadystatechange = function () { 
        
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            appendCourse(response[i], container);

        }

    };

    xhr.send(); 

});

document.getElementById('hamburger').onclick = function () {

    if (hamburgerToggled) {

        document.getElementById('hamburgerMenu').style.left = '100%';

    } else {

        document.getElementById('hamburgerMenu').style.left = '0%';

    }

    hamburgerToggled = !hamburgerToggled;

}

function appendCourse(data, container) {

    //   <a href="/course/">Frontend Building</a>

    var link = document.createElement("A");

    link.innerHTML = data.title;
    link.setAttribute('href', '/course/?q=' + data.id);

    container.append(link);

}