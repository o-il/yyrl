<template>
	<div class="content">
		<img :src="bgUrl" alt="" class="content_bg">
		<div class="title animation" ref="title">越音绕梁</div>
		<div class="fan" ref="fan" :class="fan_animate">
			<img src="../assets/img/fan.png">
			<div class="left" @click="begin()" @mouseover="hover1()" @mouseleave="leave()"  :style="active1">开始</div>
			<div class="right" @click="help()" @mouseover="hover2()" @mouseleave="leave()" :style="active2">帮助</div>
		</div>
		<div class="help" :class="help_animate" ref="help">
			<div class="help_title">使用帮助
				<div class="help_btn" @mouseover="iconHover()" @mouseleave="iconLeave()" @click="goBack()">
					<img :src="iconUrl" alt="">
				</div>
			</div>
			<div class="help_text">欢迎使用《越音绕梁》交互课件，在这里我们能够初步地了解与学习部分越剧知识，帮助大家打开越剧的兴趣大门，希望大家都能在这里有所收获！</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active1:'color: black;',
				active2:'color: black;',
				isShow:false,
				bgUrl: require('../assets/img/bg.jpg'),
				iconUrl:require('../assets/icon/left.png'),
				fan_animate:{
					animation3:true,
					animation4:false,
				},
				help_animate:{
					animation5:false,
					animation6:false,
				},
				user: {
					account: '',
					password: ''
				},
			}
		},
		mounted() {
		},
		created(){
		},
		
		methods:{
			
			// begin 入场动画
			begin:function(){
				
				// 扇子出场
				this.fan_animate.animation3 = false;
				this.fan_animate.animation4 = true;
				// 跳转到登录页面
				setTimeout(()=>{
					this.$router.push('/login')
				},500)
			},
			
			// help 入场动画
			help:function(){
				
				// 扇子出场
				this.fan_animate.animation3 = false;
				this.fan_animate.animation4 = true;
				
				// help入场
				this.$refs.help.style="display:block"
				this.help_animate.animation5 = true;
				this.help_animate.animation6 = false;
			
				setTimeout(()=>{
					this.$refs.fan.style="display:none"
				},1000)
			},
			
			hover1:function(){
				this.active1='color: #5c544d'
			},
			hover2:function(){
				this.active2='color: #5c544d'
			},
			leave:function(){
				this.active1='color:black;'
				this.active2='color:black;'
			},
			iconHover:function(){
				this.iconUrl=require('../assets/icon/left-press.png');
			},
			iconLeave:function(){
				this.iconUrl=require('../assets/icon/left.png');
			},
			
			// 从help返回主页面
			goBack:function(){
				this.$refs.fan.style="display:flex"
				this.help_animate.animation5 = false;
				this.help_animate.animation6 = true;
				this.fan_animate.animation3 = true;
				this.fan_animate.animation4 = false;
				setTimeout(()=>{
					this.$refs.help.style="display:none"
				},1000)
			},
			
			gotoRegist:function(){
				this.container_animate.animation7 = true;
				setTimeout(()=>{
					this.$router.push('/regist')
				},500)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 1920px;
		height: 1080px;
		position: relative;
		.content_bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -10;
		}
		img{
			z-index: -10;
		}
		.help{
			display:none;
			position: absolute;
			width: 1200px;
			height: 700px;
			background: url(../assets/img/bg2.png);
			background-size: cover;
			opacity: 0;
			top: 50%;
			left: 50%;
			z-index: 1;
			transform: translate(-50%,-50%);
			animation-fill-mode:forwards;
			color: rgba($color: #786a59, $alpha: 1.0);
			.help_title{
				font-size: 65px;
				font-family: 'xingkai';
				margin-top: 155px;
				margin-left: 155px;
				display: flex;
				width: 80%;
				justify-content: space-between;
				align-items: center;
				.help_btn{
					width: 70px;
					height: 70px;
					cursor: pointer;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					img{
						position: absolute;
						width: 100%;
						height: 100%;
					}
				}
				
			}
			.help_text{
				font-size: 32px;
				font-family: 'xingkai';
				margin-top: 100px;
				margin-left: 155px;
				width: 80%;
				text-indent:80px;
				line-height: 45px;
			}
		}	
		.title {
			position: absolute;
			width: 145px;
			height: 600px;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 50px;
			font-family: 'xingkai';
			color: rgba($color: #786a59, $alpha: 1.0);
			writing-mode: vertical-lr;
			left: 950px;
			font-size: 120px;
			letter-spacing: 15px;
			border: 2px solid rgba($color: #786a59, $alpha: 1.0);
			z-index: -1;
		}
		.title::after {
			content: '';
			display: inline-block;
			position: absolute;
			top: 40px;
			left: 40px;
			width: 145px;
			height: 600px;
			background-color: rgba($color: #fff, $alpha: .7);
			z-index: -9;
		}
		.fan{
			width: 585px;
			height: 979px;
			position: absolute;
			writing-mode: vertical-lr;
			right: 50px;
			animation-fill-mode:forwards;
			font-size: 75px;
			font-family: 'xingkai';
			display: flex;
			align-items: center;
			flex-direction: column;
			z-index: 1;
			img{
				width: 100%;
				position: absolute;
			}
			.left{
				margin-left: 65px;
				margin-top: 150px;
				cursor: pointer;
			}
			.right{
				margin-top: -150px;
				margin-left: 15px;
				cursor: pointer;
			}
		}
	}
	
	.animation {
		animation: move1 .5s linear;
	}
	.animation3 {
		animation: move3 1s ease;
	}
	.animation4 {
		animation: move4 1s ease;
	}
	.animation5 {
		animation: move5 1s ease;
	}
	.animation6 {
		animation: move6 1s ease;
	}
	@keyframes move1 {
		0% {
			opacity: 0.2;
			transform: translateX(-50px);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	@keyframes move3 {
		0% {
			opacity: 0.2;
			transform: translateX(150px);
		}
		
		100%{
			opacity: 1;
			transform: translateX(0px);
		}
		
	}
	@keyframes move4{
		0% {
			opacity: 1;
			transform: translateX(0px);
		}
		
		100%{
			opacity: 0;
			transform: translateX(550px);
		}
	}
	
	@keyframes move5{
		0% {
			opacity: 0;
		}
		
		100%{
			opacity: 1;
		}
	}
	
	@keyframes move6{
		0% {
			opacity: 1;
		}
		
		100%{
			opacity: 0;
		}
	}
</style>
