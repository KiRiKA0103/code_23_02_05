<template>
  <div class="home-container">
    <van-nav-bar title="首页" :fixed="true" left-arrow />
    <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo v-for="item in list" :key="item.id" :title="item.title" :author="item.aut_name" :cmtCount="item.comm_count" :pubDate="item.pubdate" :cover="item.cover"></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

export default {
  name: 'Home',
  components: {
    ArticleInfo
  },
  data() {
    return {
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      list: [],
      // 是否正在加载下一页数据 如果loading为true 则不会反复触发load事件
      loading: true,
      refreshing: true,
      // 所有数据是否加载完毕 如果没有更多数据 把finished改成true
      finished: false
    }
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit)

      if (isRefresh) {
        this.list = [...res, ...this.list]
      } else {
        this.list = [...this.list, ...res]
      }
      this.loading = false
      this.refreshing = false

      // 没有更多数据finished为true
      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      this.page++
      this.initArticleList()
    },
    onRefresh() {
      this.page++
      this.initArticleList(true)
    }
  },
  created() {
    this.initArticleList()
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 40px;
  .van-nav-bar {
    background-color: slateblue;
  }
  /deep/ .van-nav-bar__title {
    color: #ffffff;
  }
}
</style>
