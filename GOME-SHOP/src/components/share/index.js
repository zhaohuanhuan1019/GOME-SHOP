import Share from './share.vue'
import eventbus from '../eventBus/index'
let list = [];

// options 为一个对象，可选属性为
//       title: 标题，默认为文档的title
//       desc: 描述，默认为文档的title
//       link: 分享出去的链接，默认为当前所在页面url
//       imgUrl: 分享出去的图片链接，默认为 gome logo
const share = function (options) {
    console.log(options)
    if(list.length > 0) {
        list[0].$destroy()
    }
    const $container = document.createElement('div')    
    $container.id = 'share-id'
    document.body.appendChild($container);
    const defaults = {
        title: window.qq_zone_title ? window.qq_zone_title : document.title,
        desc: window.qq_zone_desc ? window.qq_zone_desc : document.title,
        link: window.qq_zone_link ? window.qq_zone_link :location.href,
        imgUrl: window.qq_zone_img ? window.qq_zone_img : 'http://img.gomein.net.cn/mobile/images/share/logo.png?v=20171103',
    }
    let sina_titles
    let sina_descs
    let sina_links
    let sina_imgs
    
    let qq_zone_titles = sina_titles = options.title ? options.title : defaults.title
    let qq_zone_descs = sina_descs = options.desc ? options.desc : defaults.desc
    let qq_zone_links = sina_links = options.link ? options.link  : defaults.link
    let qq_zone_imgs = sina_imgs = options.imgUrl ? options.imgUrl : defaults.imgUrl
    
    const shareInstance = new Share({
        el: '#'+$container.id,
        data : {
            qq_zone_titles,
            qq_zone_descs,
            qq_zone_links,
            qq_zone_imgs,
            sina_titles,
            sina_descs,
            sina_links,
            sina_imgs,
        },
        destroyed () {
            list.shift()
            this.$el.parentNode.removeChild(this.$el)
        }
    })
    list.push(shareInstance)
    return shareInstance;
}
eventbus.on('toShare', (options) => {
    share(options)
});
export default share;
