## Axios
   - Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
## 安装 
    - 使用 npm:
    $ npm install axios

    - 使用 bower:
    $ bower install axios

    - 使用 cdn:
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>


## 特点
    从浏览器中创建 XMLHttpRequests
    从 node.js 创建 http 请求
    支持 Promise API
    拦截请求和响应
    转换请求数据和响应数据
    取消请求
    自动转换 JSON 数据
    客户端支持防御 XSRF
## 全局的 axios 默认值
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
## 自定义实例默认值
    // Set config defaults when creating the instance
    const instance = axios.create({
    baseURL: 'https://api.example.com'
    });

    // Alter defaults after instance has been created
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
## 拦截器
    在请求或响应被 then 或 catch 处理前拦截它们。

    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    如果你想在稍后移除拦截器，可以这样：
    const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
    axios.interceptors.request.eject(myInterceptor);
    可以为自定义 axios 实例添加拦截器
    const instance = axios.create();
    instance.interceptors.request.use(function () {/*...*/});
