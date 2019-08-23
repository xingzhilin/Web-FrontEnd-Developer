<meta http-equiv="Cache-Control"content="max-age=0"/>

    页面缓存时间的最大值是0秒，目的是不让页面缓存，每次访问必须到服务器读取


    有时候，我们可以在网站<head>标签中，看到

<meta http-equiv="Cache-Control" content="no-transform" />
    这样的声明或者

<meta http-equiv="Cache-Control" content="no-transform " />

    no-transform后面多了个空格，不知道是不是百度官方给的格式写错了。

    这个是百度官方给的禁止转码声明。在网页中添加了这一条，百度就不会移动搜索中将网站转码，并呈现给移动端用户。

    感觉这么做还是有些不妥，就等于是拒绝了移动端的流量。虽然转码了也不好，但是聊胜于无吧。

    最好的方法还是直接给出网页对应的移动端网页地址让百度去抓取，声明如下：

<link rel="alternate" type="application/vnd.wap.xhtml+xml" media="handheld" href="target"/>

    target是移动端网页。这个也是百度官方给出的格式。

    meta http-equiv="Cache-Control" content="no-transform" 

## http-equiv=mobile-agent说明
Meta声明的格式：
<meta http-equiv=”mobile-agent” content=”format=[wml|xhtml|html5]; url=url”>

比如:

<meta http-equiv=”mobile-agent” content=”format=html5; url=http://m.abc.com/”> 表示当前访客是移动访客且支持HTML5时，转向网址 http://m.abc.com

生效情况：
标注Meta声明这一适配方案仅限适用于百度移动搜索，即只有当用户通过百度移动搜索访问站点时，适配才会生效；通过其他渠道则不生效。
生效时间：在标注准确对应关系无误的情况下，百度会在七天左右进行处理，老旧页面会有延迟。但百度不保证一定能在移动搜索结果中按照您提交的对应关系进行替换。



# 浏览器内核控制Meta标签说明文档
背景介绍

由于众所周知的情况，国内的主流浏览器都是双核浏览器：基于Webkit内核用于常用网站的高速浏览。基于IE的内核用于兼容网银、旧版网站。以360的几款浏览器为例，我们优先通过Webkit内核渲染主流的网站，只有小量的网站通过IE内核渲染，以保证页面兼容。在过去很长一段时间里，我们主要的控制手段是一个几百k大小网址库，一个通过长期人工运营收集的网址库。

尽管我们努力通过用户反馈、代码标签智能判断技术提高浏览器的自动切核准确率。但是在很多情况下，我们仍然无法达到百份百正确。因此，我们新增加了一个控制手段：内核控制Meta标签。只要你在自己的网站里增加一个Meta标签，告诉360浏览器这个网址应该用哪个内核渲染，哪么360浏览器就会在读取到这个标签后，立即切换对应的内核。并将这个行为应用于这个二级域名下所有网址。

目前该功能已经在所有的360安全浏览器实现。我们也建议其它浏览器厂商一起支持这个实现。让这个控制标签成为行业标准。

代码示例
在head标签中添加一行代码：

<html>
  <head>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
  </head>
  <body>
  </body>
</html>
content的取值为webkit,ie-comp,ie-stand之一，区分大小写，分别代表用webkit内核，IE兼容内核，IE标准内核。 
若页面需默认用极速核，增加标签：<meta name="renderer" content="webkit"> 
若页面需默认用ie兼容内核，增加标签：<meta name="renderer" content="ie-comp"> 
若页面需默认用ie标准内核，增加标签：<meta name="renderer" content="ie-stand">