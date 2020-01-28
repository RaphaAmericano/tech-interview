import '../scss/main.scss';
import 'bootstrap';

$(document).ready( () => { 
    $('.navbar-toggler').on('click', () => {
        $('.collapse').collapse('toggle');
    });
});