<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menu" :key="index" @mouseenter="enter">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="v in item.child" :key="v">
          {{ v }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '', // 当前移动到分类上的类型
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [{
            title: '美食',
            child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
          }]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [{
            title: '外卖',
            child: ['美团外卖']
          }]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [{
            title: '酒店星际',
            child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
          }]
        }
      ]
    }
  },
  computed: {
    // 通过 当前鼠标进入的分类，分类属性存储在 kind 中，对比 kind 找到进入分类的子分类信息
    curdetail() {
      return this.menu.filter((item) => {
        return item.type === this.kind
      })[0]
    }
  },
  methods: {
    // 鼠标移出整个分类的事件：将 kind 置为空，延迟是为了防止子分类移出时直接消失
    mouseleave() {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    // 鼠标进入单个分类的事件：将鼠标进入分类的类型赋值给 kind
    enter(e) {
      this.kind = e.target.querySelector('i').className
    },
    // 鼠标进入子分类的事件：清楚 _timer，防止执行 _timer 导致子分类直接消失
    sover() {
      clearTimeout(this._timer)
    },
    // 鼠标移出子分类的事件：将 kind 置为空
    sout() {
      this.kind = ''
    }
  }
}
</script>

<style scoped>
</style>
