/**
 * Created by zhengjunling on 2016/12/6.
 */
;(function ($) {
    function buildSidebar() {
        //自动根据文档内容生成目录
        var m = -1, n = -1;
        $(".h-doc-section").find("h1,h3").each(function () {
            var anchor, text = $(this).text();
            //锚点偏移顶部，防止被导航条遮盖
            $(this).css({
                "margin-top": "-90px",
                "padding-top": "110px"
            })
            if ($(this).is("h1")) {
                m += 1;
                anchor = "anchor_" + m;
                $(".h-sidenav").append("<li><a href='#" + anchor + "'>" + text + "</a></li>");
            } else {
                var parentLI = $(".h-sidenav").children().eq(m);
                n += 1;
                anchor = "anchor_" + m + "_" + n;
                if (!parentLI.find("ul").length) {
                    parentLI.append("<ul class='nav'/>");
                }
                parentLI.find("ul").append("<li><a href='#" + anchor + "'>" + text + "</a></li>");
            }
            $(this).attr("id", anchor);
        });

        $('body').scrollspy({target: '.h-sidebar'});
    }

    $(function () {
        if ($(".h-sidebar").length) {
            buildSidebar();
        }
        $(document).on("scroll", function () {
            var scrollTop = $(this).scrollTop();

            //右侧导航随页面滚动而滚动
            if ($(".h-sidebar").length) {
                if ($(".h-sidebar").parent().offset().top - scrollTop < 60) {
                    $(".h-sidebar").addClass("h-sidebar-fixed");
                } else {
                    $(".h-sidebar").removeClass("h-sidebar-fixed");
                }
            }

            //回到顶部按钮显隐控制
            if (scrollTop > 150) {
                $(".btn-scroll-up").fadeIn(300);
            } else {
                $(".btn-scroll-up").fadeOut(300);
            }
        });

        //回到顶部
        $(".btn-scroll-up").on("click", function () {
            $.smoothScroll({
                offset: 0,
                easing: "easeOutExpo",
                speed: 800
            });
        });

        //搜索按钮
        $(".h-search-icon").on('click',function(){
            var searchKey = $(".h-search input").val();
            var url = window.location.pathname.indexOf('/search') !== -1 ? window.location.pathname.substr(0,window.location.pathname.indexOf('/search')) : window.location.pathname;
            window.location.href = url + '/search?p=' + searchKey;
        });

        $(".h-search").on('keyup','input',function(e){
            if(e.keyCode === 13){
                var searchKey = $(this).val();
                var url = window.location.pathname.indexOf('/search') !== -1 ? window.location.pathname.substr(0,window.location.pathname.indexOf('/search')) : window.location.pathname;
                window.location.href = url + '/search?p=' + searchKey;
            }
        });
    })
})(jQuery);