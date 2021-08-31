<template>
	<div class="museum_content">
		<!-- 背景图 -->
		<img :src="imgUrl.background[this.index].url" alt="" class="background" ref="background">
		
		<!-- 左图标 -->
		<div class="left" @click="goleft()">
			<img :src="imgUrl.icon1" alt="">
		</div>
		
		<!-- 右图标 -->
		<div class="right left" @click="goright()">
			<img :src="imgUrl.icon2" alt="">
		</div>
		
		<!-- btn -->
		<div class="btn" @click="show()">{{title[this.index]}}</div>
		
		<!-- History -->
		<History v-show="component.historyShow" @close="close"></History>
		
		<!-- Makeup -->
		<Makeup v-show="component.makeupShow" @close="close"></Makeup>
		
		<!-- Clothes -->
		<Clothes v-show="component.clothesShow" @close="close"></Clothes>
		
		<!-- 工具栏 -->
		<Tools></Tools>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import History from './component/history.vue'
	import Makeup from './component/makeup.vue'
	import Clothes  from './component/clothes .vue'
	export default {
		components:{
			Tools,
			Clothes,
			Makeup,
			History
		},
		data(){
			return{
				imgUrl:{
					background:[
						{
							url:require('../../assets/img/bwg-fs.png'),
						},
						{
							url:require('../../assets/img/bwg-ls.png'),
						},
						{
							url:require('../../assets/img/bwg-zr.png'),
						}
					],
					icon1:require('../../assets/icon/b.png'),
					icon2:require('../../assets/icon/n.png'),
				},
				index:1,
				component: {
					historyShow: false,
					makeupShow:false,
					clothesShow:false,
				},
				descriptList:['clothesShow','historyShow','makeupShow'],
				title:['服饰','历史','妆容']
			}
		},
		methods:{
			goleft(){
				this.index = (this.index+2)%3
			},
			goright(){
				this.index = (this.index+1)%3
			},
			show(){
				this.component[this.descriptList[this.index]] = true
			},
			close(){
				this.component[this.descriptList[this.index]] = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.museum_content{
		width: 1920px;
		height: 969px;
		overflow: hidden;
		position: relative;
		.background{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}
		.left{
			position: absolute;
			width: 110px;
			height: 110px;
			top: 50%;
			transform: translateY(-50%);
			background-color: rgba($color: #e2dace, $alpha: .6);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			img{
				width: 70%;
				pointer-events: none;
				transform: translateX(-5px);
			}
		}
		.right{
			right: 0;
			img{
				transform: translateX(5px);
			}
		}
		.btn{
			position: absolute;
			width: 250px;
			height: 80px;
			background-color: rgba($color: #e2dace, $alpha: 1);
			top: 50%;
			transform: translate(-50%,-50%);
			left: 50%;
			font-size: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: 'xingkai';
			color: rgba($color: #7b5a44, $alpha: 1);
			border: 2px solid rgba($color: #7b5a44, $alpha: 1);;
			cursor: pointer;
		}
	}
</style>
