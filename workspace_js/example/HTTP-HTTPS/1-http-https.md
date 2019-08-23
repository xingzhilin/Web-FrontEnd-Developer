##背景
    HTTP（超文本传输协议）被用于在Web浏览器和网站服务器之间，以明文方式传递信息，不提供任何方式的数据加密，因此使用HTTP协议传输隐私信息（如：银行卡号、密码等支付信息）非常不安全。

    为了解决这一安全缺陷，网景公司设计了SSL（Secure Sockets Layer）协议，在HTTP的基础上加入了SSL（Secure Sockets Layer）协议，SSL依靠SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。从而诞生了HTTPS（安全套接字层超文本传输协议）。

    简单来说，HTTPS协议="SSL+HTTP协议"构建的可进行加密传输、身份认证的网络协议，是HTTP的安全版。

## 不同之处
    HTTPS和HTTP的区别主要如下：

        工作层：在OSI网络模型中，HTTP工作于应用层，而HTTPS工作在传输层。
        连接端口：HTTP标准端口是80，而HTTPS的标准端口是443。
        传输方式：HTTP是超文本传输协议，信息是明文传输，而HTTPS是SSL加密传输协议。
        工作耗时：HTTP耗时=TCP握手，而HTTPS耗时=TCP握手+SSL握手。
        显示形式：HTTP的URL以http://开头，而HTTPS的URL以https://开头。
        费用：HTTP无需费用，而HTTPS需要到CA申请证书，一般免费证书较少，需要一定费用。
        安全性：HTTP的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比HTTP协议安全。