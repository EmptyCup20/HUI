/**
 * Created by zhengjunling on 2016/12/1.
 */
(function ($) {
    $(function () {
        $("#dg-container").gallery();
        $.scrollify({
            section: ".scroll-section",
            scrollSpeed: 800
        });

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
                easing: "easeOutExpo",
                speed: 800,
                scrollTarget: ".scroll-down-target"
            });
        })

        $(".btn-scroll-up").on("click", function () {
            $.smoothScroll({
                offset: 0,
                easing: "easeOutExpo",
                speed: 800
            });
        })

        //function mouseWheelScroll(e) {
        //    var scrollTop = $(this).scrollTop();
        //    var direct = 0;
        //    e = e || window.event;
        //    if (e.originalEvent.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        //        if (e.originalEvent.wheelDelta > 0) { //当滑轮向上滚动时
        //            direct = 0;
        //        }
        //        if (e.originalEvent.wheelDelta < 0) { //当滑轮向下滚动时
        //            direct = 1;
        //        }
        //    } else if (e.detail) {  //Firefox滑轮事件
        //        if (e.detail > 0) { //当滑轮向上滚动时
        //            direct = 0;
        //        }
        //        if (e.detail < 0) { //当滑轮向下滚动时
        //            direct = 1;
        //        }
        //    }
        //    if (scrollTop < $(window).height() && direct) {
        //        $.smoothScroll({
        //            easing: "easeInOutQuint",
        //            speed: 500,
        //            scrollTarget: ".scroll-down-target",
        //            beforeScroll: function () {
        //                $(document).off("mousewheel");
        //            },
        //            afterScroll: function () {
        //                $(document).on("mousewheel", mouseWheelScroll);
        //            }
        //        });
        //    }
        //}
        //
        //$(document).on("mousewheel", mouseWheelScroll)
    })
})(jQuery);