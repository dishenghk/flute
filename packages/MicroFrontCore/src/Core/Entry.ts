import { MicroService } from './MicroService';
import { MicroFrontMessage, MicroModule } from '../Interface';
import { System } from '../Utils/System';

export class MicroEntry {
    public name: string;
    public jsUrl: string;
    public pluginNames: string[] = [];
    public modules: MicroModule[] = [];
    // 模块是否已经被加载
    public loaded = false;
    public constructor(name: string, jsUrl: string, pluginNames: string[]) {
        this.name = name;
        this.jsUrl = jsUrl;
        this.pluginNames = pluginNames;
    }

    public checkShouldLoad(event?: Event, microService?: MicroService) {
        return false;
    }

    public checkShouldUnLoad(event?: Event, microService?: MicroService) {
        return false;
    }

    public getPluginNames() {
        return this.pluginNames;
    }
    public start(microService: MicroService) {
        microService.noticeOtherEntry(this, { type: 'loaded', value: 'isloaded' });
        let pluginService = microService.getPluginService();
        // 调用插件的before load生命周期方法
        Promise.all(pluginService.applyPluginsLifeMethod(this, 'beforeload'))
            .then((result) => {
                return System.import(this.jsUrl).then(
                    (remoteModules: { default: MicroModule[] }) => {
                        this.modules = remoteModules.default;
                        remoteModules.default.forEach((module) => {
                            module.render();
                        });
                    }
                );
            })
            .then((value) => {
                this.loaded = true;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    public onEntryNotice(entry: MicroEntry, notice: MicroFrontMessage) {}

    /**
     * 载入的时机,也是入口方法
     */
    public onEvent(event: Event, microService: MicroService) {
        let pluginService = microService.getPluginService();
        if (this.checkShouldLoad(event, microService)) {
            this.start(microService);
            return;
        }
        if (this.checkShouldUnLoad(event, microService)) {
            pluginService.applyPluginsLifeMethod(this, 'beforeunmount');
            this.modules.forEach((item) => {
                item.destory();
            });
            // if(this.module && this.module.destory){
            //     this.module.destory()
            // }
        }
    }
}
