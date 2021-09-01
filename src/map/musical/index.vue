<template>
	<div class="content">
		<!-- 装饰图片 -->
		<div class="decorate">
			<img :src="decorate.background.url" alt="" class="bg decorates">
			<img :src="decorate.curtains.url" alt="" class="curtains decorates">
			<img :src="decorate.desk.url" alt="" class="desk decorates">
			<img :src="decorate.light.url" alt="" class="light1 light decorates">
			<div class="light2 light decorates" @click="getKeepsake()" ref="light">
				<img :src="decorate.light.url" alt="" class="">
			</div>
			<img :src="decorate.light.url" alt="" class="light3 light decorates">
			<img :src="decorate.light.url" alt="" class="light4 light decorates">
		</div>


		<!-- 弹窗 -->
		<div class="bag_content" :class="this.classList" v-show="isShow">
			<img :src="decorate.popup.url" alt="" class="bag_img">
			<div class="left">
				<img :src="decorate.light2.url">
			</div>
			<div class="mid">
				<div class="up">恭喜您获得:</div>
				<div class="down">信物-灯笼</div>
			</div>
			<div class="right">
				<div class="btn" @mousedown="closedown()" @mouseup="closeup()">
					<img :src="decorate.close.url" alt="">
				</div>
			</div>
		</div>


		<!-- 乐器 -->
		<div class="musical">
			<div class="musicals" v-for="(item,index) in musicals" :key="index" :class="item.class"
				@click="description(item.name)">
				<img :src="item.url" alt="">
			</div>
		</div>

		<!-- 工具栏 -->
		<Tools></Tools>

		<!-- 描述 -->
		<!-- drum -->
		<Drum v-show="component.drum" drum="drum" @description_close="description_close"></Drum>

		<!-- flute -->
		<flute v-show="component.flute" flute="flute" @description_close="description_close"></flute>

		<!-- gong -->
		<gong v-show="component.gong" gong="gong" @description_close="description_close"></gong>

		<!-- guzheng -->
		<guzheng v-show="component.guzheng" guzheng="guzheng" @description_close="description_close"></guzheng>

		<!-- erhu -->
		<erhu v-show="component.erhu" erhu="erhu" @description_close="description_close"></erhu>

		<!-- pipa -->
		<pipa v-show="component.pipa" pipa="pipa" @description_close="description_close"></pipa>

		<!-- violin -->
		<violin v-show="component.violin" violin="violin" @description_close="description_close"></violin>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import Drum from './component/drum.vue'
	import flute from './component/flute.vue'
	import gong from './component/gong.vue'
	import guzheng from './component/guzheng.vue'
	import erhu from './component/erhu.vue'
	import pipa from './component/pipa.vue'
	import violin from './component/violin.vue'
	export default {
		components: {
			'Tools': Tools,
			'Drum': Drum,
			'flute': flute,
			'gong': gong,
			'guzheng': guzheng,
			'erhu': erhu,
			'pipa': pipa,
			'violin': violin,
		},
		data() {
			return {
				component: {
					bagShow: false,
					myShow: false,
					listShow: false,
					drum: false,
					flute: false,
					gong: false,
					guzheng: false,
					erhu: false,
					pipa: false,
					violin: false,
				},
				isShow: false,
				classList: {
					appear: true,
					disAppear: false,
				},
				decorate: {
					'background': {
						name: 'backgrund',
						url: require('../../assets/img/1-d.png')
					},
					'curtains': {
						name: 'curtais',
						url: require('../../assets/img/3-z.png')
					},
					'desk': {
						name: 'desk',
						url: require('../../assets/img/9-zhuo.png')
					},
					'light': {
						name: 'light',
						url: require('../../assets/img/light.png')
					},
					'popup': {
						name: 'popup',
						url: require('../../assets/img/底2.jpg')
					},
					'light2': {
						name: 'light2',
						url: require('../../assets/img/light2.png')
					},
					'close': {
						name: 'close',
						url: require('../../assets/icon/close.png')
					}
				},
				musicals: {
					'flute': {
						name: 'flute',
						url: require('../../assets/img/10-dizi.png'),
						class: {
							flute: true
						}
					},
					'gong': {
						name: 'gong',
						url: require('../../assets/img/11-luo.png'),
						class: {
							gong: true
						}
					},
					'drum': {
						name: 'drum',
						url: require('../../assets/img/4-bangu.png'),
						class: {
							drum: true
						}
					},
					'guzheng': {
						name: 'guzheng',
						url: require('../../assets/img/8-yangqin.png'),
						class: {
							guzheng: true
						}
					},
					'erhu': {
						name: 'erhu',
						url: require('../../assets/img/5-erhu.png'),
						class: {
							erhu: true
						}
					},
					'pipa': {
						name: 'pipa',
						url: require('../../assets/img/6-pipa.png'),
						class: {
							pipa: true
						}
					},
					'violin': {
						name: 'violin',
						url: require('../../assets/img/7-xtq.png'),
						class: {
							violin: true
						}
					}
				},

			}
		},
		methods: {
			// 弹窗关闭
			closedown: function() {
				this.decorate.close.url = require('../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.decorate.close.url = require('../../assets/icon/close.png')
				this.classList.appear = false
				this.classList.disAppear = true
				setTimeout(() => {
					this.isShow = false
				}, 200)
			},

			// 点击灯笼
			getKeepsake: function() {
				// 查找该用户是否有此物品
				let account = localStorage.getItem('account')
				let data = this
				data.$refs.light.style = "cursor: auto;"
				// 查找该用户是否有此物品
				this.$http.post('/app/user/', {
					"endata": {
						"action": "myitems",
						"account": account
					}
				}).then((res) => {
					res = res.data
					if (res.endata.items.includes(1)) {
						// 若有则return
						return
					} else {
						data.$http.post('/app/user/', {
							"endata": {
								"action": "newitem",
								"account": account,
								"item_id": 1
							}
						}).then((res) => {
							// 若无则弹窗出现
							if (res.data.endata.su == 1) {
								// 若无则弹窗出现
								data.classList.appear = true;
								data.classList.disAppear = false;
								data.isShow = true
								// 强制刷新背包
								
							}
						})
					}
				})
				
			},

			// 乐器描述
			description: function(name) {
				this.component[name] = true
			},
			description_close: function(name) {
				this.component[name] = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 1920px;
		height: 969px;
		overflow: hidden;
		position: relative;

		// 乐器样式
		.musical {
			position: absolute;

			// width: 1920px;
			// height: 1080px;
			.musicals {
				position: absolute;
				z-index: 5;

				&:hover {
					transform: scale(1.01);
					transition: all .3s;
					cursor: pointer;
				}

				img {
					pointer-events: none;
				}
			}

			.flute {
				top: 665px;
				left: 75px;
			}

			.gong {
				top: 780px;
				left: 160px;
			}

			.drum {
				top: 350px;
				left: 120px;
				z-index: 3;
				width: 253px;
				height: 505px;

				img {
					height: 70%;
				}
			}

			.guzheng {
				top: 250px;
				left: 450px;
				width: 1062px;
				height: 580px;
				z-index: 3;
				border-radius: 100px;

				img {
					width: 90%;
				}
			}

			.erhu {
				width: 207px;
				height: 600px;
				left: 1380px;
				top: 30px;

				img {
					width: 90%;
				}
			}

			.pipa {
				width: 243px;
				height: 560px;
				left: 1550px;
				top: 80px;
				border-radius: 100px;

				img {
					width: 90%;
				}
			}

			.violin {
				width: 312px;
				height: 594px;
				left: 1600px;
				top: 420px;
				border-radius: 100px;
				z-index: 4;

				img {
					width: 90%;
				}
			}

		}

		.bag_content {
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

			.bag_img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}

			.left {
				img {
					pointer-events: none;
				}
			}

			.mid {
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

			.right {
				width: 15%;
				height: 90%;

				.btn {
					cursor: pointer;
					display: flex;
					justify-content: flex-end;

					img {
						pointer-events: none;
					}
				}
			}
		}

		.decorate {
			position: absolute;
			width: 1920px;
			height: 1080px;

			.decorates {
				position: absolute;
				pointer-events: none;
			}

			.bg {
				width: 100%;
				height: 90%;
				z-index: 1;
			}

			.curtains {
				top: 0;
				right: 0;
				z-index: 2;
			}

			.desk {
				left: 0;
				bottom: 111px;
				z-index: 4;
			}

			.light {
				z-index: -1;
				z-index: 1;
			}

			.light1 {
				left: 0;
			}

			.light2 {
				left: 500px;
				cursor: pointer;
				pointer-events: auto;

				img {
					pointer-events: none;
				}
			}

			.light3 {
				left: 1000px;
			}

			.light4 {
				left: 1500px;
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
