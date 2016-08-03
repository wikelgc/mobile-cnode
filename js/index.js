// index.js

// function get(url,callback){
// 	// 创建新请求
// 	var request = new XMLHttpRequest();
// 	// 指定带获取的URL
// 	console.log(url);
// 	request.open("GET",url);
// 	// 事件监听器
// 	request.onreadstatechange = function(){
// 		// 如果请求完成并成功
// 		if(request.status === 104){
// 			console.log(104);
// 		}

// 		if(request.readyState === 4 && request.status === 200){
// 			// 获得响应的类型
// 			var type = request.getResponseHeader("content-Type");
// 			// 检查类型
// 			if(type.indexOf(xml) !== -1 && request.responseXML){
// 				callback(request.responseXML);
// 			}else if(type === "application/json"){
// 				console.log(request.responseText);
// 				callback(JSON.parse(request.responseText));

// 			}else{
// 				// 支付串响应
// 				callback(request.responseText);
// 			}
// 		}
// 	};
// 	request.send(null);
// } 
$(function(){
	$.ajax({
        type:"GET",   
        data:{
        	page:10,
        	tab:"ask",
        	limit:10
        },
        url: "https://cnodejs.org/api/v1/topics",
        dataType:"json",
        success:function (result) {
            // console.log(JSON.stringify(result)7);
            var html = JSON.stringify(result);
            console.log(result.data);


            data = result.data[0];	
            var html = "";

                 	html='<li>'+
            					'<div class="header">'+
            						'<span class="name">'+data.author.loginname+'</span>'+
            						'<time>'+'10分钟前'+'</time>'+
            						'<img src="">'+ 
          						'</div>'+
       
         						 '<div class="title">'+data.title+'</div>'+
          					 '<div class="makedown">'+data.content+
            						'<a class="#">显示全部</a>'+
          						'</div>'+

					           '<div class="footer">'+
					             '<span>关注问题</span>'+
					             '<span>评论</span>'+
					             '<span>感谢</span>'+
					             '<span>禁止装载</span>'+
					            '</div>'+
                    '</li>';

            for(var i=1; i<result.data.length;i++){
            	var data = result.data[i];
            	html+='<li>'+
            					'<div class="header">'+
            						'<span class="name">'+data.author.loginname+'</span>'+
            						'<time>'+'10分钟前'+'</time>'+
            						'<img src="">'+ 
          						'</div>'+
       
         						 '<div class="title">'+data.title+'</div>'+
          					 '<div class="makedown">'+data.content+
            						'<a class="#">显示全部</a>'+
          						'</div>'+

					           '<div class="footer">'+
					             '<span>关注问题</span>'+
					             '<span>评论</span>'+
					             '<span>感谢</span>'+
					             '<span>禁止装载</span>'+
					            '</div>'+
                    '</li>';
            }

            $(".article").find("ul").html(html);
        },
        error:function (result, status) {
        //处理错误
            console.log(result);
        }
});
})



// window.onload = function(){

// var url = "https://cnodejs..org/api/v1/topics";

// 	get(url,function(text){
// 		console.log(text);
// 	})
// }