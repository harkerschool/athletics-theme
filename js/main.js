(function($) {

    $(document).ready( function() {

        $('body').hkrAwesomeBar({
            grayscale: false,
            templateURL: '//www.harker.org/uploaded/plugins/awesome-bar/awesome-bar.tpl.html'
        });
        
        // move teams to sidebar
        appendTeams( $('.teams-mod .bannermodcontent') );

        var $loadingBar = $('.loading-bar');
        $('.sports-nav').selectnav({
            defaultOptionText: "Please select a sport...",
            ajax: true,
            ajaxContainer: '#midcontainer',
            ajaxSelector: '#mainmiddle',
            beforeLoad: function() {
                $loadingBar.removeClass('loading-bar-progress loading-bar-finish')
                    .addClass('loading-bar-progress');
            },
            success: function() {
                removeTeamPageContent();
                $('.flexslider').flexslider();
                loadIsotopeSlideshow();
                appendTeams( $('.teams-mod .bannermodcontent') );
                $loadingBar.addClass('loading-bar-finish');
                setTimeout( function() {
                    $loadingBar.removeClass('loading-bar-progress loading-bar-finish');
                }, 2500);
            }
        });

        $('.coaches-nav').selectnav({
            defaultOptionText: "Please select a sport...",
            filterContent: true
        });

        addActiveMenuItem();
        removeTeamPageContent();

    });

    $(window).load( function() { 
        $('.flexslider').flexslider();
        loadIsotopeSlideshow();

        if ( $('.intro-mod').length ) {
            $('html').addClass('hasIntroMod');
        }
    });

    function addActiveMenuItem() {
        var currentURL = document.URL,
            match = currentURL.match(/(page\.cfm\?p=\d+)/);

        if ( match ) {
            $('.athletics-nav a[href="'+match[1]+'"]').parent('li').addClass('active');
            return;
        }

        $html = $('html');
        if ( $html.hasClass('page_3319') || $html.hasClass('parentpageid_3319') ) {
            $('.athletics-nav .teams').addClass('active');
            return;
        } 
    }

    function removeTeamPageContent() {
        var currentURL = document.URL,
            isEvent = currentURL.match(/event/),
            isTeam = currentURL.match(/teamID/),
            isLoc = currentURL.match(/locID/);

        if ( isEvent || isTeam || isLoc ) {
            $('#text1, #text2, .slider-mod, .intro-mod').remove();
        }
    }

    function appendTeams( $container ) {
        var $list = $('<ul class="teams" />'),
            $oldlist = $('.page_3297 #contentdiv .text_misc .spacermap, .page_3319 #contentdiv .text_misc .spacermap, .parentpageid_3319 #contentdiv .text_misc .spacermap'),
            $links = $('a', $oldlist),
            sport = $('#contentdiv h1').text();

        if ( ! $oldlist.length ) {
            return;
        }

        $oldlist.remove();
        $links.each( function() {
            $(this).appendTo( $list ).wrap('<li />');
        });
        $container.html( $list );
        $container.prepend( '<h3><i class="icon icon-teams"></i>' + sport + ' Teams</h3>' );
    }

    function loadIsotopeSlideshow() {
        var $container = $('.slider-reel'),
            weight = 0,
            prevColumnOpen = false;

        $container.imagesLoaded( function() {
            $container.isotope({
                itemSelector : '.item',
                layoutMode: 'masonryHorizontal',
                masonryHorizontal: {
                    rowHeight: 139
                },
                getSortData : {
                    weight : function ( $elem ) {
                        var $next = $elem.next(),
                            $container = $('.slider-reel'),
                            elemHeight = $elem.outerHeight(true),
                            nextHeight = $next.outerHeight(true),
                            containerHeight = $container.height();

                        if ( elemHeight === containerHeight ) {
                            return 0;
                        }

                        if ( !prevColumnOpen ) {
                            if ( elemHeight+nextHeight !== containerHeight || !$next.length ) {
                                return ++weight;
                            } else {
                                prevColumnOpen = true;
                                return 0; 
                            }
                        }

                        // previous column is open and element fits
                        prevColumnOpen = false;
                        return 0;
                    }
                },
                sortBy: 'random',
                onLayout: function() {
                    $('.masonry-slider').masonrySlider().css('visibility', 'visible');
                }
            });
        });
    }

})(jQuery);

