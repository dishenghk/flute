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

export default {
    MicroApp: getMicroApp()
};
