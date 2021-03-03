<template>
	<view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
		<view class="cart-title">
		  <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
		</view>
    <block v-for="(goods, i) in cart" :key="i">
      <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
    </block>
    <button @click="swipeActionClickHandler" class="btn">清空购物车</button>
    <my-settle></my-settle>
	</view>
  <view class="empty-cart" v-else>
     <image src="/static/cart_empty@2x.png" class="empty-img"></image>
     <text class="tip-text">空空如也~</text>
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
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) {
        // console.log(e)
        this.updateGoodsState(e)
      },
      
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler() {
        this.removeGoodsById()
      }
    }
	}
</script>

<style lang="scss">
 .cart-container {
   padding-bottom: 50px;
 }
 .btn {
   width: 120px;
   background-color: #e00000;
   color: white;
   margin-top: 10px;
 }
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

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
