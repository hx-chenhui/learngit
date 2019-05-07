import Vue from 'vue'
import axios from 'axios'
Vue.prototype.axios = axios


let setter = {
    domain: 'http://192.168.1.242:30001',
    // https://mapi.quanqiudiaoyu.com
    tableName: 'hgxf_wap',
    cacheName: 'hxgf_wap_cache',
    req(options) {
        // 先去缓存获取，没有获取到或者已过期重新获取并重新缓存
        let tokenObj = JSON.parse(localStorage.getItem(setter.tableName)) || {};
        // 获取token过期时间
        let tokenExp = tokenObj.expired_span || 0;
        // 获取当前时间戳
        let nowTime = new Date().getTime();
        if (tokenExp < nowTime) {
            // 重新获取token
            setter.get_token().then((bres) => {
                let tokenRes = bres.data.data;
                // token的过期时间
                tokenRes.expired_span = (new Date(new Date().valueOf() + (tokenRes.expied - 5) * 1000)).getTime();
                // 把token转换字符串
                localStorage.setItem(setter.tableName, JSON.stringify(tokenRes));
                // Alter defaults after instance has been created
                //instance.defaults.headers.common['Authorization'] = `Berear ${access_token}`;
                // 把获取的token 重新赋值给opetion
                options.access_token = tokenRes.token || '';
                // Alter defaults after instance has been created
                // instance.defaults.headers.common['Authorization'] = `Berear ${access_token}`;
                // 把option传递给setter
                setter.basereq(options);
            })
        } else {
            options.access_token = tokenObj.token || '';
            // Alter defaults after instance has been created
            // instance.defaults.headers.common['Authorization'] = `Berear ${access_token}`;
            setter.basereq(options);
        }
    },
    basereq(options) {
        // 创建一个axios实例对象
        var instance = axios.create();
        // 设置请求头
        instance.defaults.headers.common['access_token'] = options.access_token;
        // 把get/post转换给小写
        let method = (options.method || 'get').toLowerCase();
        if (method === 'get') {
            // get请求
            axios.get(`${setter.domain}/${options.url}`).then((res) => {
                options.done(res.data);
            })
        } else if (method === 'post') {
            // post请求
            axios.post(`${setter.domain}/${options.url}`, options.data).then((res) => {
                options.done(res.data);
            })
        }
    },
    get_token() {
        return axios.get(`${setter.domain}/token/apply`);
    }
};
export { setter }
// export default setter;
