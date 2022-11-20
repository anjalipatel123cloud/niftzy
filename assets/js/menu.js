// menu active js
(function ($) {
    "use strict";
    var current = window.location.pathname;
    $('.navbar li a').filter(function(){
       var url = $(this).attr("href");
        if (url) {
            if (current.indexOf(url) != -1) {
                $(this).parent().addClass('active');
            }
        }
    })

    $('.navbar .nav-link').on('click', function () {
        $(this).parent().addClass("active").siblings().removeClass('active');
    });

})(jQuery);