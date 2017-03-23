/**
 * Created by zhangxin14 on 2017/3/13.
 */
$(function(){
    var iconId;

    $('.single-icon').mouseenter(function(){
        $(this).find('.icon-operation').slideDown(100);
    });
    $('.single-icon').mouseleave(function(){
        $(this).find('.icon-operation').slideUp(100);
    });
    $("#downloadDialog").dialogZ({
        content:'<div class="h-panel-body">'+
                    '<div class="preview-svg"></div>'+
                    '<div class="color-list">' +
                        '<span class="color-block" style="background:#d81e06"></span>'+
                        '<span class="color-block" style="background:#f4ea2a"></span>'+
                        '<span class="color-block" style="background:#1afa29"></span>'+
                        '<span class="color-block" style="background:#1296db"></span>'+
                        '<span class="color-block" style="background:#13227a"></span>'+
                        '<span class="color-block" style="background:#d4237a"></span>'+
                        '<span class="color-block" style="background:#e6e6e6"></span>'+
                        '<span class="color-block" style="background:#dbdbdb"></span>'+
                        '<span class="color-block" style="background:#cdcdcd"></span>'+
                        '<span class="color-block" style="background:#bfbfbf"></span>'+
                        '<span class="color-block" style="background:#8a8a8a"></span>'+
                        '<span class="color-block" style="background:#707070"></span>'+
                        '<span class="color-block" style="background:#515151"></span>'+
                        '<span class="color-block" style="background:#2c2c2c"></span>'+
                    '</div>'+
                '</div>'+
                '<h2>'+
                    '<input type="text" id="colorSelect" />' +
                    '<a class="btn btn-download" id="download" href="javascript:void(0);">下载</a>'+
                '</h2>'
    });

    function getColor(){
        var color = $('#colorSelect').spectrum("get");
        return color.toHex();
    }

    function setSvgColor(){
        var $path = $(".preview-svg path");
        if($path.length){
            $path.css('fill', '#' + getColor());
        }
    }

    //初始化颜色选择器
    $('#colorSelect').spectrum({
        color: '#000',
        preferredFormat: "hex",
        showInput: true,
        allowEmpty:true,
        cancelText: "取消",
        chooseText: "确定",
        className: 'color-select',
        change: setSvgColor
    });

    //设置颜色
    $(".color-block").on('click',function() {
        $('#colorSelect').spectrum("set", $(this).css("background"));
        setSvgColor()
    });

    //打开dialog
    $('#archiveDownload').on('click',function(){
        $("#downloadDialog").find('svg').remove();
        $("#downloadDialog").dialogZ('show');
    });

    //下载
    $('#download').on('click',function(){
        if($(".preview-svg svg").length){
            window.location.href = '/resource/iconfont/iconDownload?iconId=' + iconId + '&color=' + getColor()
        }else{
            var typeId = $('.collection-detail').data('typeid');
            window.location.href = '/resource/iconfont/archiveDownload?typeId=' + typeId + '&color=' + getColor()
        }
    });

    //单个icon下载
    $('.icon-single-download').on('click',function(){
        var $svg = $(this).parents('.single-icon').find('svg').clone();
        iconId = $(this).parents('.single-icon').data('iconid');
        $(".preview-svg svg").remove();
        $(".preview-svg").append($svg[0]);
        $("#downloadDialog").dialogZ('show');
    })

});