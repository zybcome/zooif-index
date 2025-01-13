const CompressionPlugin = require('compression-webpack-plugin');
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: "0.0.0.0",
    port: 1008 // default: 3000
  },
  head: {
    title: 'ZooIf',
    meta: [
      { 'http-equiv': "Content-Type", charset: 'text/html;utf-8' },
      { name: 'keywords', content: "简繁体翻译,骰子小游戏,抖音无水印下载,皮皮虾无水印下载,笑话大全,舔狗日记,实用小工具-ZooIf" },
      { name: 'description', content: 'ZooIf,骰子小游戏,提供各种实用小工具,抖音视频去水印下载,皮皮虾视频去水印下载,笑话大全,提供实用小工具' },
      { name: 'viewport', content: 'initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no' },
      { name: 'Resource-type', content: "Document" },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    ],
    script: [
      { src: '/js/jquery-3.6.0.min.js', type: "text/javascript" },
      { src: '/js/jquery.i18n.properties-min-1.0.9.js', type: "text/javascript" },
      { src: '/js/bootstrap.min.js', type: "text/javascript" },
      { src: '/js/baidutongji.js', type: "text/javascript" },
      { src: '/js/crypto-js.js', type: "text/javascript" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/examples.css' },
      { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/nav.css' },
      { rel: 'stylesheet', href: '/css/footer.css' },
      { rel: 'stylesheet', href: '/css/main.css' },
      { rel: 'stylesheet', href: '/font/iconfont.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/element-ui', ssr: true },
    // { src: '~/plugins/jsencrypt', ssr: false },
    { src: '~/plugins/route', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  render:{
    resourceHints:false,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [/^element-ui/],
    vendor: ["element-ui"],
    babel: {
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ],

      ]
    },
    plugins: [

      new CompressionPlugin({

        test: /\.js$|\.css/, // 匹配文件名

        threshold: 1024, // 对超过10kb的数据进行压缩

        deleteOriginalAssets: false // 是否删除原文件

      })

    ],
  },
  axios: {
    proxy: true, // 需要的，不设置请求无法转发
  },
  proxy: [
    // [
    //     '/translateApi',
    //     {
    //         target: 'http://openapi.youdao.com/api',
    //         // target: 'http://192.168.20.114:8080',
    //         changeOrigin: true,
    //         pathRewrite: { '^/translateApi': '/' }
    //     }
    // ],
    // [
    //     '/translate',
    //     {
    //         target: 'http://144.202.13.15:810',
    //         // target: 'http://192.168.20.114:8080',
    //         changeOrigin: true,
    //         // pathRewrite: { '^/translate': '/' }
    //     }
    // ],
    // [
    //     '/translate_a/single',
    //     {
    //         target: 'https://translate.googleapis.com',
    //         // target: 'http://192.168.20.114:8080',
    //         changeOrigin: true,
    //         // pathRewrite: { '^/translate': '/' }
    //     }
    // ],
  ]
}
