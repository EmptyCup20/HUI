/**
 *
 * @Author zhangxin14
 * @Date   2016/12/9
 *
 */
/**
 * Created by zhengjunling on 2016/12/5.
 */
define(["markdown", "fileupload"], function (markdown) {
    var DocManage = Backbone.View.extend({
        events: {
            "input #md_field": "preview",
            "click #doc_submit": "submit",
            "blur #md_field": "getCursorPosition"
        },
        initialize: function (id) {
            this.render(id);
        },

        /**
         * 页面初始化
         */
        render: function (id) {
            var that = this;
            this.id = id;
            $.get("/admin/doc/docManageEdit").done(function (data) {
                $(".page").html(data);
                that.setElement("#workPoolManage");
                that.textField = $("#md_field");
                if(id){
                    that.getDoc(id);
                }
                that.fileUpload();
            })
        },

        /**
         * 初始化文件上传组件
         */

        fileUpload: function () {
            var that = this;
            $("#workImgUpload").fileupload({
                url: "/admin/upload/imgUpload",
                formData: {
                    unique: false,
                    name : "workImgUpload",
                    type : "png,jpg"
                },
                done: function (t, result) {
                    var data = result.result;
                    if (data.success) {
                        that.insertImgAtCaret(data.data.url);
                        that.preview();
                    }
                }
            });

            $("#coverUpload").fileupload({
                url: "/admin/upload/imgUpload",
                formData: {
                    unique: false,
                    name : "coverUpload",
                    type : "png,jpg"
                },
                done: function (t, result) {
                    var data = result.result;
                    if (data.success) {
                        $('#coverImg').attr('src',data.data.url);
                        console.log(data);
                    }else{
                        alert(data.message)
                    }
                }
            });
        },
        /**
         * 获取文档内容并填充文本框
         */
        getDoc: function (id) {
            var that = this;
            $.ajax({
                url: "/admin/doc/getDocById",
                data:{
                    id:id
                }
            }).done(function (data) {
                if (data.success) {
                    that.textField.val(data.data.content);
                    $('#coverImg').attr('src',data.data.cover_url);
                    $('.work-info').val(data.data.info);
                    $('.work-title').val(data.data.title);
                    that.preview();
                }
            })
        },

        /**
         * md文档预览
         */
        preview: function () {
            var md_str = this.textField.val();
            $("#preview").html(markdown.toHTML(md_str));
        },

        /**
         * 在光标位置插入图片
         * @param url
         */
        insertImgAtCaret: function (url) {
            var el = this.textField.get(0);
            var imgText = "![](" + url + ")";//md图片插入格式
            if (document.selection) { // IE
                var sel = el.createTextRange();
                var cursorPosition = $(el).data("cursorPosition");
                el.focus();
                sel.moveStart('character', cursorPosition);
                sel.collapse();
                sel.select();
                sel.text = imgText;
                $(el).data("cursorPosition", cursorPosition + imgText.length);
                el.focus();
            } else if (el.selectionStart || el.selectionStart == '0') { // 现代浏览器
                var startPos = el.selectionStart, endPos = el.selectionEnd, scrollTop = el.scrollTop;
                el.value = el.value.substring(0, startPos) + imgText + el.value.substring(endPos, el.value.length);
                el.focus();
                el.selectionStart = startPos + imgText.length;
                el.selectionEnd = startPos + imgText.length;
                el.scrollTop = scrollTop;
            } else {
                el.value += imgText;
                el.focus();
            }
        },

        /**
         * 获取并记录光标位置
         */
        getCursorPosition: function () {
            var el = this.textField.get(0);
            var pos = 0;
            if ('selectionStart' in el) {
                pos = el.selectionStart;
            } else if ('selection' in document) {
                el.focus();
                var r = document.selection.createRange();
                if (r == null) {
                    return 0;
                }
                var re = el.createTextRange(), rc = re.duplicate();
                re.moveToBookmark(r.getBookmark());
                rc.setEndPoint('EndToStart', re);
                return rc.text.length;
            }
            this.textField.data("cursorPosition", pos);
        },

        /**
         * 保存文档
         */
        submit: function () {
            var that = this;
            if(!this.id && !$('.work-title').val()){
                alert('请输入标题！');
                return;
            }
            if(!this.id && !$('.work-info').val()){
                alert('请输入简介！');
                return;
            }
            if(!this.id && !$('#coverImg').attr('src')){
                alert('请上传文章封面！');
                return;
            }
            var fromData = {
                title: $('.work-title').val(),
                info : $('.work-info').val(),
                cover_url: $('#coverImg').attr('src'),
                content: this.textField.val()
            };
            $.ajax({
                url: "/admin/doc/" + (this.id ? 'updateDoc':'addDoc'),
                method: "post",
                data: this.id ? $.extend(fromData,{id:this.id}) : fromData
            }).done(function (data) {
                that.id ? alert('修改成功') : alert('保存成功');
                window.location.href= '/admin/#/workPoolManage'
            })
        }
    });
    return DocManage;
});