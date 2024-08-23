import {
  get,
  post
} from '@/plugins/axios'
const admin = "";
let ServerDomain;
if (process.env.NODE_ENV === 'production') {
  ServerDomain = "http://117.72.77.209"
} else {
  ServerDomain = "http://127.0.0.1"
}
const http = ServerDomain+":1005"
const alapi = "https://v2.alapi.cn/api"
// const http = "http://127.0.0.1:810"
export default {
  ServerDomain: ServerDomain,
  login: data => post(http+admin + '/login', data),
  getCodeImg: data => get(http+admin + '/captchaImage', data),
  getInfo: data => get(http+admin + '/getInfo', data),
  getTiktok: data => post(http+admin + '/system/tiktok', data),
  getChatGpt: data => post(http+admin + '/system/chatGpt', data),
  getPipixia: data => post(http+admin + '/system/pipixia', data),
  getQrCode: data => post(http+admin + '/system/QrCode', data),
  logout: data => post(http+admin + '/logout', data),
  register: data => post(http+admin + '/register', data),
  RefreshToken: data => post(http+admin + '/refresh', data),
  sendEmailCode: data => post(http+admin + '/sendEmailCode', data),
  getJoke: data => post(alapi+admin + '/joke', {token:"6ANYpr3duQPq0T2H",page:1,num:10}),
  getJokeRandom: data => post(alapi+admin + '/joke/random', {token:"6ANYpr3duQPq0T2H"}),
  getQinghua : data => post(alapi+admin + '/qinghua ', {token:"6ANYpr3duQPq0T2H"}),
  getDog : data => post(alapi+admin + '/dog ', {token:"6ANYpr3duQPq0T2H"}),
}
