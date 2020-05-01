### webpack-tem
### 下载安装
npm run webpack-tem
- [下载](https://github.com/zhangzheng-zz/webpack-tem/releases)

### 持续集成
```
git pull 
npm run commit
git push(通过单元测试集成成功之后)

npm version patch 补丁
npm version minor 小版本
npm version major 大版本
(自动修改版本号并 进行 git commit 并创建 git tag,执行git push 和 npm publish )

```