//show panel
        $(".panel .panel-button.theme-options").on("click", function(){
            $(".panel-switcher, .panel-backdrop").toggleClass("active"); 
            $(".panel-switcher").load("js/theme-panel/panel-inner.html", function(){
                //Change tone
                $(".layout-tone").on("click", function(){
                    var title = jQuery(this).attr('title');     
                    jQuery('#changeable_tone').attr('href', 'css/tones/' + title + '.css');               
                    return false;
                });
                //Change menu color
                $(".menu-dark").on("click", function(){
                    jQuery('#navigation').removeClass("nav-white").addClass("nav-dark");               
                    return false;
                });
                //Change menu color
                $(".menu-white").on("click", function(){
                    jQuery('#navigation').removeClass("nav-dark").addClass("nav-white");               
                    return false;
                });
                //Reset
                $('.reset').on("click", function() {
                    location.reload();
                });
                //Change Color
                $(".color-button").on("click", function(){
                    var title = jQuery(this).attr('title');     
                    jQuery('#changeable_color').attr('href', 'css/colors/' + title + '.css');   
                    var skillBarColor = $(".skill-bar-color").css("background-color");
                    var chart = window.chart = $('.chart').data('easyPieChart', "barColor");
                    return false;
                });
            });
            return false;
        });
        //Close panel
        $(".panel-backdrop").on("click", function(){
            $(".panel-switcher, .panel-backdrop").removeClass("active");
        });


        if ( $('.panel').exists() ){
            // show hide subnav depending on scroll direction
            $(window).on("scroll ", function () {
                var scroll = $(window).scrollTop();
                if ( $("#home").exists() ) {
                    if (scroll > 700) {
                        $('.panel').removeClass('hiding');
                    } else {
                        $('.panel').addClass('hiding');
                    }
                } else{
                    $('.panel').removeClass('hiding');
                }
                
                if($(window).scrollTop() + $(window).height() === $(document).height()) {
                    $('.panel').removeClass('hiding');
                }
            });

            $(window).scroll();
        }
