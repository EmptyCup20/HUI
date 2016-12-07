# HUI

海康共享视觉展示网站

全局安装`gulp`
```

npm install -g gulp
```

#### 项目依赖安装

```
  npm install
```

然后运行
```
    node app.js
```
## V1.0功能

- 首页展示
- 作品池 
- 图标库展示
- 关于我们

## V1.0剩余功能

- 资源库
  + 已完成图片上传功能
  + 已完成图片展现
- 关于我们
- 作品池


## V1.0可改进功能


## 项目中的问题

* 多图合成的svg无法转成ttf，woff，eof，(可实现但不是最优)
* svg 如何组合，解析存在问题
* svg 保存为base64并转化


## 2016/11/25

* 图片上传，保存到本地目录
* 连接数据库，将上传图片相关信息插入数据库

## 2016/11/29

* 引入ejs模板
* 添加图标集字段
* 按类别查询图标并返回前台展示

## 2016/12/01
* 新增“关于我们”页面内容（待完善）
* 首页首屏logo增加动画效果，第二屏图标增加hover动态效果
* svg资源存到图片服务器
* 首页实现鼠标滚轮翻页

## 2016/12/06
* 增加后台入口(localhost:7000/admin)
* md文档编辑并实时预览
* HUI设计语言模块根据文档内容(h1,h3标签)动态生成右侧导航树并添加锚点
* 文档编辑上传图片时，自动插入图片链接到鼠标光标位置
