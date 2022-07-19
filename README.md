# moyu-reader
Chrome 上的看小说插件。

**用的笔趣阁接口，说不准什么时候就封了……**

## 安装
```
1. 代码拉下来
2. yarn
3. yarn run build
4. chrome 更多工具 ——> 扩展程序 ——> 加载已解压的扩展程序 ——> 选择项目下的 dist 目录
```

## 介绍
### 为什么会有这个玩意
原本就只是一个简单的 Vue3 的学习demo， 慢慢扩展成了这么一个东西


### 都做了什么
- [x] Vue3 + setup 语法糖 + ts
- [x] pinia
- [x] webpack 的一个小插件，用来生成 manifest 文件
- [ ] vite 构建版本

### 待解决问题
- [ ] vite 开发环境的打包结果不太对
- [ ] chrome 的 message 系统真的难搞
- [ ] vant 的按需引用