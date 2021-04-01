var hamburgerToggled = false;

document.getElementById('hamburger').onclick = function () {

    if (hamburgerToggled) {

        document.getElementById('hamburgerMenu').style.left = '100%';

    } else {

        document.getElementById('hamburgerMenu').style.left = '0%';

    }

    hamburgerToggled = !hamburgerToggled;

}