# @author  xingzhilin
# @date 2019-08-16
# VueJs
# vue.js安装过程(npm安装)
# 一直在用的是vuejsV2.0， V3.0和V2.0还有很大区别的，下面分别记录一下安装过程

# 在安装vue之前，需要保证你已经安装了nodejs wenpack等环境
    - Node.js: JavaScript运行环境(runtime),不同系统直接运行各种编程语言

    - npm: Nodejs下的包管理器。

    - webpack: 它主要的用途是通过 CommonJS 的语法把所有浏览器端需要发布的静态资源做相应的准备，比如资源的合并和打包。

    vue-cli: 用户生成Vue工程模板
# 由于npm安装很慢，所以需要设置淘宝镜像
    - npm install -g cnpm --registry=https://registry.npm.taobao.org
    完成之后，我们就可以用cnpm代替npm来安装依赖包了。

# vuejs V2.0 安装过程
    - 安装全局vue-cli脚手架,用于帮助搭建所需的模板框架 
        cnpm install -g vue-cli
    - 用vue-cli构建项目  - vue init <template-name> <project-name>
        vue init webpack my-project

    - 安装依赖 
        cd my-project
        cnpm install 
    - 运行项目
        npm run dev

# vuejs V3.0 安装过程 - Vue-CIL 3.x 安装及搭建脚手架
    - Vue-CIL 3.x
        官网： https://cli.vuejs.org/zh/guide/
    - Vue CIL 的包名称由vue-cil 改成了 @vue/cli。如果你已经全局安装了旧版本的vue-cli（1.x或2.x），需要先卸载它
        npm uninstall vue-cli -g 或 yarn global remove vue-cli 
    - 安装 @vue/cli
        npm install -g @vue/cli  &&&   yarn global add @vue/cli
    - 检查是否安装成功
        vue –version 或 vue – V
        3.8.4 （ 成功 ）
    - vue3.X脚手架安装 -- vue create <project-name>

        - Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
        - 自定义选择

        - cd vue-base-app
        - yarn serve  运行项目





