import api from '~/plugins/api'
import { getToken, setToken, setExpiresIn, removeToken } from '~/plugins/auth'
const user = {
    state: {
        token: '',
        name: '',
        avatar: '',
        roles: [],
        permissions: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_EXPIRES_IN: (state, time) => {
            state.expires_in = time
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                api.login(userInfo).then(res => {
                    if (res.code == 200) {
                        let data = res
                        setToken(data.token)
                        commit('SET_TOKEN', data.token)
                        resolve()
                    } else {
                        reject()
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (getToken()) {
                    api.getInfo().then(res => {
                        if (res.code == 200) {
                            const user = res.user
                            const avatar = user.avatar == "" ? require("~/static/img/avatar.png") : user.avatar;
                            if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                                commit('SET_ROLES', res.roles)
                                commit('SET_PERMISSIONS', res.permissions)
                            } else {
                                commit('SET_ROLES', ['ROLE_DEFAULT'])
                            }
                            commit('SET_NAME', user.userName)
                            commit('SET_AVATAR', avatar)
                            commit('SET_TOKEN', getToken())
                            resolve(res)
                        } else {
                            resolve(res)
                        }
                    }).catch(error => {
                        reject(error)
                    })
                }
            })
        },

        // 刷新token
        RefreshToken({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.refreshToken(state.token).then(res => {
                    setExpiresIn(res.data)
                    commit('SET_EXPIRES_IN', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.logout(state.token).then((res) => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}
export default user