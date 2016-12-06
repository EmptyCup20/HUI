/**
 * Created by zhengjunling on 2016/12/6.
 */
;(function ($) {
    $(function () {
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
        });

        $(".btn-scroll-up").on("click", function () {
            $.smoothScroll({
                offset: 0,
                easing: "easeOutExpo",
                speed: 800
            });
        });
    })
})(jQuery);