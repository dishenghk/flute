import { MicroPlugin, MicroEntry } from '../Core';
import { ScriptLoader } from '../Utils/ScriptLoader';
import { LifeMethod } from '../Interface';

export class ReactPlugin extends MicroPlugin {
    public lifeMethod(entry: MicroEntry, lifename: LifeMethod) {
        switch (lifename) {
            case 'beforeload':
                return new Promise((resolve, reject) => {
                    /** 避免基础环境无效的加载 */
                    if (window.React && window.ReactDOM) {
                        resolve();
                        return;
                    }
                    ScriptLoader('https://unpkg.com/react@16/umd/react.production.min.js', () => {
                        ScriptLoader(
                            'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
                            () => {
                                resolve();
                            }
                        );
                    });
                });

            default:
                return Promise.resolve();
        }
    }
}
