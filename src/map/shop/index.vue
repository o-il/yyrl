<template>
	<div class="content">
		<!-- 背景图 -->
		<img :src="imgUrl.background" alt="" class="background">
		
		<!-- 打开商城 -->
		<div class="btn" @click="showShop()">打开商城</div>
		
		<!-- 工具栏 -->
		<Tools :key='ToolKey'></Tools>
		
		<!-- 商城 -->
		<Shop v-show="isShow.shopShow" @closeShop="closeShop" :key='componentKey' @forceRerender="forceRerender()"></Shop>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import Shop from './component/shop.vue'
	export default {
		components: {
			Tools,
			Shop,
		},
		data(){
			return{
				componentKey:1,
				ToolKey:0,
				imgUrl:{
					background:require('../../assets/img/0.png')
				},
				isShow:{
					shopShow:false,
				}
			}
		},
		methods:{
			showShop(){
				this.isShow.shopShow = true
			},
			closeShop(){
				this.isShow.shopShow = false
			},
			// 强制刷新组件
			forceRerender() {
			    this.componentKey ++; 
				this.ToolKey ++;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		position: relative;
		width: 1920px;
		height: 969px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		.background{
			position: absolute;
			width: 100%;
			z-index: -1;
			pointer-events: none;
		}
		.btn{
			position: absolute;
			width: 350px;
			height: 120px;
			background-color: rgba($color: #e7e3d7, $alpha: 1.0);
			color: rgba($color: #7b5a44, $alpha: 1.0);
			border: 2px solid rgba($color: #7b5a44, $alpha: 1.0);
			border-radius: 20px;
			font-size: 70px;
			font-family: 'xingkai';
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			z-index: 1;
		}
		
	}
</style>