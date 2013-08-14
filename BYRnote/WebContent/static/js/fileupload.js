/**
 * 插件：可拖拽文件上传 author : Gou Rui date : 2013-01-19
 */

(function($) {
    $.fn.extend({
        dropableFileUpload : function(option) {
            var isMultipleFileSupported = window.File && window.FileReader && window.FileList && window.Blob;
            
            var defaults = {
                requestUrl : "",
                accept : "",
                onSuccess : function(){},
                onProgress : function(){},
                onReady : function(){},
                validTypeMatcher : ".*",
                fileInputSelector : null
            };
            
            var option = $.extend({}, defaults, option);
            
            var handleFileDrop = function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var files = evt.dataTransfer.files; // FileList object.
                checkAndUpload(files);
            };
            var handleFileDragOver = function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this
                                                        // is a copy.
            };
            
            var checkAndUpload = (function(matcher){
                return function(files){
                    if( !option.requestUrl ){
                        console.error("Invalid requestUrl");
                        return;
                    }
                    var lis = []
                    for ( var i = 0, f; f = files[i]; i++) {
                        var li = option.onReady(f);
                        console.log(li);
                        lis.push(li);
                    }
                    for ( var i = 0, f; f = files[i]; i++) {
                        if (f.type.match(matcher)) {
                            uploadFile(f, lis[i]);
                        } else {
                            console.error("Type not mathced. file:"+f.name+" type:"+f.type+" mathcer:"+matcher);
                        }
                    }
                };
            })(option.validTypeMatcher)
            var uploadFile = function(file, li) {
                var xhr = new XMLHttpRequest();
                var fd = new FormData();

                xhr.open("POST", option.requestUrl);
                fd.append('file', file);
                xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
                if(option.accept && option.accept.length > 0){
                    xhr.setRequestHeader('Accept',option.accept);
                }
                xhr.onload = function(event) {
                    if (this.status / 100 == 2) {
                        option.onSuccess(li, this.responseText);
                    }
                };
                xhr.upload.onprogress = function(event) {
                    if (event.lengthComputable) {
                        option.onProgress(li, event.loaded, event.total);
                    } else {
                        console.log("progress: file length uncomputable.");
                    }
                };
                xhr.send(fd);
            };
        
            return $(this).each( function(){
                if(isMultipleFileSupported){
                    $(this)[0].addEventListener('dragover', handleFileDragOver, false);
                    $(this)[0].addEventListener('drop', handleFileDrop, false);
                    
                    // selector可以是null，也就是不做任何事情
                    $(option.fileInputSelector).on('change',function(){
                        if(this.files)
                            checkAndUpload(this.files);
                    });
                }
                else{
                    var fileInput = $(option.fileInputSelector).clone().show();
                    var form = $('<form></form>').attr(
                        {
                            'id': 'compatible_form',
                            'action': option.requestUrl+'.json',
                            'method': 'post',
                            'enctype': "multipart/form-data",
                            'accept': 'application/json'
                        }
                    ).append(fileInput).hide().appendTo($(option.fileInputSelector).parents('form').parent());
                    $(option.fileInputSelector).siblings('div').html('');
                    fileInput.on('change',function(){
                        form.ajaxSubmit({
                            success: function(data, statusText, xhr, $form) {
                                console.log(data);
                                var filename = fileInput.val().split('/')[fileInput.val().split('/').length-1];
                                var f = {name: filename};
                                var li = option.onReady(f);
                                option.onSuccess(li, data);
                            },
                            dataType:'json'
                        });
                    });
                }
            });
        }
    });
})(jQuery);