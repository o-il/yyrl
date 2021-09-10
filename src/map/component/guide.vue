<template>
	<div class="guide_content" :class="this.classList">
		<!-- 背景图片 -->
		<img :src="imgUrl.background" alt="" class="guide_img">
		
		<!-- 介绍图片 -->
		<img :src="imgUrl.pages[index]" alt="" class="introduce">
		
		<!-- 退出按钮 -->
		<div class="close" @mousedown="closedown()" @mouseup="closeup()">
			<img :src="imgUrl.icon" alt="" ref="close">
		</div>
		
		<!-- 上一页 -->
		<div class="previous" @mousedown="pagedown(0)" @mouseup="pageup(0)">
			<img :src="imgUrl.previous" alt="" ref="previous">
		</div>
		
		<!-- 下一页 -->
		<div class="next" @mousedown="pagedown(1)" @mouseup="pageup(1)">
			<img :src="imgUrl.next" alt="" ref="next">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['guideShow'],
		data() {
			return {
				classList: {
					comeAppear: true,
					disappear: false
				},
				imgUrl:{
					background:require('../../assets/img/d.png'),
					pages:[
						require('../../assets/img/d1.png'),
						require('../../assets/img/d2.png'),
						require('../../assets/img/d3.png'),
						require('../../assets/img/d4.png')
					],
					icon: require('../../assets/icon/close.png'),
					icon_press: require('../../assets/icon/close-press.png'),
					next: require('../../assets/icon/right.png'),
					next_press: require('../../assets/icon/right-press.png'),
					previous: require('../../assets/icon/left.png'),
					previous_press: require('../../assets/icon/left-press.png'),
				},
				index:1,
			}
		},
		methods: {
			
			closedown: function() {
				this.$refs.close.src = this.imgUrl.icon_press
			},
			closeup: function() {
				this.$refs.close.src = this.imgUrl.icon
				this.classList.comeAppear = false
				this.classList.disappear = true
				setTimeout(() => {
					// 关闭组件
					this.$emit('closeComponent', this.guideShow)
					this.classList.comeAppear = true
					this.classList.disappear = false
				}, 400)
			},
			
			pagedown: function(index) {
				if(index){
					// 下一页
					this.$refs.next.src = this.imgUrl.next_press
				}else{
					// 上一页
					this.$refs.previous.src = this.imgUrl.previous_press
				}
			},
			pageup: function(index) {
				if(index){
					// 下一页
					this.$refs.next.src = this.imgUrl.next
					this.index = (this.index+1)%4
				}else{
					// 上一页
					this.$refs.previous.src = this.imgUrl.previous
					this.index = (this.index+3)%4
				}
			},
		},
		mounted(){
			let account = localStorage.getItem('account')
			let data = this
		}
	}
</script>

<style lang="scss" scoped>
	.guide_content {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba($color: #000000, $alpha: .5);
		
		.guide_img {
			position: absolute;
			width: 854px;
			height: 482px;
			z-index: -1;
			pointer-events: none;
		}
		
		.introduce{
			position: absolute;
			max-width: 80%;
			z-index: -1;
		}
		
		.close {
			position: absolute;
			right: 305px;
			top: 155px;
			cursor: pointer;

			img {
				pointer-events: none;
			}
		}
		
		.previous {
			position: absolute;
			left: 325px;
			bottom: 145px;
			cursor: pointer;
			z-index: 1;
			img {
				pointer-events: none;
			}
		}
		
		.next{
			position: absolute;
			right: 325px;
			bottom: 145px;
			cursor: pointer;
			
			img {
				pointer-events: none;
			}
		}
	}

	// 过渡动画
	.comeAppear {
		animation: appear .5s ease;
	}

	.disappear {
		animation: disappear .5s ease;
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
