// import Vue from 'vue'
// import Vuex from 'vuex'
// import geo from './modules/geo'
// Vue.use(Vuex)
// const store = () => new Vuex.Store({
//   modules: {
//     geo
//   },
//   actions: {
//     async nuxtServerInit({
//       commit
//     }, { req, app }) {
//       const {
//         status,
//         data: {
//           province,
//           city
//         }
//       } = await app.$axios.get('/geo/getPosition')
//       commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
//     }
//   }
// })
// export default store

export const actions = {
  async nuxtServerInit({
    commit
  }, { req, app }) {
    // 获取定位城市
    const {
      status,
      data: { province, city }
    } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })

    // 获取首页全部分类
    const {
      status: menuStatus,
      data: { menu }
    } = await app.$axios.get('/geo/menu')
    commit('home/setMenu', menuStatus === 200 ? menu : [])

    // 获取热门城市
    const {
      status: hotPlaceStatus,
      data: { result }
    } = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('home/setHotPlace', hotPlaceStatus === 200 ? result : [])
  }
}
