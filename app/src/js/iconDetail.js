/**
 * Created by zhangxin14 on 2017/3/13.
 */
$(function(){
    $('.single-icon').mouseenter(function(){
        $(this).find('.icon-operation').slideDown();
    });
    $('.single-icon').mouseleave(function(){
        $(this).find('.icon-operation').slideUp();
    });
    $('#archiveDownload').on('click',function(){
        var typeId = $('.collection-detail').data('typeid');
        $.ajax({
            url: ''
        })
    })
});