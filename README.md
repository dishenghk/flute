## FLUTE(长笛)-微前端的完善解决方案


### Install
```
npm install flute-core --save
```

### Getting Started
```
import { InitMicroApp, ReactPlugin, MicroService, MicroEntry } from 'flute-core';
function getMicroApp() {
    if (window.MicroApp) {
        return window.MicroApp as MicroService;
    }

    const microApp = InitMicroApp();
    window.MicroApp = microApp;
    return microApp;
}

const microApp = getMicroApp();
// example 主要加载组件
class MainEntry extends MicroEntry {
    public checkShouldLoad(event: Event, microService: MicroService) {
        // 避免重复加载
        if (this.loaded) return false;
        return true;
    }
    // 永不卸载
    public checkShouldUnLoad() {
        return false;
    }
}
// 注册ReactPlugin的
microApp.registerPlugin(new ReactPlugin('ReactPlugin'));
// 注册主要入口
microApp.registerEntry(new MainEntry('mainEntry', './module.js', ['ReactPlugin']));
// 注册全局加载时机
microApp.registerWindowLoadChance('onload', 'mainEntry');

```


### 目前微前端上的一些弊端和todo：
#### 调试问题
1. 无法单独运行&需要依赖众多公共模块 -- 解决办法 fibber whistle拦截器或webpack dev proxy 代理  替换资源 .可内置在脚手架方案中
2. 无法实现HMR(热加载)---需接管定制热加载触发函数
#### 运行时问题
1. 全局变量污染问题 -- 利用proxy监控window 拦截更新并存储/恢复 应用现场
2. 线上公共依赖库的按需加载问题 -- 核心解决办法 利用模块加载器System.js 或者sea.js 等  external 引入 亦或者 采用公共模块集合包  开发时使用公共包内方法引入 推荐后者
3. css 新的项目使用less/scss规范，旧的项目暂时没有太好的想法
