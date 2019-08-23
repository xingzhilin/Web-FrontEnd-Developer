关于浏览器缓存
浏览器缓存，有时候我们需要他，因为他可以提高网站性能和浏览器速度，提高网站性能。但是有时候我们又不得不清除缓存，因为缓存可能误事，出现一些错误的数据。像股票类网站实时更新等，这样的网站是不要缓存的，像有的网站很少更新，有缓存还是比较好的。今天主要介绍清除缓存的几种方法。

清理网站缓存的几种方法
meta方法
//不缓存
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="0">
清理form表单的临时缓存
<body onLoad="javascript:document.yourFormName.reset()">
其实form表单的缓存对于我们书写还是有帮助的，一般情况不建议清理，但是有时候为了安全问题等，需要清理一下！

jquery ajax清除浏览器缓存
方式一：用ajax请求服务器最新文件，并加上请求头If-Modified-Since和Cache-Control,如下:

  $.ajax({
     url:'www.haorooms.com',
     dataType:'json',
     data:{},
     beforeSend :function(xmlHttp){ 
        xmlHttp.setRequestHeader("If-Modified-Since","0"); 
        xmlHttp.setRequestHeader("Cache-Control","no-cache");
     },
     success:function(response){
         //操作
     }
     async:false
  });
方法二，直接用cache:false,

  $.ajax({
     url:'www.haorooms.com',
     dataType:'json',
     data:{},
     cache:false, 
     ifModified :true ,

     success:function(response){
         //操作
     }
     async:false
  });
方法三：用随机数，随机数也是避免缓存的一种很不错的方法！

URL 参数后加上 "?ran=" + Math.random(); //当然这里参数 ran可以任意取了
方法四：用随机时间，和随机数一样。

在 URL 参数后加上 "?timestamp=" + new Date().getTime(); 
用php后端清理
在服务端加 header("Cache-Control: no-cache, must-revalidate");等等(如php中)