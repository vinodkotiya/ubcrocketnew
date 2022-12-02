// When Window Loaded.
$(window).on('load', function() {

    'use strict';

    // Control of the functions exists
    $.fn.exists = function () { return this.length > 0; };

    //*********************************************
    //  AVATAR SCROPTS
    //*********************************************

        if ($("#avatar").exists()){
            var avatarOffset = $("#avatar").offset().top;
            $(window).on("scroll touchmove", function(){
                var windowOffset = $(window).scrollTop();
                if (windowOffset > avatarOffset -250) {
                    $("#avatar").addClass("hiding").removeClass("showing");
                } else{
                    $("#avatar").removeClass("hiding").addClass("showing");
                }
            });
        }


    //*********************************************
    //  POST SLIDER
    //*********************************************

    	//Call Swiper Slider
    	$(".post-slider").each(function(){
    		var postSlider = $(this),
    			nextNav = $(this).find(".slider-next"),
    			prevNav = $(this).find(".slider-prev"),
    			postPag = $(this).find(".post-slider-pagination");

    		var swiperPost = new Swiper(postSlider, {
		    	effect: 'fade', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
		    	speed: 600,
		    	loop: true,
		    	touchRatio: 1,
		    	autoHeight: false,
		    	followFinger: false,
		    	autoplay: {
					delay: 2000,
				},
		     	navigation: {
					nextEl: nextNav,
					prevEl: prevNav,
				},
				pagination: {
					el: postPag,
					clickable: true,
				}
		    });
    	});

    //*********************************************
    //  RECENT POST SLIDER
    //*********************************************

    	//Call Swiper Slider
    	$(".recent-post-slider").each(function(){
    		var recentPostS = $(this),
    			nextNav = $(this).find(".slider-next"),
    			prevNav = $(this).find(".slider-prev"),
    			postPag = $(this).find(".recent-post-slider-pagination");

    		var recentPostSlider = new Swiper(recentPostS, {
		    	effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
		    	speed: 600,
      			slidesPerView: 2,
			    spaceBetween: 30,
		    	loop: true,
		    	touchRatio: 1,
		    	autoHeight: true,
		    	followFinger: false,
		    	autoplay: {
					delay: 2000,
				},
		     	navigation: {
					nextEl: nextNav,
					prevEl: prevNav,
				},
				pagination: {
					el: postPag,
					clickable: true,
				},
				breakpoints: {
			        460: {
			          slidesPerView: 1,
			          spaceBetween: 20,
			        }
			    }
		    });
    	});

    //*********************************************
    //  TWITTER FEED
    //*********************************************

    	//Twitter Feed
        $('.twitter-feed').each(function(){
            var twitterFeeder = $(this),
                username = $(twitterFeeder).data('username'),
                count = $(twitterFeeder).data('count'),
                gap = $(twitterFeeder).data('gap');
                $(twitterFeeder).html('Loading Tweets...');
            $.getJSON( "php/twitter.php?un=" + username + "&count="+ count , function( data ) {
                $(twitterFeeder).empty();
                var items = [];
                $.each( data, function( key, val ) {
                    items.push( "<li id='" + key + "'><a href='https://twitter.com/goldeyes/status/"+ val.id +"' target='_blank'><i class='fab fa-twitter'></i><span class='tweetText'>" + val.text + "</span>...<span class='postDate'>Posted on "+ val.date +"</span></a></li>" );
                });
                $( "<ul/>", { "class": "twitter-list", html: items.join( "" ) }).appendTo(twitterFeeder);
                $(twitterFeeder).find('ul.twitter-list').addClass("gap-"+gap+"");
                if ( $('.twitter-feed').hasClass('slider') ) {
                    var sliderFeeder = $('.twitter-feed.slider');
                    $(sliderFeeder).find('ul.twitter-list').addClass("twitter-slider circle-dots").slick({ dots: true, arrows: false, slidesToShow: 1, slidesToScroll: 1, adaptiveHeight: true });
                }
                $(twitterFeeder).find(".tweetText").text(function(index, currentText) { return currentText.substr(0, 110); });
            });
        });
		    

    //*********************************************
    //  FITVIDS FOR VIDEO POSTS
    //*********************************************

		//Call fitvids 
        if ($(".fitvids").exists()){
            $(".fitvids").fitVids();
        }

	//*********************************************
    //  SIDEBAR NEWSLETTER FORM
    //*********************************************

        // Validate Contact Form
        $(".sidebar-newsletter-form").each(function(){
            var sendBtn = $(this).find(':submit'),
                $this = $(this),
                timer = window.setTimeout(3500);

            // Classic Zeplin Validate
            $(this).validate({
            	ignore: ".ignore",
                showErrors: function(map, list) {
                    this.currentElements.removeClass("error_warning");
                    $.each(list, function(index, error) {
                        window.clearTimeout(timer);
                    	$(".blog .sidebar .error-messages").addClass("show error").removeClass("success");
                    	$(".blog .sidebar .sidebar-newsletter-form").addClass("error-message-showing");
                        $(error.element).addClass("error_warning");
                    });
                },
                submitHandler: function(form) {
                    $(sendBtn).not('.loading').addClass('loading').append( "<span class='loader'></span>" );
                    $.ajax({
                        url: form.action,
                        type: form.method,
                        data: new FormData($(form)[0]),
                        cache: false,
                        contentType: false,
                        processData: false,
                        success : function() {
                        	$(".blog .sidebar .sidebar-newsletter-form").addClass("error-message-showing");
                            $(".blog .sidebar .error-messages").addClass("show success").removeClass("error");
                            timer = window.setTimeout( function(){ $(".blog .sidebar .sidebar-newsletter-form").removeClass("error-message-showing"); $(".blog .sidebar .error-messages").removeClass("success"); }, 5000);
                            $(sendBtn).removeClass('loading');
                            $($this).trigger("reset");
                        }
                    });
                }
            });

        });


	//*********************************************
    //  REPLY COMMENT
    //*********************************************

    	var	hiddenForm = $(".hidden-reply-comment").html();
    	$(".comments .media .reply").each(function(){
    		$(this).on("click touch", function(){
    			var trigger = $(this),
    				prnt = $(trigger).one().closest(".media");
    			
    			if (!$(trigger).hasClass("open")) {
    				$(".comments .reply-comment").remove();
		    		$(".comments .reply").removeClass("open");
    				$(hiddenForm).insertAfter(prnt);
    				trigger.addClass("open");
    			} else{ return false; }
    			

    			$(".cancel").on("click touch", function(){
		    		$(this).parents(".reply-comment").remove();
		    		trigger.removeClass("open");
		    	});

    			return false;
    		});
    	});


    //*********************************************
    //  MASONRY BLOG COLS
    //*********************************************

        $('.blog-col').isotope();

        $(window).resize(function(){
            $('.blog-col').isotope('layout');
        });
    	

    //*********************************************
}); //  END WINDOW LOAD FUNCTION
    //*********************************************


