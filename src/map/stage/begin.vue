<template>
	<div class="begin_content">
		<!-- 背景图 -->
		<img :src="imgUrl.background" class="background">
		
		<!-- 开始 -->
		<div class="btn" @click="begin()">开始游戏</div>
		
		<!-- 工具栏 -->
		<Tools></Tools>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	export default {
		components: {
			'Tools': Tools,
		},
		data(){
			return{
				imgUrl: {
					background: require('../../assets/img/舞台.png')
				},
			}
		},
		methods:{
			begin:function(){
				this.$router.push('game')
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.begin_content{
		position: relative;
		width: 1920px;
		height: 969px !important;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		.background {
			width: 100%;
			height: 100%;
			pointer-events: none;
			position: absolute;
			z-index: -1;
		}
		
		.btn{
			position: absolute;
			width: 250px;
			height: 80px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 45px;
			font-family: 'xingkai';
			background-color: rgba($color: #e7e3d7, $alpha: 1.0);
			color: rgba($color: #7b5a44, $alpha: 1.0);
			border: 2px solid rgba($color: #7b5a44, $alpha: 1.0);
			cursor: pointer;
			z-index: 1;
		}
	}
</style>
