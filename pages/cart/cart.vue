<template>
	<view>
    <my-address></my-address>
		<view class="cart-title">
		  <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
		</view>
    <block v-for="(goods, i) in cart" :key="i">
      <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
    </block>
	</view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
	export default {
    mixins: [badgeMix],
		data() {
			return {
				
			}
		},
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount']),
      radioChangeHandler(e) {
        // console.log(e)
        this.updateGoodsState(e)
      },
      
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      }
    }
	}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  
  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
