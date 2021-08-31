<template>
	<div class="content" :class="classList">
		<div class="clothes">
			<img :src="img.background" alt="" class="background">
		
			<div class="description">
				<div class="title">{{title}}</div>
				<div class="left">
					<div class="img">
						<div class="before" @click="gobefore()">
							<img :src="img.before" alt="">
						</div>
						
						<div class="demo">
							<img :src="img_data[this.img_index].url" alt="">
							<div class="subtitle">{{img_data[this.img_index].subtitle}}</div>
						</div>
						
						<div class="after" @click="goafter()">
							<img :src="img.after" alt="">
						</div>
					</div>
				</div>
				<div class="text">
					<div class="text_title">{{text_data[this.text_index].title}}</div>
					<div class="text_content">{{text_data[this.text_index].text}}</div> 
				</div>
			</div>
			
			<div class="icon" @mousedown="closedown" @mouseup="closeup">
				<img :src="img.iconUrl" alt="">
			</div>
		
			<div class="next" @mousedown="toNext_down" @mouseup="toNext_up" v-show="this.text_index!=this.text_data.length-1">
				<img :src="img.next" alt="">
			</div>
		
			<div class="back" @mousedown="toBack_down" @mouseup="toBack_up" v-show="this.text_index!=0">
				<img :src="img.back" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				img: {
					background: require('../../../assets/img/bg2.png'),
					iconUrl: require('../../../assets/icon/close.png'),
					next: require('../../../assets/icon/right.png'),
					back: require('../../../assets/icon/left.png'),
					after:require('../../../assets/icon/n.png'),
					before:require('../../../assets/icon/b.png'),
				},
				classList: {
					action_in: true,
					action_out: false,
				},
				title:'化妆过程',
				img_index:0,
				img_data:[
					{
						subtitle:'花旦',
						url:require('../../../assets/img/museum/hd1.png')
					},
					{
						subtitle:'花旦',
						url:require('../../../assets/img/museum/hd2.png')
					},
					{
						subtitle:'花旦',
						url:require('../../../assets/img/museum/hd3.png')
					},
					{
						subtitle:'小生',
						url:require('../../../assets/img/museum/xs1.png')
					},
					{
						subtitle:'小生',
						url:require('../../../assets/img/museum/xs2.png')
					},
					{
						subtitle:'小生',
						url:require('../../../assets/img/museum/xs3.png')
					}
				],
				
				text_index:0,
				text_data:[
					{
						title:'画眼圈',
						text:'画眼圈要根据演员的眼睛大小、脸型胖瘦，进行比例的夸张。旦角演员基本是以凤眼的形式、外眼角略往上挑，给人妩媚之感'
					},
					{
						title:'画眉毛',
						text:'画眉即用锅烟和眉黑笔在原有眉毛的基础上加以夸张手法，如正旦、花旦要画柳叶眉，武旦要画剑眉，彩旦要画八字眉。画眉毛的长短粗细曲直也要结合演员的脸型、五官的特点。'
					},
					{
						title:'画嘴唇',
						text:'用大红油彩勾画上下嘴唇的轮廓，根据演员的嘴唇进行调整，如最大的可以画小画薄，嘴小的可以画大画厚。'
					},
					{
						title:'画眼线',
						text:'眼睛往下看，话上眼线。内眼角最细，外眼角最宽，内外眼角都要画，眼线的根部要掌握好形状，小生妆要比花旦妆更夸张一些。'
					},
					{
						title:'画眉毛',
						text:'用红色眉笔打底画好的眉形，吧眼影（小生用朱红或者大红）涂画在眉毛上。用眼影来画鼻头，从眉头往鼻梁下拉。'
					},
					{
						title:'画鼻梁',
						text:'小生妆可以在嘴唇下方或下巴等部位打赏阴影，用重一点的胭脂打在脸颊部位，增加凹陷感，体现出男生的轮廓，使面部看上去更英朗硬气。'
					}
				]
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
				this.text_index = (this.text_index+1+this.text_data.length)%this.text_data.length
				this.img_index = this.text_index
			},
			toBack_down: function() {
				this.img.back = require('../../../assets/icon/left-press.png')
			},
			toBack_up: function() {
				this.img.back = require('../../../assets/icon/left.png')
				this.text_index = (this.text_index-1+this.text_data.length)%this.text_data.length
				this.img_index = this.text_index
			},
			gobefore(){
				this.img_index=(this.img_index+this.img_data.length-1)%this.img_data.length
			},
			goafter(){
				this.img_index=(this.img_index+this.img_data.length+1)%this.img_data.length
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
	.clothes {
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
		
		.description{
			position: absolute;
			width: 80%;
			height: 70%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title{
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				font-size: 65px;
				position: absolute;
				left: 0;
				top: 0px;
			}
			.left{
				position: relative;
				width: 49%;
				height: 60%;
				display: flex;
				align-items: center;
				justify-content: center;
				.img{
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.after{
						width: 50px;
						cursor: pointer;
						img{
							width: 100%;
						}
					}
					.demo{
						height: 100%;
						margin: 15px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						img{
							height: 100%;
						}
						.subtitle{
							position: absolute;
							bottom: -50px;
							font-family: 'xingkai';
							color: rgba($color: #7b5a44, $alpha: 1.0);
							font-size: 36px;
						}
					}
					.before{
						width: 50px;
						cursor: pointer;
						img{
							width: 100%;
						}
					}
				}
				
			}
		
			.text{
				width: 50%;
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				font-size: 36px;
				.text_title{
					
				}
				.text_content{
					
				}
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
