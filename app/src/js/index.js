/**
 * Created by zhengjunling on 2016/12/1.
 */
(function ($) {
    $(function () {
        $("#dg-container").gallery();
        $(document).on("scroll", function () {
            var scrollTop = $(this).scrollTop();

            if (scrollTop > 50) {
                $(".h-header").addClass("header-fixed");
            } else {
                $(".h-header").removeClass("header-fixed");
            }

            if (scrollTop > 150) {
                $(".btn-scroll-up").fadeIn(300);
            } else {
                $(".btn-scroll-up").fadeOut(300);
            }
        })

        $("#scrollToNext").on("click", function () {
            $.smoothScroll({
                easing: "easeInOutSine",
                speed: 500,
                scrollTarget: ".scroll-down-target"
            });
        })

        $(".btn-scroll-up").on("click", function () {
            $.smoothScroll({
                offset: 0,
                easing: "easeInOutSine",
                speed: 500
            });
        })
    })
})(jQuery);