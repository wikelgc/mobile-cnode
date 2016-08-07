// 全局变量
var lastRouter = "ss";


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
	if(data.rounter == "index"){
		data.rounter = "";
		// data.page++;
	}

	//判断当前页面与上一次的页面是否有区别
	// 如果有，则设置page页面为1
  if(lastRouter != data.rounter ){
  		data.page = 1;	
  		$(".article").find("ul").html("");
  		lastRouter = data.rounter;
  		
  }
  else{

  // 否则让page页面自增
  	data.page++;
  	console.log(data.page)
  }

	console.log(data.page);
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

	console.log("datas.rounter:"+datas.rounter+",datas.page:"+datas.page);

	//定义一个对象获取数据 
  var data = {};
  var html = "";

  var contentMin = "";
  var contentMax = "";

  for(var i=0; i<result.data.length;i++){
  	data = result.data[i];

  	// 去掉html中标签
  	contentMin = data.content.replace(/<[^>]*>/g,"");
  	
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

	//在ul的尾部追加html 
  $(".article").find("ul").append(html);

  // 显示全部，
  var article = document.getElementsByClassName("article");
	var li = article[0].getElementsByClassName("article-li");

	for(var j=0;j<datas.limit;j++){
		(function(j){

			var data = result.data[j];
  		var contentMin = data.content.replace(/<[^>]*>/g,"");
  		var contentMax= data.content.replace(/src=\"\/\//g,"src=\"https:\/\/");
  		// console.log(result.da)
  		console.log(datas.page+"ssss"+datas.limit)
			var showup = li[j+(datas.page-1)*datas.limit].getElementsByClassName("showup"); 
			return showup[0].onclick = function(){
				// contentMin
				console.log(j);
				console.log(contentMin);
				if(showup[0].innerText == "收起"){
					// li[j].getElementsByClassName("showSpan")[0].style.display = "none";
					li[j+(datas.page-1)*datas.limit].getElementsByClassName("showDiv")[0].innerHTML = contentMin.substring(0,150);	
					showup[0].innerText = "显示全部";	
				}else{
					// li[j].getElementsByClassName("showSpan")[0].style.display = "block";
					li[j+(datas.page-1)*datas.limit].getElementsByClassName("showDiv")[0].innerHTML = contentMax;	
					showup[0].innerText = "收起";	
				}	
			}
		})(j)
  }
}

function commentclick(id){
	$.ajax({
        type:"GET",
        url: "https://cnodejs.org/api/v1/topic/"+id,
        dataType:"json",
        success:function (result) {
       		// show(result,data);
       		console.log(result);
        },
        error:function (result, status) {
           console.log(result);
        }
	});
}

// 系统初始化
function init(data){	
	// 清空列表数据
	$(".article").find("ul").html("");
	// 获取首页的数据
	ajax(data);

	// 绑定"更多"监听事件
	console.log(data);
	moreclick(data);

	// var id = "5433d5e4e737cbe96dcef312";
	// commentclick(id);
}

// main()
$(function(){

	var data = {
	 	rounter: "index",
  	page: 1,
  	limit:15
  };
	// 初始化
	init(data);
	// 事件监听
	event();
});