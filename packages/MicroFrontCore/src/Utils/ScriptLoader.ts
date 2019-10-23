export const ScriptLoader = function(url: string, cb: (...args: any[]) => any) {
    const el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', url + '?max_age=20000000');
    el.setAttribute('async', 'true');
    el.onerror = function() {
        cb();
        el.onerror = null;
    };
    el.onload = () => {
        cb && cb();
    };
    document.getElementsByTagName('head')[0].appendChild(el);
};
