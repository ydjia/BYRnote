(function($) {
    $(document).ready(function(){
		//分页操作
	    $.ias({
	        container: '.todolist_comments',
	        item: '.entry',
	        pagination: '.sheet .navigation',
	        next: '.next-page a',
	        trigger: '查看更多文件',
	        loader: '<img src="/static/img/loader.gif" />',
	        onRenderComplete: function(items) {
	            for(var index = 0; index < items.length; index ++){
	            	$(items[index]).find(".add_tag_button").click(function(){
	            		if($(this).next().html().trim() == ""){
	          	      	  $(this).next().append($("#add_tag").html());
	          	      	  $(this).next().css("left", $(this).position().left - 100);
	          	      	  var form = $(this).next().children();
	          	      	  var tagul = $(this).next().next().find("ul");
	          	      	  form.show();
	          	      	  form.attr('action', "/" + $(this).attr("companyId") + "/projects/" + $(this).attr("projectId") + "/attachments/" + $(this).attr("attachmentId") + "/tags");
	          	      	  form.ajaxForm({
	          	                  success: function(data, statusText, xhr, $form) {
	          	                      if (data.result == 'success') {
	          	                    	var tagli = $("<li></li>");
	        	                      	var tagNameA = $("<a></a>");
	        	                      	tagNameA.attr("href", data.href);
	        	                      	tagNameA.append(data.tagname);
	        	                      	var removeImg = $('<img class="tag-remove" src="/static/img/close.png">');
	        	                      	removeImg.attr('attachmentid', data.attachmentid);
	        	                      	tagli.append(tagNameA);
	        	                      	tagli.append(removeImg);
	        	                      	tagul.append(tagli);
	          	                      	tagul.find(".tag-remove").click(function(){
		          	  	                	var url = $(this).prev().attr("href") + "/attachments/" + $(this).attr("attachmentid");
		          	  	                	var tag = $(this).parent();
		          	  	                	$.ajax(url, {
		          	  	                        type : 'DELETE',
		          	  	                        dataType : 'json',
		          	  	                        success : function(data) {
		          	  	                            if (data.result == 'success') {
		          	  	                            	tag.remove();
		          	  	                            } else {
		          	  	                                alert('删除失败');
		          	  	                            }
		          	  	                        },
		          	  	                    });
	          	                      	});
	          	                      	form.remove();
	          	                      } else if(data.result == 'fail'){
	          	                      	
	          	                      } else{
	          	                      	alert("哦，好像出错了。。");
	          	                      }
	          	                  },
	          	                  dataType: 'json'
	          	            });
	          	      	  $(this).next().find(".add_tag_cancle").click(function(){
	          	      	    $(this).parent().parent().parent().html("");
	          	      	    return false;
	          	      	  });
	          	      	}
	            	});
	            	
	            	$(items[index]).find(".tag-remove").click(function(){

	                	var url = $(this).prev().attr("href") + "/attachments/" + $(this).attr("attachmentid");
	                	var tag = $(this).parent();
	                	$.ajax(url, {
	                        type : 'DELETE',
	                        dataType : 'json',
	                        success : function(data) {
	                            if (data.result == 'success') {
	                            	tag.remove();
	                            } else {
	                                alert('删除失败');
	                            }
	                        },
	                    });
	            	});
	            }
	        }
	    });
    });
 })(jQuery);