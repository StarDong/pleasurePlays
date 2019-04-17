import Vue from 'vue'
import Router from 'vue-router'
import user from './user.js'

Vue.use(Router)

let routes = []
routes = routes.concat(user)

for (let i = 0, j = routes.length; i < j; i++) {
    routes[i].name += '.v1'
}

export default new Router({
    mode: 'history',
    base: 'activity',
    routes: routes
})