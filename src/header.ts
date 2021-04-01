var hamburgerToggled = false;

function toggleHamburger() {

    if (hamburgerToggled) {

        document.getElementById('hamburgerMenu').style.left = '100%';

    } else {

        document.getElementById('hamburgerMenu').style.left = '0%';

    }

    hamburgerToggled = !hamburgerToggled;

}