<template>
  <div class="m-isselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- 远程搜素：从服务端搜索数据 -->
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      province: [], // 省份 - option
      pvalue: '', // 省份 select 值
      city: [], // 城市 - option
      cvalue: '', // 城市 select 值
      input: '', // 输入搜索城市值
      cities: []
    }
  },
  watch: {
    // 监听 省份 select 值
    pvalue: async function(newPvalue) {
      const self = this
      const { status, data: { city }} = await self.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  mounted: async function() {
    const self = this
    // 请求省份
    const { status, data: { province }} = await self.$axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    // Autocomplete 远程搜素 fetch-suggestions 回调方法
    // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    querySearchAsync: _.debounce(async function(query, cb) {
      const self = this
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        const { status, data: { city }} = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          cb(self.cities.filter(item => {
            item.value.indexOf(query) > -1
          }))
        } else {
          cb([])
        }
      }
    }, 200),
    // Autocomplete select - 点击选中建议项时触发
    handleSelect: function(item) {
      console.log(item.value)
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
