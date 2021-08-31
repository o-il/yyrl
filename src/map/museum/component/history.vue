<template>
	<div class="content" :class="classList">
		<div class="history">
			<img :src="img.background" alt="" class="background">
		
			<div class="description">
				<div class="img">
					<div class="title">{{this.index == 0?'':title}}</div>
					<img :src="this.page[this.index].url" alt="">
					<div class="subtitle">{{page[this.index].subtitle}}</div>
				</div>
				<div class="text">{{page[this.index].text}}</div>
			</div>
		
		
			<div class="icon" @mousedown="closedown" @mouseup="closeup">
				<img :src="img.iconUrl" alt="">
			</div>
		
			<div class="next" @mousedown="toNext_down" @mouseup="toNext_up" v-show="this.index!=this.page.length-1">
				<img :src="img.next" alt="">
			</div>
		
			<div class="back" @mousedown="toBack_down" @mouseup="toBack_up" v-show="this.index!=0">
				<img :src="img.back" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				img: {
					background: require('../../../assets/img/bg2.png'),
					iconUrl: require('../../../assets/icon/close.png'),
					next: require('../../../assets/icon/right.png'),
					back: require('../../../assets/icon/left.png'),
				},

				title: '历史沿革',
				page: [
					{
						url: require('../../../assets/img/museum/05.png'),
						text: '越剧——中国第二大剧种，有第二国剧之称，又被称为是“流传最广的地方剧种”，有观点认为是“最大的地方戏曲剧种”，在国外被称为“中国歌剧”，亦为中国五大戏曲（依次列为京剧、越剧、黄梅戏、评剧、豫剧）之一。',
					},
					{
						url: require('../../../assets/img/museum/06.png'),
						text: `1852年（清咸丰二年）
嵊州西乡马塘村
农民金其柄创“落地唱书”`,
						subtitle: '孕育时期——落地唱书'
					},
					{
						url: require('../../../assets/img/museum/04.jpg'),
						text: '1906年3月27日，嵊县东王村香火堂前，由落地唱书艺人袁福生、李茂正、高炳火、李世泉借用四只稻桶垫底。铺上门板，演出小戏《十件头》、《倪凤煽茶》和大戏《双金花》（后半本）。这是中国越剧第一次登台试演，越剧（最初称“小歌班”）从此诞生，该日被称为越剧诞生日。',
						subtitle: '小歌班'
					},
					{
						url: require('../../../assets/img/museum/04.jpg'),
						text: '1919年小歌班始在上海立足',
						subtitle: '小歌班'
					},
					{
						url: require('../../../assets/img/museum/04.jpg'),
						text: '1920年起，小歌班集中较知名的演员编演新剧目，如《梁山伯与祝英台》《碧玉簪》《孟丽君》等。这些剧目适应了“五四运动”后争取女权和男女平等思潮的兴起，受观众欢迎。',
						subtitle: '小歌班'
					},
					{
						url: require('../../../assets/img/museum/07.jpg'),
						text: '1923年7月，嵊县籍商人王金水请男班艺人金荣水回乡办第一个女班，招收13岁以下的女孩二十余人。',
						subtitle: '女班'
					},
					{
						url: require('../../../assets/img/museum/03.jpg'),
						text: '1928年1月起，女班蜂拥来沪，至1941年下半年增至36个。女子越剧的著名演员几乎都荟萃于上海。',
						subtitle: '女班越剧'
					},
					{
						url: require('../../../assets/img/museum/03.jpg'),
						text: '1942年10月，袁雪芬以话剧为榜样，在大来剧场开始改革。他们把进行改革的越剧成为“新越剧”。',
						subtitle: '女班越剧'
					},
					{
						url: require('../../../assets/img/museum/03.jpg'),
						text: '1943年11月，袁雪芬与琴师周宝财合作，使之前就有的2.5弦之唱法更为规范，尺调腔由此开始形成若干板类。',
						subtitle: '女班越剧'
					},
					{
						url: require('../../../assets/img/museum/03.jpg'),
						text: '1944年9月，尹桂芳、竺水招也在龙门戏院进行改革。此后，上海主要越剧团都投入“新越剧”的行列，越剧的面貌在短短几年中发生了巨大变化。',
						subtitle: '女班越剧'
					},
				],
				index: 0,

				classList: {
					action_in: true,
					action_out: false,
				},
			}
		},
		methods: {
			closedown: function() {
				this.img.iconUrl = require('../../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.img.iconUrl = require('../../../assets/icon/close.png')
				this.classList.action_in = false,
					this.classList.action_out = true
				setTimeout(() => {
					// 关闭组件
					this.$emit('close')
					this.classList.action_in = true
					this.classList.action_out = false
				}, 250)
			},
			toNext_down: function() {
				this.img.next = require('../../../assets/icon/right-press.png')
			},
			toNext_up: function() {
				this.img.next = require('../../../assets/icon/right.png')
				this.index++
			},
			toBack_down: function() {
				this.img.back = require('../../../assets/icon/left-press.png')
			},
			toBack_up: function() {
				this.img.back = require('../../../assets/icon/left.png')
				this.index--
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 1920px;
		height: 1080px;
		background-color: rgba($color: #000000, $alpha: .5);
		position: relative;
		z-index: 1;
		// background-color: red;
	}
	.history {
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

		.background {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}

		.description {
			position: absolute;
			width: 80%;
			height: 70%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.img{
				width: 49%;
				height: 70%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.title{
					font-family: 'xingkai';
					color: rgba($color: #7b5a44, $alpha: 1.0);
					font-size: 65px;
					position: absolute;
					left: 0;
					top: 0px;
				}
				img{
					width: 100%;
					height: 100%;
				}
				.subtitle{
					font-family: 'xingkai';
					color: rgba($color: #7b5a44, $alpha: 1.0);
					font-size: 36px;
					position: absolute;
					bottom: 30px;
				}
			}
			.text{
				width: 47%;
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				font-size: 36px;
			}
		}

		.icon {
			position: absolute;
			top: 100px;
			right: 100px;
			cursor: pointer;

			img {
				pointer-events: none;
			}
		}

		.next {
			position: absolute;
			top: 650px;
			right: 110px;
			cursor: pointer;

			img {
				pointer-events: none;
				width: 70%;
			}
		}

		.back {
			position: absolute;
			top: 650px;
			left: 130px;
			cursor: pointer;

			img {
				pointer-events: none;
				width: 70%;
			}
		}
	}


	// 动画效果
	.action_in {
		animation: appear .3s ease;
	}

	.action_out {
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
