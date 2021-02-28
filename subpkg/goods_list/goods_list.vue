<template>
	<view>
		<view class="goods-list">
		  <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>		  
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isloading: false
			}
		},
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      console.log(this.queryObj)
      this.getGoodsList()
    },
    methods: {
     async getGoodsList(cb) {
       this.isloading = true
      const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
      this.isloading = false
      cb && cb()
      if(res.meta.status !=200 ) return uni.$showMsg()
      this.goodsList = [...this.goodsList, ...res.message.goods]
      this.total = res.message.total
      },
      
      onReachBottom() {
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
         return uni.showToast({
          title: '数据加载完成！',
          duration: 1500,
          icon: 'none',
        })
        if(this.isloading) return
        this.queryObj.pagenum++
        this.getGoodsList()
      },
      
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    computed: {},
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        // 2. 重新发起请求
        this.getGoodsList(() => uni.stopPullDownRefresh())
    },
	}
</script>

<style lang="scss">

</style>
