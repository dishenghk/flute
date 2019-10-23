export type LifeMethod = 'beforeload' | 'beforeunmount';
export type WindowLoadChangeName = 'onload' | 'onhashchange';
export interface MicroFrontMessage {
    type: string;
    value: string;
}

export interface MicroModule {
    render: () => void;
    destory: () => void;
}
