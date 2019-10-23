import { MicroPlugin } from './Plugin';
import { MicroEntry } from './Entry';
import { LifeMethod } from '../Interface';

export class PluginService {
    public plugins: Map<string, MicroPlugin>;
    public constructor() {
        this.plugins = new Map<string, MicroPlugin>();
    }

    /**
     * 注册插件到服务中
     * @param {*} plugin
     */
    public register(plugin: MicroPlugin) {
        this.plugins.set(plugin.name, plugin);
    }
    /**
     * 模块调用关联模块的生命周期方法
     */
    public applyPluginsLifeMethod(entry: MicroEntry, lifeName: LifeMethod) {
        const plugins = entry.getPluginNames();
        return plugins.map((item) => {
            let plugin = this.plugins.get(item);
            if (plugin) {
                return plugin.lifeMethod(entry, lifeName);
            }
            return Promise.resolve();
        });
    }
}
