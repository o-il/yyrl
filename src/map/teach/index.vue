<template>
	<div class="content">
		<!-- 背景 -->
		<img :src="imgUrl.background" alt="" class="background">

		<!-- 工具栏 -->
		<Tools></Tools>

		<!-- 讲台 -->
		<div class="platform" ref="platform" @click="play()">
			<img :src="imgUrl.platform" alt="" class="platform_img">
		</div>

		<!-- 左垫子 -->
		<div class="left" @click="getpopup()" ref="left">
			<img :src="imgUrl.left" alt="">
		</div>

		<!-- 右垫子 -->
		<div class="right">
			<img :src="imgUrl.right" alt="">
		</div>

		<!-- 获得信物 -->
		<div class="fan" :class="this.classList" v-show="isShow.popupShow">
			<img :src="imgUrl.popup" alt="" class="fan_img">
			<div class="img">
				<img :src="imgUrl.fan">
			</div>
			<div class="text">
				<div class="up">恭喜您获得:</div>
				<div class="down">信物-扇子</div>
			</div>
			<div class="icon">
				<div class="btn" @mousedown="closedown()" @mouseup="closeup()">
					<img :src="imgUrl.close1" alt="" ref="btn">
				</div>
			</div>
		</div>

		<Video v-show="isShow.videoShow" @display="display"></Video>

	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import Video from './component/video.vue'
	export default {
		components: {
			'Tools': Tools,
			'Video': Video,
		},
		data() {
			return {
				isShow: {
					popupShow: false,
					videoShow: false,
				},
				classList: {
					appear: true,
					disAppear: false
				},
				imgUrl: {
					background: require('../../assets/img/background.png'),
					platform: require('../../assets/img/platform.png'),
					left: require('../../assets/img/seatleft.png'),
					right: require('../../assets/img/seatright.png'),
					popup: require('../../assets/img/底2.jpg'),
					fan: require('../../assets/img/xw-sz.png'),
					close1: require('../../assets/icon/close.png'),
					close2: require('../../assets/icon/close-press.png'),
				}
			}
		},
		methods: {
			closedown: function() {
				this.$refs.btn.src = this.imgUrl.close2
			},
			closeup: function() {
				this.$refs.btn.src = this.imgUrl.close1
				this.classList.appear = false
				this.classList.disAppear = true
				setTimeout(() => {
					this.isShow.popupShow = false
				}, 200)
			},
			// 获取信物
			getpopup: function() {
				let account = localStorage.getItem('account')
				let data = this
				data.$refs.left.style = "cursor: auto;"
				// 查找该用户是否有此物品
				this.$http.post('/app/user/', {
					"endata": {
						"action": "myitems",
						"account": account
					}
				}).then((res) => {
					res = res.data
					if (res.endata.items.includes(2)) {
						return
					} else {
						data.$http.post('/app/user/', {
							"endata": {
								"action": "newitem",
								"account": account,
								"item_id": 2
							}
						}).then((res) => {
							// 若无则弹窗出现
							if(res.data.endata.su == 1){
								data.classList.appear = true;
								data.classList.disAppear = false;
								data.isShow.popupShow = true
							}
						})
					}
				})
				
			},
			play: function() {
				this.isShow.videoShow = true
			},
			display: function() {
				this.isShow.videoShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		width: 1920px;
		height: 969px;
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

		.platform {
			position: absolute;
			top: 500px;
			left: 775px;
			cursor: pointer;

			img {
				pointer-events: none;
			}
		}

		.left {
			position: absolute;
			cursor: pointer;
			top: 730px;
			left: 500px;

			img {
				pointer-events: none;
			}
		}

		.right {
			position: absolute;
			cursor: pointer;
			top: 730px;
			left: 1100px;

			img {
				pointer-events: none;
			}
		}

		// 信物
		.fan {
			position: fixed;
			width: 854px;
			height: 482px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 11;
			display: flex;
			align-items: center;
			justify-content: center;

			.fan_img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}

			.img {
				img {
					pointer-events: none;
				}
			}

			.text {
				width: 50%;
				height: 30%;
				font-family: 'xingkai';
				font-size: 40px;
				color: rgba($color: #786850, $alpha: 1.0);
				position: relative;

				.up {
					position: absolute;
					left: 20px;
				}

				.down {
					position: absolute;
					bottom: 0;
					right: 80px;
				}
			}

			.icon {
				width: 15%;
				height: 90%;

				.btn {
					cursor: pointer;
					display: flex;

					img {
						pointer-events: none;
					}
				}
			}
		}
	}


	// 过渡动画
	.appear {
		animation: appear .2s ease;
	}

	.disAppear {
		animation: disappear .25s ease;
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
