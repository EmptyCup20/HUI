/**
 * Created by zhangxin14 on 2017/3/29.
 */
$(function(){
    $('.js-comment-block').on('click','.btn-submit',function(){
        var pathArr = window.location.pathname.split('/');
        var replyTo = $(this).closest('.content-box').find('h6').text();
        $.ajax({
            url:'/works/postComment',
            type:'post',
            data:{
                docId:pathArr[pathArr.length-1],
                username:'memememem',
                comment: replyTo ? $('.content-box .content-input').val() : $('.comment-box .content-input').val(),
                replyTo: replyTo ? replyTo : ''
            }
        }).done(function(data){
            if(data.success){
                window.location.reload();
            }
        })
    });

    $(".reply-btn").on('click',function(){
        if($('.reply-form').length){
            return;
        }
        var $contentBox = $(this).closest('.content-box');
        var replyer = $contentBox.find('h6').text();
        var replyForm = '<div class="reply-form clearfix">'+
                            '<textarea class="content-input" placeholder="对'+ replyer +'的回复"></textarea>'+
                            '<div class="submit-action">'+
                                '<button class="btn-cancel">取消</button>'+
                                '<button class="btn-submit">评论</button>'+
                            '</div>'+
                        '</div>';
        $contentBox.append(replyForm);
    });

    $('.content-box').on('click','.btn-cancel',function(){
        $(this).closest('.content-box').find('.reply-form').remove();
    });

});