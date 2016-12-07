/**
 * Created by zhengjunling on 2016/12/7.
 */
$(function () {
    //自动根据文档内容生成目录
    var m = -1, n = -1;
    $(".h-doc-section").find("h1,h3").each(function () {
        var anchor, text = $(this).text();
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

    $(document).on("scroll", function () {
        var scrollTop = $(document).scrollTop();
        if (scrollTop > 84) {
            $(".h-sidebar").addClass("h-sidebar-fixed");
        } else {
            $(".h-sidebar").removeClass("h-sidebar-fixed");
        }
    })
})