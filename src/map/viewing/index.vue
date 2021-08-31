<template>
	<div class="content">
		<img :src="imgUrl.background" alt="" class="background">
		<div class="watch" @click="watch()">观&nbsp;&nbsp;看</div>

		<!-- 工具栏 -->
		<Tools></Tools>

		<div class="video" v-show="isShow" :class="classList">
			<img :src="imgUrl.background2" alt="" class="img">

			<div class="icon" @mousedown="close_down()" @mouseup="close_up()" v-show="isHide">
				<img :src="imgUrl.icon1" alt="" ref="close">
			</div>

			<!-- 播放目录 -->
			<div class="videoList_warp" v-show="isHide">
				<div class="videoList" v-for="(item,index) in videoList" :key='index' @click="play(index)">
					<img :src="item.icon1" alt="">
					<div class="title">{{item.name}}</div>
				</div>
			</div>

			<!-- 播放 -->
			<Vedio v-show="isPlay" ref="video" :name="playing" :state="isPlay" @back_up="back_up()"></Vedio>
		</div>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import Vedio from './component/vedio.vue'
	export default {
		components: {
			'Tools': Tools,
			'Vedio': Vedio,
		},
		data() {
			return {
				imgUrl: {
					background: require('../../assets/img/gyt.png'),
					background2: require('../../assets/img/bg2.png'),
					icon1: require('../../assets/icon/close.png'),
					icon2: require('../../assets/icon/close-press.png'),
					icon3: require('../../assets/icon/left.png'),
					icon4: require('../../assets/icon/left-press.png'),
				},
				isShow: false,
				isPlay: false,
				isHide: true,
				playing: '',
				videoList: [{
						name: '碧玉簪',
						icon1: require('../../assets/icon/vedio.png'),
						icon2: require('../../assets/icon/vedio-press.png')
					},
					{
						name: '追云-观灯',
						icon1: require('../../assets/icon/vedio.png'),
						icon2: require('../../assets/icon/vedio-press.png')
					},
					{
						name: '梁祝',
						icon1: require('../../assets/icon/vedio.png'),
						icon2: require('../../assets/icon/vedio-press.png')
					},
					{
						name: '王老虎抢亲',
						icon1: require('../../assets/icon/vedio.png'),
						icon2: require('../../assets/icon/vedio-press.png')
					}
				],
				classList: {
					come_in: true,
					come_out: false
				},

			}
		},
		methods: {
			watch: function() {
				this.classList.come_out = false
				this.classList.come_in = true
				this.isShow = true
			},
			

			// 关闭窗口
			close_down: function() {
				this.$refs.close.src = this.imgUrl.icon2
			},
			close_up: function() {
				this.$refs.close.src = this.imgUrl.icon1
				this.classList.come_out = true
				this.classList.come_in = false
				setTimeout(() => {
					this.isShow = false
				}, 400)
			},

			//返回列表
			// back_down: function() {
			// 	this.$refs.back.src = this.imgUrl.icon4
			// },
			back_up: function() {
				// this.$refs.back.src = this.imgUrl.icon3
				this.isHide = true
				this.isPlay = false
			},

			// 播放视频
			play: function(index) {
				this.playing = this.videoList[index].name
				this.isPlay = true
				this.isHide = false
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

		.video {
			position: absolute;
			width: 1440px;
			height: 810px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.icon {
				position: absolute;
				right: 125px;
				top: 85px;
				cursor: pointer;
			
				img {
					pointer-events: none;
				}
			}
			
			.img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}

			.videoList_warp {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				align-items: center;
				width: 80%;
				height: 50%;

				// background-color: red;
				.videoList {
					display: flex;
					height: 33%;
					width: 23%;
					font-size: 35px;
					font-family: 'xingkai';
					color: rgba($color: #7b5a44, $alpha: 1.0);
					line-height: 70px;
					cursor: pointer;

					img {
						width: 70px;
						height: 70px;
						margin-right: 15px;
					}
				}
			}

			
		}

		.watch {
			width: 250px;
			height: 80px;
			position: absolute;
			background-color: rgba($color: #e7e3d7, $alpha: 1.0);
			border: 5px solid rgba($color: #7b5a44, $alpha: 1.0);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 50px;
			font-family: 'xingkai';
			color: rgba($color: #7b5a44, $alpha: 1.0);
			cursor: pointer;
			z-index: 1;
			transition: all .3s;
			justify-content: center;
			align-items: center;

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.come_in {
		animation: appear .5s ease;
	}

	.come_out {
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
