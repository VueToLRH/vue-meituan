<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <!-- 热门搜索 -->
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in $store.state.home.hotPlace.slice(0, 5)" :key="index">
              <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <!-- 搜索列表 -->
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, index) in searchList" :key="index">
              <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            v-for="(item, index) in $store.state.home.hotPlace.slice(0,5)"
            :key="index"
            :href="'/products?keyword=' + encodeURIComponent(item.name)"
          >{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" /><p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" /><p class="txt">
              不满意退单
            </p>
          </li>
          <li>
            <i class="overdue" /><p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      search: '', // 搜素内容
      isFocus: false, // 用于判断是否聚焦
      hotPlace: [], // 热门搜索数据,
      searchList: [] // 搜索数据
    }
  },
  computed: {
    // 是否显示热门搜索：当搜索框获取焦点并且没有输入内容的时候
    isHotPlace() {
      return this.isFocus && !this.search
    },
    // 是否显示搜索列表：当搜索框获取焦点并且有输入内容的时候
    isSearchList() {
      return this.isFocus && this.search
    }
  },
  methods: {
    // 输入框获取焦点事件
    focus() {
      this.isFocus = true
    },
    // 输入框失去焦点事件
    // 延迟 200 毫秒原因：使得热门搜索或者搜索列表延迟消失，以便用户可以点击热门搜索或者搜索列表的选项
    blur() {
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    // 输入框输入事件
    input: _.debounce(async function() {
      const self = this
      const city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = []
      const { data: { top }} = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      // if (status === 200) {
      self.searchList = top.slice(0, 10)
      // }
    }, 300)
  }
}
</script>

<style></style>
