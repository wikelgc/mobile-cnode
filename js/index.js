// 首页

// 精华

// 分享


// 问答

// 招聘


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

                //  	html='<li>'+
            				// 	'<div class="header">'+
            				// 		'<span class="name">'+data.author.loginname+'</span>'+
            				// 		'<time>'+'10分钟前'+'</time>'+
            				// 		'<img src="">'+ 
          						// '</div>'+
       
         						 // '<div class="title">'+data.title+'</div>'+
          					 // '<div class="makedown">'+data.content+
            				// 		'<a class="#">显示全部</a>'+
          						// '</div>'+

					           // '<div class="footer">'+
					           //   '<span>关注问题</span>'+
					           //   '<span>评论</span>'+
					           //   '<span>感谢</span>'+
					           //   '<span>禁止装载</span>'+
					           //  '</div>'+
                //     '</li>';

            for(var i=0; i<result.data.length;i++){
            	var data = result.data[i];
            	var content = data.content.replace(/<[^>]*>/g,"");
            	
            	html+='<li>'+
            					'<div class="header">'+
            						'<span class="name">'+data.author.loginname+'</span>'+
            						'<time>'+'10分钟前'+'</time>'+
            						'<img src="">'+ 
          						'</div>'+
       
         						 '<div class="title">'+data.title+'</div>'+
          					 '<div class="makedown">'+content.substring(0,150)+
            						'<a class="showup">显示全部</a>'+
          						'</div>'+

					           '<div class="footer">'+
					             '<span>关注问题</span>'+
					             '<span>评论</span>'+
					             '<span>感谢</span>'+
					             '<span>禁止转载</span>'+
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


$(function(){
	var zip = new RegExp("")
	var text = '<span>我的世界</span>'
	var result = text.replace(/<[^>]*>/g," ");
	console.log(result);
})


// window.onload = function(){

// var url = "https://cnodejs..org/api/v1/topics";

// 	get(url,function(text){
// 		console.log(text);
// 	})
// .// }/