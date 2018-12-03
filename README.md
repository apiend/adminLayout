## adminLayout
admin layout ui 

## 后台ui
require-js 后台模板


### 目录说明

- src
  - components   公共模块 VUE, 如 tips ,dialog
  - static       公共静态文件
    - css
       - fonts
    - common   公用
    - images
    - js
        - lib     引用第三方的库
  - views         页面文件
    - login       登录页面
    - home        主页
    - layout     框架文件
  - index.html 入口文件
  - app.js     入口配置文件

### es6 模块的引入

```javascript
  define(['es6!your-es6-module'], function(module) {
    // ...
  });
```

#### 模板更新说明 

各组件的样式, 代码参数  :
 
http://element-cn.eleme.io/#/zh-CN/component/layout
https://bulma.io/documentation/
