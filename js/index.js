// 全局变量
var lastRouter = "index";


function event(){
	// 导航页
	navEvent();
}

// 导航栏的事件监听
function navEvent(){
	var nav = document.getElementsByTagName('nav')[0].getElementsByTagName("li");
	var len = nav.length-1;
	var data = {
		rounter:"",
		page:1,
		limit:15
	}

	for(var i=len;i>=0;i--){
		(function(i){
			console.log(i);
			return nav[i].onclick = function(){
				var rounter = ""; 
				console.log(i);
				if(i == 0){
					rounter = "index";
				}else if(i == 1){
					rounter = "good";
				}else if(i == 2){
					rounter = "share";
				}else if(i == 3){
					rounter = "ask";
				}else if(i == 4){
					rounter = "job";
				}else{
					rounter = "index";
				}

				data.rounter = rounter;
				ajax(data);

				moreclick(data);
			}
		})(i);
	}
}


function ajax(data){
	//如果rounter是index,则转成"";
	if(data.rounter == "index"){
		data.rounter = "";
	}

	//判断当前页面与上一次的页面是否相同
	//如果是，则使page页面加1。如果不同,则重置page
  if(lastRouter != data.rounter ){
  		data.page = 1;
  		lastRouter = data.rounter;	
  		$(".article").find("ul").html("");
  }
  else{
  	data.page++;
  }

	$.ajax({
        type:"GET",
        data:{
        	tab:data.rounter,
        	page: data.page,
        	limit:data.limit
        },
        url: "https://cnodejs.org/api/v1/topics",
        dataType:"json",
        success:function (result) {
       		show(result,data);
        },
        error:function (result, status) {
           console.log(result);
        }
	});
}

function moreclick(data){
	// var click = 2;
	var more = document.getElementsByClassName("more")[0];
	more.onclick = function(){
		ajax(data)
	}
}

function show(result,datas){
	//定义一个对象获取数据 
  var data = {};
  var html = "";

  var contentMin = "";
  var contentMax = "";

  for(var i=0; i<result.data.length;i++){
  	data = result.data[i];
  	console.log(data);

  	// 去掉html中标签
  	contentMin = data.content.replace(/<[^>]*>/g,"");
  	
  	html+='<li class="article-li">'+
  					'<div class="header">'+
  						'<span class="name">'+data.author.loginname+'</span>'+
  						'<time>'+getTime(data.last_reply_at)+'</time>'+
  						'<img src="'+data.author.avatar_url+'">'+ 
						'</div>'+

						 '<div class="title">'+data.title+'</div>'+
					 '<div class="makedown">'+
					  '<div class="showDiv">'+contentMin.substring(0,150)+'</div>'+
  						'<a class="showup">显示全部</a>'+
						'</div>'+

           '<div class="footer">'+
             '<span>关注问题</span>'+
             '<span class ="comment">评论</span>'+
             '<span>感谢</span>'+
             '<span>禁止转载</span>'+
            '</div>'+
            '<div class="comment-box"><ul></ul><div class="comment-input"><input type="" name="" placeholder="写下你的评论"></div></div>'+
          '</li>';
  }

  html = "<li class='page'><ul>"+html+"</li></ul>";

	//在ul的尾部追加html 
  $(".article>ul").append(html);
  // 显示全部，


	//第几个页面
	console.log("datas"+datas.page);
	var page = document.getElementsByClassName("page")[datas.page-1];

	for(var j=0;j<datas.limit;j++){
		(function(j){

			var data = result.data[j];

			var id = data.id;
  		var contentMin = data.content.replace(/<[^>]*>/g,"");
  		var contentMax= data.content.replace(/src=\"\/\//g,"src=\"https:\/\/");
  		console.log("j.0"+j);
			
			var model = page.getElementsByClassName("article-li")[j];
			// console.log(model.length);

			var showup = model.getElementsByClassName("showup")[0];
			var comment = model.getElementsByClassName("comment")[0];
			var commentBox = model.getElementsByClassName("comment-box")[0];
	
			comment.onclick = function(){
				if(commentBox.style.display == "block"){
					commentBox.style.display = "none";
				}else{
					commentBox.style.display = "block";
					commentEvent(id,commentBox);
				}
			};

			return showup.onclick = function(){
				console.log(id);
				if(showup.innerText == "收起"){
					model.getElementsByClassName("showDiv")[0].innerHTML = contentMin.substring(0,150);	
					showup.innerText = "显示全部";
				}else{
					model.getElementsByClassName("showDiv")[0].innerHTML = contentMax;	
					showup.innerText = "收起";
				}	
			};		
		})(j)
  }
}


function getTime(Time){
	var startTime = new Date(Time);

	var endTime=new Date();  //开始时间
	  //结束时间
	var time=endTime.getTime()-startTime.getTime()  //时间差的毫秒数

	if(Math.floor(time/(24*3600*1000)) > 0){
		return Math.floor(time/(24*3600*1000))+"天前";
	}else if(Math.floor(time/(3600*1000)) > 0){
		return Math.floor(time/(3600*1000))+"小时前";
	}else if( Math.floor(time/(60*1000)) >0){
		return Math.floor(time/(60*1000))+"分钟前"
	}else if(Math.floor(time/(1000))>0){
		return Math.floor(time/(1000))+"秒前"
	}
	 
}

function commentEvent(id,commentBox){
	var renderHTML = "";
	console.log("id:"+id);
	$.ajax({
        type:"GET",
        url: "https://cnodejs.org/api/v1/topic/"+id,
        dataType:"json",
        success:function (result) {
       		console.log(result);
       		renderHTML = commentRender(result);
       		commentBox.getElementsByTagName("ul")[0].innerHTML=renderHTML;
        },
        error:function (result, status) {
           console.log(result);
        }
	});
}

function commentRender(result){
	var replies = result.data.replies;
	console.log(replies);
	var html = "";
	for(var i=0;i<replies.length;i++){
			 html += 	'<li>'+
									'<span class="comment-name">'+replies[i].author.loginname+'</span>'+
                  '<div class="comment-content">'+replies[i].content+'</div>'+
                  '<div class="comment-footer">'+
                    '<span class="comment-time">'+getTime(replies[i].create_at)+'</span>'+
                    '<span class="">回复</span>'+
                    '<span class="">赞</span>'+
                    '<span class="">举报</span>'+
                  '</div>'+
								'</li>';
	}	
 	return html;
}

// 系统初始化
function init(data){	
	// 获取首页的数据
	ajax(data);

	// 绑定事件


	// 绑定"更多"监听事件
	moreclick(data);
}



// main()
$(function(){

	var data = {
	 	rounter: "index",
  	page: 1,
  	limit:15
  };
	// 初始化 -- 对首页的初始化
	init(data);
	// 事件监听
	event();
});