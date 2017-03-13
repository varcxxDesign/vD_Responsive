$(document).ready(function() {
    
    // Hover Main Nav
    $(".main-nav li").hover(
        // Reposition if off screen
        function() {
            if ($(this).find('> ul').length) {
                $(this).find('> .nav-reposition').removeClass();
                $(this).addClass('nav-parent');
                $(this).find('> ul').slideDown(150);

                var absoluteLeft = $(this).find('> ul').offset().left;
                var absoluteRight = absoluteLeft + $(this).find('> ul').outerWidth();
                var viewportRight = $(window).width() + $(window).scrollLeft();

                if (absoluteRight > viewportRight) {
                    $(this).find('> ul').addClass('nav-reposition');
                } else {
                    $(this).find('> ul').removeClass('nav-reposition');
                }
            }
        }, function() {
            $(this).removeClass('nav-parent');
            $(this).find('> ul').stop().slideUp(150, function() {
                $(this).attr("style", "overflow:visible");
            });
        });
    // Save main nav html
    var navHtml = $('.main-nav ul').html();
    // Append down-arrows for parents
    $('.main-nav li:has(> ul)').find(">:first-child").append(' <span class="arrow">▼</span>');
    // Populate mobile nav html
    $('body').append('<a href="#" id="mobile-open"><i class="burgerMenu"></i><br></a><a href="#" id="mobile-overlay"></a><div id="mobile"><nav><a href="#" id="mobile-cancel"><span></span><span></span></a><ul class="mobile-nav">' + navHtml + '</ul></nav></div>');

    $('.mobile-nav li:has(> ul)').find(">:first-child").after('<div class="indicator"><i class="fa fa-angle-down"></i></div>');

    // Function to make sure overlay covers the page
    function overlayFixer() {
        var overlayHeight = $('#mobile-overlay').height(),
            viewportHeight = $(document).height();
        if (viewportHeight > overlayHeight) {

            $('#mobile-overlay').css('height', viewportHeight);
        }
    }

    // Mobile dropdowns
    $(document.body).on('click', '.indicator', function(event) {
        if ($(this).parent().find('ul:first').is(":visible")) {
            $(this).parent().find('ul:first').velocity("slideUp", { duration: 300 });
            $(this).velocity({rotateZ: 0});
        } else {
            $(this).parent().find('ul:first').velocity("slideDown", { duration: 300 });
            $(this).velocity({rotateZ: -180});
        }
        event.preventDefault();
    });

    // Mobile Open
    $(document.body).on('click', '#mobile-open', function(event) {
        var amtScrolled = $(window).scrollTop();
        $('#mobile-overlay').velocity("slideDown", { duration: 300 });
        $('#mobile').show().css('paddingTop',amtScrolled);
        $('.mobile-nav > li').each(function(i) {
            $(this).delay((i++) * 100).velocity("fadeIn", { duration: 300 });
        });
        $('#mobile-cancel').velocity({
            rotateZ: 45,
            opacity: 1
        });
        event.preventDefault();
    });

    // Mobile Close
    $(document.body).on('click', '#mobile-cancel', function(event) {
        $('#mobile-cancel').velocity({
            rotateZ: 0,
            opacity: 0
        });
        $('#mobile-overlay, #mobile, .mobile-nav > li').velocity("slideUp", { duration: 300 });       
        event.preventDefault();
    });
    
    
    // FEAT IMAGE DESCRIPTION OVERLAY  
    $('#firstLetter').on('mouseenter', function(){
        $(this).closest('.parallax-container').find('.featLetterDescription').slideDown();
    });
    $('#firstLetter').on('mouseleave', function(){
        $(this).closest('.parallax-container').find('.featLetterDescription').slideUp();
    });
    

    
    
});