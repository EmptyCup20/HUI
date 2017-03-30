/**
 * Created by zhengjunling on 2016/12/1.
 */
(function ($) {
    $(function () {
        var prev = $("#dg-container").find('nav').find('.dg-prev');
        var next = $("#dg-container").find('nav').find('.dg-next');

        $(".block-list").click(function(e){
            var $el = $(e.target).parent();
            //这里获取translateX的方法有点问题，暂时没有特别好的方法 xx
            var translateX = parseInt($el.css("transform").substring(7).split(',')[12])

            var length = $el.parent().children().length, index = $el.index();
            var $livingEl;
            if(translateX > 0){
                prev.trigger("click.gallery");
                $livingEl = $el.parent().children().eq(index - 2 < 0 ? index - 2 + length : index - 2);
            }else if(translateX < 0){
                next.trigger("click.gallery");
                $livingEl = $el.parent().children().eq(index + 2 >= length ? index + 2 - length : index + 2);
            }
            $("#docInfo").html($livingEl.attr("data-info"));
            $("#docTitle").html($livingEl.attr("data-title")).attr("href", "/works/workDetail/" + $livingEl.attr("data-docid"));
        })

        $("#scrollToNext").on("click", function () {
            $.smoothScroll({
                easing: "easeOutExpo",
                speed: 800,
                scrollTarget: ".scroll-down-target"
            });
        })
    })
})(jQuery);