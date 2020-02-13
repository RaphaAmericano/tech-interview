import '../scss/main.scss';
import 'bootstrap';

$(document).ready( () => { 

    let headerHeight = $('header').outerHeight();

    $('.mask').css('padding-top', headerHeight );

    $('.navbar-toggler').on('click', () => {
        $('.collapse').collapse('toggle');
    });
    $('.collapse').on('show.bs.collapse', () => {
        $('header').addClass('collapse-xs-extend');
        $('.navbar-toggler span').removeClass('navbar-toggler-icon').addClass('icon_close');
    });
    $('.collapse').on('hidden.bs.collapse', () => {
        $('header').removeClass('collapse-xs-extend');
        $('.navbar-toggler span').removeClass('icon_close').addClass('navbar-toggler-icon');
    });

    var documentSize = document.body.clientHeight;

    window.onscroll = () => {
        
        var distanceTop = document.documentElement.scrollTop;
        var distancePercent = parseInt((distanceTop * 100) / documentSize);
        
        if(distancePercent >= 3 ){
            if(!$('header').hasClass('header-bg')){
                $('header').addClass('header-bg');
            }
        } 
        if(distancePercent < 3 ){
            if($('header').hasClass('header-bg')){
                $('header').removeClass('header-bg');
            }
        }
    }

    


});