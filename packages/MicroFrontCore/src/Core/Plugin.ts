import { MicroEntry } from './Entry';
import { LifeMethod } from '../Interface';

export class MicroPlugin {
    public name: string;
    /**
     * 初始化插件
     * @param {*} id 插件唯一ID
     */

    public constructor(name: string) {
        this.name = name;
    }

    public lifeMethod(entry: MicroEntry, lifeName: LifeMethod): Promise<any> {
        // 针对不同的生命周期函数
        switch (lifeName) {
            default:
                return Promise.resolve();
        }
    }
}
