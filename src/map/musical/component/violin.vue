<template>
	<div class="droum_content" :class="classList">
		<img :src="img.background" alt="" class="background">	
		<img :src="img.page1" alt="" class="img" ref="page">	
		<div class="icon" @mousedown="closedown" @mouseup="closeup">
			<img :src="img.iconUrl" alt="">
		</div>
<!-- 		<div class="next" @mousedown="toNext_down" @mouseup="toNext_up" v-show="iconShow.next">
			<img :src="img.next" alt="">
		</div>
		<div class="back" @mousedown="toBack_down" @mouseup="toBack_up" v-show="iconShow.back">
			<img :src="img.back" alt="">
		</div> -->
	</div>
</template>

<script>
	export default {
		props: ['violin'],
		data(){
			return{
				img:{
					background:require('../../../assets/img/bg2.png'),
					page1:require('../../../assets/img/小提琴.png'),
					// page2:require('../../../assets/img/-板鼓2.png'),
					iconUrl:require('../../../assets/icon/close.png'),
					// next:require('../../../assets/icon/right.png'),
					// back:require('../../../assets/icon/left.png'),
				},
				classList:{
					action_in:true,
					action_out:false,
				},
				// iconShow:{
				// 	next:true,
				// 	back:false,
				// }
			}
		},
		methods:{
			closedown: function() {
				this.img.iconUrl = require('../../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.img.iconUrl = require('../../../assets/icon/close.png')
				this.classList.action_in = false,
				this.classList.action_out = true
				setTimeout(() => {
					// 关闭组件
					this.$emit('description_close', this.violin)
					this.classList.action_in = true
					this.classList.action_out = false
				}, 250)
			},
			// toNext_down:function(){
			// 	this.img.next = require('../../../assets/icon/right-press.png')
			// },
			// toNext_up:function(){
			// 	this.img.next = require('../../../assets/icon/right.png')
			// 	this.$refs.page.src = this.img.page2
			// 	this.iconShow.next=false
			// 	this.iconShow.back=true
			// },
			// toBack_down:function(){
			// 	this.img.back = require('../../../assets/icon/left-press.png')
			// },
			// toBack_up:function(){
			// 	this.img.back = require('../../../assets/icon/left.png')
			// 	this.$refs.page.src = this.img.page1
			// 	this.iconShow.back=false
			// 	this.iconShow.next=true
			// }
			
		}
	}
</script>

<style lang="scss" scoped>
	.droum_content{
		position: fixed;
		width: 1440px;
		height: 810px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		display: flex;
		align-items: center;
		justify-content: center;
		.background{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}
		.img{
			position: absolute;
			width: 70%;
			height: 70%;
			pointer-events: none;
		}
		.icon{
			position: absolute;
			top: 100px;
			right: 100px;
			cursor: pointer;
			img{
				pointer-events: none;
			}
		}
		.next{
			position: absolute;
			top: 560px;
			left: 840px;
			cursor: pointer;
			img{
				pointer-events: none;
				width: 70%;
			}
		}
		.back{
			position: absolute;
			top: 560px;
			left: 330px;
			cursor: pointer;
			img{
				pointer-events: none;
				width: 70%;
			}
		}
	}
	
	
	// 动画效果
	.action_in{
		animation: appear .3s ease;
	}
	.action_out{
		animation: disappear .3s ease;
	}
	@keyframes appear {
		0% {
			opacity: 0;
		}
	
		100% {
			opacity: 1;
		}
	}
	
	@keyframes disappear {
		0% {
			opacity: 1;
		}
	
		100% {
			opacity: 0;
		}
	}
</style>
