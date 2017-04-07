/**
 * Created by zhangxin14 on 2017/3/13.
 */
(function ($) {
    $(function () {
        var $downloadDialog = $("#downloadDialog");

        $downloadDialog.dialogZ();

        //设置颜色
        $(".color-block").on('click', function () {
            $('#colorSelect').spectrum("set", $(this).css("background"));
            setSvgColor()
        });


        //下载
        $('#download').on('click', function () {
            if ($(".preview-svg svg").length) {
                window.location.href = '/resource/iconfont/iconDownload?iconId=' + iconId + '&color=' + getColor()
            } else {
                var typeId = $('.collection-detail').data('typeid');
                window.location.href = '/resource/iconfont/archiveDownload?typeId=' + typeId + '&color=' + getColor()
            }
        });

        //打开dialog
        $('#archiveDownload').on('click', function () {
            var collectionId = $(this).data("id");
            var collectionName = $("#collectionName").text();
            var html = template('packDialogContent', {
                id: collectionId,
                name: collectionName
            });
            $downloadDialog.dialogZ('setContent', html);
            //初始化颜色选择器
            initColorPicker();
            $downloadDialog.dialogZ('show');
        });

        $(".h-icon-list").on("click", ".icon-single-download", function () {
            var iconId = $(this).parent().data('iconid');
            getIconInfo(iconId, function (data) {
                var html = template('singleDialogContent', data);
                $downloadDialog.dialogZ('setContent', html);
                $downloadDialog.find(".preview-svg").html(data.svgXML);
                //初始化颜色选择器
                initColorPicker();
                $downloadDialog.dialogZ('show');
            });
        });

        $(document).on("click", ".color-block-list>li", function () {
            $('.color-picker', $downloadDialog).spectrum("set", $(this).css("background"));
            setSvgColor();
        });

        //单个下载
        $(document).on("click", "[data-action=singleDownload]", function () {
            var iconId = $(this).data("id");
            window.location.href = '/resource/iconfont/iconDownload?iconId=' + iconId + '&color=' + getColor()
        });

        //打包下载
        $(document).on("click", "[data-action=packDownload]", function () {
            var collectionId = $(this).data("id");
            window.location.href = '/resource/iconfont/archiveDownload?typeId=' + collectionId + '&color=' + getColor()
        });

        function initColorPicker() {
            $('.color-picker', $downloadDialog).spectrum({
                color: '#000',
                preferredFormat: "hex",
                showInput: true,
                allowEmpty: true,
                cancelText: "取消",
                chooseText: "确定",
                className: 'color-select',
                change: setSvgColor
            });
        }

        function getColor() {
            var color = $('.color-picker', $downloadDialog).spectrum("get");
            return color.toHex();
        }

        function setSvgColor() {
            var $path = $(".preview-svg path", $downloadDialog);
            if ($path.length) {
                $path.css('fill', '#' + getColor());
            }
        }
    });

    function getIconInfo(id, callback) {
        $.ajax({
            url: "/resource/iconfont/detail/" + id
        }).done(function (res) {
            callback && callback(res);
        })
    }


})(jQuery);