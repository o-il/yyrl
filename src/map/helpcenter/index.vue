<template>
  <div class="content">
      <!-- 背景 -->
		<img :src="imgUrl.background" alt="" class="background">

		<!-- 工具栏 -->
		<Tools></Tools>

		<!-- 书 -->
		<div class="book" ref="bottle" @click="play()">
			<img :src="imgUrl.book" alt="" class="book_img">
		</div>

		<!-- 花瓶 -->
		<div class="bottle" @click="getpopup()" ref="bottle">
			<img :src="imgUrl.bottle" alt="">
		</div>


		<!-- 获得信物 -->
		<div class="getbottle" :class="this.classList" v-show="isShow.popupShow">
			<img :src="imgUrl.popup" alt="" class="bottle_img">
			<div class="img">
				<img :src="imgUrl.bottle2">
			</div>
			<div class="text">
				<div class="up">恭喜您获得:</div>
				<div class="down">信物-花瓶</div>
			</div>
			<div class="icon">
				<div class="btn" @mousedown="closedown()" @mouseup="closeup()">
					<img :src="imgUrl.close1" alt="" ref="btn">
				</div>
			</div>
		</div>

        <!-- <Help v-show="isShow.helpShow" @display="display"></Help> -->
        <Help v-show="isShow.helpShow" @display="display"></Help>
      
  </div>
</template>

<script>
    import Tools from '../component/tools.vue'
    import Help from './component/help.vue'
    export default {
        components: {
			'Tools': Tools,
            'Help':Help,
		},
        data() {
			return {
				imgUrl: {
					background: require('../../assets/img/helpbg.png'),
                    book: require('../../assets/img/book.png'),
					bottle: require('../../assets/img/bottle.png'),
                    bottle2: require('../../assets/img/xw-hp.png'),
                    popup: require('../../assets/img/底2.jpg'),
					//background2: require('../../assets/img/bg2.png'),
					close1: require('../../assets/icon/close.png'),
					close2: require('../../assets/icon/close-press.png'),
					//icon3: require('../../assets/icon/left.png'),
					//icon4: require('../../assets/icon/left-press.png'),
				},
				isShow: {
					popupShow: false,
                    helpShow: false,
				},
				classList: {
					appear: true,
					disAppear: false
				},
				isPlay: false,
				isHide: true,
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
				// data.$refs.left.style = "cursor: auto;"
				// 查找该用户是否有此物品
				this.$http.post('/app/user/', {
					"endata": {
						"action": "myitems",
						"account": account
					}
				}).then((res) => {
					res = res.data
					if (res.endata.items.includes(3)) {
						return
					} else {
						data.$http.post('/app/user/', {
							"endata": {
								"action": "newitem",
								"account": account,
								"item_id": 3
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
				this.isShow.helpShow = true
			},
			display: function() {
				this.isShow.helpShow = false
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

		.book {
			position: absolute;
			top: 738px;
			left: 1326px;
			cursor: pointer;

			img {
				pointer-events: none;
			}
		}

		.bottle {
			position: absolute;
			cursor: pointer;
			top: 497px;
			left: 925px;

			img {
				pointer-events: none;
			}
		}



		// 信物
		.getbottle {
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

			.bottle_img {
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
