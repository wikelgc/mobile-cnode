// 导航页
var nav = document.getElementsByTagName('nav')[0].getElementsByTagName("li");

var len = nav.length-1;

for(var i=len;i>0;i--){
	(function(i){
		console.log(i);
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
				rounterChoise(rounter);
				// ajax(rounter);
		}
	})(i);
}


// 路由

function rounterChoise(rounter){
	// 初始化
	ajax(rounter);

	// more click
	moreclick(rounter)
}



$(function(){
	ajax();
})



function ajax(rounter,state){
	if(rounter == undefined){
		rounter = "";
	}
	console.log(rounter);
	$.ajax({
        type:"GET",
        data:{
        	tab:rounter,
        	page: 1,
        	limit:20
        },
        url: "https://cnodejs.org/api/v1/topics",
        dataType:"json",
        success:function (result) {
            var html = JSON.stringify(result);
            console.log(result.data);


            data = result.data[0];	
            var html = "";

            for(var i=0; i<result.data.length;i++){
            	var data = result.data[i];
            	var contentMin = data.content.replace(/<[^>]*>/g,"");
            	
            	html+='<li class="article-li">'+
            					'<div class="header">'+
            						'<span class="name">'+data.author.loginname+'</span>'+
            						'<time>'+'10分钟前'+'</time>'+
            						'<img src="'+data.author.avatar_url+'">'+ 
          						'</div>'+
       
         						 '<div class="title">'+data.title+'</div>'+
          					 '<div class="makedown">'+
          					  '<div class="showDiv">'+contentMin.substring(0,150)+'</div>'+
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


            // 显示全部，
            var article = document.getElementsByClassName("article");
						var li = article[0].getElementsByClassName("article-li");

						for(var j=0;j<li.length;j++){
							(function(j){

								var data = result.data[j];
            		var contentMin = data.content.replace(/<[^>]*>/g,"");
            		var contentMax= data.content.replace(/src=\"\/\//g,"src=\"https:\/\/");

								var showup = li[j].getElementsByClassName("showup"); 
								return showup[0].onclick = function(){
									// console.log(j);
									if(showup[0].innerText == "收起"){
										// li[j].getElementsByClassName("showSpan")[0].style.display = "none";
										li[j].getElementsByClassName("showDiv")[0].innerHTML = contentMin.substring(0,150);	
										showup[0].innerText = "显示全部";	
									}else{
										// li[j].getElementsByClassName("showSpan")[0].style.display = "block";
										li[j].getElementsByClassName("showDiv")[0].innerHTML = contentMax;	
										showup[0].innerText = "收起";	
									}	
								}
							})(j)

						// 点击更多
}
        },
        error:function (result, status) {
        //处理错误
            console.log(result);
        }
});
}

function moreclick(rounter){
	var click = 2;
	var more = document.getElementsByClassName("more")[0];
	more.onclick = function(){
		addAjax("",click++);
	}
}
function addAjax(rounter,page){
	console.log(page);
	$.ajax({
        type:"GET", 
        data:{
        	page:page,
        	tab:rounter,
        	limit:20
        },
        url: "https://cnodejs.org/api/v1/topics",
        dataType:"json",
        success:function (result) {
        	var html = JSON.stringify(result);
            console.log(result.data);


            data = result.data[0];	
            var html = "";

            for(var i=0; i<result.data.length;i++){
            	var data = result.data[i];
            	var contentMin = data.content.replace(/<[^>]*>/g,"");
            	
            	html+='<li class="article-li">'+
            					'<div class="header">'+
            						'<span class="name">'+data.author.loginname+'</span>'+
            						'<time>'+'10分钟前'+'</time>'+
            						'<img src="'+data.author.avatar_url+'">'+ 
          						'</div>'+
       
         						 '<div class="title">'+data.title+'</div>'+
          					 '<div class="makedown">'+
          					  '<div class="showDiv">'+contentMin.substring(0,150)+'</div>'+
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

            $(".article").find("ul").append(html);
        }
      })
}