/**
 * Created by zhengjunling on 2016/12/1.
 */
(function ($) {
    $(function () {
        $("#dg-container").gallery();

        $.scrollify({
            section: ".scroll-section",
            scrollSpeed: 800,
            setHeights: false
        });

        $("#scrollToNext").on("click", function () {
            $.smoothScroll({
                easing: "easeOutExpo",
                speed: 800,
                scrollTarget: ".scroll-down-target"
            });
        })
    })
})(jQuery);