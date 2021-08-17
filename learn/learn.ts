var hamburgerToggled = false;

window.addEventListener('load', function () {
 
    var courseContainer = document.getElementById('learn_concepts');
    var teacherContainer = document.getElementById('learn_teachers');

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://brew-society.herokuapp.com/header");

    xhr.onreadystatechange = function () { 
        
        if (xhr.readyState !== 4) return;

        var response = JSON.parse(this.responseText);

        var courses = response.courses;
        var teachers = response.teachers;

        for (var i = 0; i < courses.length; i++) {

            appendCourse(courses[i], courseContainer, "course");

        }

        for (var i = 0; i < teachers.length; i++) {

            appendCourse(teachers[i], teacherContainer, "teacher");

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

function appendCourse(data, container, endpoint) {

    //   <a href="/course/">Frontend Building</a>

    var link = document.createElement("A");

    link.innerHTML = data.title || data.name;
    link.setAttribute('href', `/${endpoint}/?q=${data.id}`);

    container.append(link);

}
