/**
 * Created by zhangxin14 on 2017/3/13.
 */
$(function(){
    $('.single-icon').mouseenter(function(){
        $(this).find('.icon-operation').slideDown(100);
    });
    $('.single-icon').mouseleave(function(){
        $(this).find('.icon-operation').slideUp(100);
    });
    $("#archiveDownloadDialog").dialogZ();
    $('#archiveDownload').on('click',function(){
        $("#archiveDownloadDialog").dialogZ('open');
        /*var typeId = $('.collection-detail').data('typeid');
        window.location.href = '/resource/iconfont/archiveDownload?typeId=' + typeId*/
    });

});