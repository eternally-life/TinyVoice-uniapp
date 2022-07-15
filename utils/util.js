export function getUrlParam(name) {
    // 获取具体参数值
    if (name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
        }
    } else {
        // 获取所有参数值
        const reg2 = new RegExp(/(\w+)=(\w+)/ig);
        const r2 = window.location.search;
        const params = {};
        if (r2) {
            r2.replace(reg2, (a, key, value) => {
                params[key] = value;
            });
            return params;
        } else {
            return null;
        }
    }
}