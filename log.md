# 踩坑记录

## 关于CI

Vue CLI官方文档中提供了两种基于Github Pages的CI方式，其中第一个坑就是`不要看中文文档`，因为中文文档“年久失修”，很多错误的地方也没人勘误，建议以[英文文档](https://cli.vuejs.org/guide/deployment.html#github-pages)为准。

接着就是关于两种CI方式，其中第一种手动方式没什么问题，本地写一个Shell脚本，需要发布项目的时候手动执行，核心逻辑如下

1. build生成dist
2. 进到dist目录，将dist目录初始化为一个git项目并提交，强制推送到当前项目远程的gh-pages分支
3. 退出dist目录

另外就是通过集成travis的自动化方式，核心步骤如下

1. 在本地安装travis客户端(gem install travis)
2. 使用github登录travis(travis login --com --github-token xxx)
3. 设置travis变量（用于travis调用github API来拉取你的github项目）(travis env set GITHUB_TOKEN xxx)
4. 项目中增加travis配置文件
5. 在travis网站观察CI结果

这里面坑很多，首先第一个就是`Vue CLI官方文档中提供的travis登录方式已经过时`，即直接进行`travis --login`输入github用户名和密码后会报`NOT FOUND`错误，这里是由于[这个](https://github.com/travis-ci/travis.rb/issues/794#issuecomment-787485778)原因，所以需要使用github_token的方式进行登录。

第二个坑就是按照CI逻辑，推送了本地分支，却没有发生gh-pages分支的更新，即自动化根本没有执行。这里可以通过travis网站的控制台查看requests中所有的CI请求都是失败的，提示的报错大多是`Could not authorize build request for xxx`。而这里的错误根本不是字面意思这样，而是需要手动在travis的plan中选择一个套餐，即使是免费套餐也得选择。原因发现自[这里](https://stackoverflow.com/questions/41034694/travis-could-not-authorize-build-request/41078031)