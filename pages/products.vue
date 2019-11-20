<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <categroy :types="types" :areas="areas" />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap v-if="point.length" :width="230" :height="290" :point="point" />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'

export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: []
    }
  },
  // asyncData方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。
  // 在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，你可以利用 asyncData方法来获取数据并返回给当前组件。
  async asyncData(ctx) {
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    // 通过关键词获取搜索结果：景点
    const { status: keywordStatus, data: { count, pois }} = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    // 获取分类：区域和分类
    const { status: categroyStatus, data: { areas, types }} = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    if (keywordStatus === 200 && count > 0 && categroyStatus === 200) {
      return {
        list: pois.filter(item => item.photos.length).map(item => {
          return {
            type: item.type, // 类型
            img: item.photos[0].url, // 图片
            name: item.name, // 名称
            comment: Math.floor(Math.random() * 10000), // 评价人数
            rate: Number(item.biz_ext.rating), // 分数
            price: Number(item.biz_ext.cost), // 价格
            scene: item.tag, // 描述
            tel: item.tel, // 电话
            status: '可订明日',
            location: item.location, // 位置信息：经纬度
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
