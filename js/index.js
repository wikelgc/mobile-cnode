// 首页
var nav = document.getElementsByTagName('nav')[0].getElementsByTagName("li");
var index = nav[0];
// 精华
var good = nav[1];
// 分享
var share = nav[2];
// 问答
var ask = nav[3];
// 招聘
var job = nav[4];
var rounter = "";

for(var i=0;i<nav.length;i++){
	(function(i){
		// console.log(1);
		return nav[i].onclick = function(){
				var rounter = ""; 
				console.log(i);
				if(i == 0){
					rounter = ""
				}else if(i == 1){
					rounter = "good";
				}else if(i == 2){
					rounter = "share";
				}else if(i == 3){
					rounter = "ask";
				}else if(i == 4){
					rounter = "job";
				}else{
					rounter = "";
				}
				ajax(rounter);
		}
	})(i);
}




$(function(){
	ajax("job");


})


$(function(){
	var zip = new RegExp("")
	var text = '<span>我的世界</span>'
	var result = text.replace(/<[^>]*>/g," ");
	console.log(result);
})



function ajax(rounter,state){
	$.ajax({
        type:"GET",   
        data:{
        	page:10,
        	tab:rounter,
        	limit:20
        },
        url: "https://cnodejs.org/api/v1/topics",
        dataType:"json",
        success:function (result) {
            // console.log(JSON.stringify(result)7);
            var html = JSON.stringify(result);
            console.log(result.data);


            data = result.data[0];	
            var html = "";

            for(var i=0; i<result.data.length;i++){
            	var data = result.data[i];
            	var contentMin = data.content.replace(/<[^>]*>/g,"");
            	var contentMax= data.content.replace(/src=\"\/\//g,"src=\"https:\/\/");

            	// if(state)
            	
            	html+='<li class="article-li">'+
            					'<div class="header">'+
            						'<span class="name">'+data.author.loginname+'</span>'+
            						'<time>'+'10分钟前'+'</time>'+
            						'<img src="'+data.author.avatar_url+'">'+ 
          						'</div>'+
       
         						 '<div class="title">'+data.title+'</div>'+
          					 '<div class="makedown">'+
          					  '<span class="showSpan">'+contentMin.substring(0,150)+'</span>'+
          					  '<div  class="showDiv">'+contentMax+'</div>'+
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

            	var article = document.getElementsByClassName("article");
						  var li = article[0].getElementsByClassName("article-li");

						for(var j=0;j<li.length;j++){
							(function(j){
								var showup = li[j].getElementsByClassName("showup"); 
								return showup[0].onclick = function(){
									// console.log(j);
									if(showup[0].innerText == "显示全部"){
										li[j].getElementsByClassName("showSpan")[0].style.display = "none";
										li[j].getElementsByClassName("showDiv")[0].style.display = "block";	
										showup[0].innerText = "收起";	
									}else{
										li[j].getElementsByClassName("showSpan")[0].style.display = "block";
										li[j].getElementsByClassName("showDiv")[0].style.display = "none";	
										showup[0].innerText = "显示全部";	
									}	
								}
							})(j)
}
        },
        error:function (result, status) {
        //处理错误
            console.log(result);
        }
});
}