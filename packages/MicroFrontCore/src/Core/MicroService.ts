import { PluginService } from './PluginService';
import { MicroEntry } from './Entry';
import { MicroPlugin } from './Plugin';
import { WindowLoadChangeName, MicroFrontMessage } from '../Interface';

export class MicroService {
    public pluginService: PluginService;
    public eventTypeMoudles: Map<WindowLoadChangeName, Set<string>>;
    public entrys: Map<string, MicroEntry>;

    public constructor(pluginService: PluginService) {
        this.entrys = new Map<string, MicroEntry>();
        this.pluginService = pluginService;
        // 监听事件类型的注册
        this.eventTypeMoudles = new Map();
    }
    /**
     * 服务注册入口
     * @param {*} entry
     * @memberof Services
     */
    public registerEntry(entry: MicroEntry) {
        this.entrys.set(entry.name, entry);
    }

    public getPluginService() {
        return this.pluginService;
    }
    public registerPlugin(plugin: MicroPlugin) {
        this.pluginService.register(plugin);
    }

    /**
     * 注册全局加载时机 如onload hashchange
     * @param eventType
     * @param
     */
    public registerWindowLoadChance(eventType: WindowLoadChangeName, entryName: string | string[]) {
        let tmpSet = this.eventTypeMoudles.get(eventType) || new Set<string>();
        if (Array.isArray(entryName)) {
            entryName.forEach((name) => {
                tmpSet && tmpSet.add(name);
            });
        } else {
            tmpSet.add(entryName);
        }
        this.eventTypeMoudles.set(eventType, tmpSet);

        // 更新监听方法
        window[eventType] = (event: Event) => {
            [...this.eventTypeMoudles.get(eventType)].forEach((moudleName) => {
                let tmpEntry = this.entrys.get(moudleName);

                tmpEntry && tmpEntry.onEvent(event, this);
            });
        };
    }
    /**
     * 直接开启某个模块
     */
    public loadMoudle(moudleName: string) {
        let tmpEntry = this.entrys.get(moudleName);
        tmpEntry && tmpEntry.start(this);
    }
    /**
     * 通知其他模块.本模块被加载了
     */
    public noticeOtherEntry(sendEntry: MicroEntry, notice: MicroFrontMessage) {
        this.entrys.forEach((entry, entryName) => {
            if (entryName !== sendEntry.name) {
                entry.onEntryNotice(sendEntry, notice);
            }
        });
    }
}
