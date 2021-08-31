<template>
	<div class="content" :class="classList">
		<div class="clothes">
			<img :src="img.background" alt="" class="background">
		
			<div class="description">
				<div class="img">
					<div class="title">{{title}}</div>
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
		data(){
			return{
				img: {
					background: require('../../../assets/img/bg2.png'),
					iconUrl: require('../../../assets/icon/close.png'),
					next: require('../../../assets/icon/right.png'),
					back: require('../../../assets/icon/left.png'),
				},
				classList: {
					action_in: true,
					action_out: false,
				},
				index:0,
				title:'越剧服饰',
				page: [
					{
						url: require('../../../assets/img/museum/fs1.png'),
						text: '越剧服装的用料一般不用有强烈反光的缎子，而用绸、乔其纱、珠罗纱、尼龙纱等，给人轻盈、柔美、洒脱之感。',
					},
					{
						url: require('../../../assets/img/museum/fs2.png'),
						text: '在服装的色彩上多用中间色，比之传统的下五色丰富很多；在花纹样式上多用边花、角花、暗花，力求简洁、淡雅，这与传统戏衣的浓重的装饰风格恰成对比。',
					},
					{
						url: require('../../../assets/img/museum/fs3.png'),
						text: '样式的设计上，借鉴古代仕女画较多。旦角服饰尤为明显，上衣有圆领、斜领、对开领；袖子有用水袖和不用水袖而放长衣袖两种；裙子大多做成百褶式，有的还在长裙外面加一短式腰裙。此外，各种佩戴的装饰性附件较多。',
					},
					{
						url: require('../../../assets/img/museum/fs4.png'),
						text: '按身份不同，古装衣又分为仕女衣、民间衣、宫装衣，其特点是裙长衣短，腰胸收紧，形体分明。',
						subtitle:'古装衣'
					},
					{
						url: require('../../../assets/img/museum/fs5.png'),
						text: '越剧有时把传统的“蟒”改为袍制（蟒+袍），叫蟒袍。蟒以明代官服为依据，追求领圈、水甲、纹样的统一。',
						subtitle:'越剧蟒'
					},
					{
						url: require('../../../assets/img/museum/fs6.png'),
						text: '纹样有“鱼鳞甲”、“丁字甲”、“人字甲”、“龟背甲”等，有金绣，也有用金缎、银缎剪贴，或金银宽边花版线缝纫上去；护心镜有用克罗米铜泡，或盘金、盘银，靠肩上的吞口做成半立体。越剧靠以紧身、适中为美。',
						subtitle:'越剧靠'
					},
					{
						url: require('../../../assets/img/museum/fs7.png'),
						text: '越剧的裙，主要是花旦的百裥裙褙裙，罩在大裥裙外，长出很多，但它的斜角边缘靠近小腿肚的地方，正面用佩，佩很长，长到脚面，十分简洁，上面没有花，只在沿边上用金边盘绕。',
						subtitle:'越剧裙'
					},
					{
						url: require('../../../assets/img/museum/fs8.png'),
						text: '最早用的都是传统大云肩，之后发展到百多种，如：对开云肩、珠珠云肩、有领云肩、无领云肩……以纹饰变形的有如意云肩、花形云肩、网眼云肩等。',
						subtitle:'越剧云肩'
					},
					{
						url: require('../../../assets/img/museum/fs9.png'),
						text: '小生、老生帔里面都穿“贴衣”，不再露出裤脚，外面衣服仍然加长到脚面。有种帔往往在剧中有夫妻俩出场时运用相同色彩，称“对帔”。越剧帔在领口上有变化出多种样式，如斜襟帔、直襟帔、翻领帔、如意领帔等。',
						subtitle:'褶子与帔'
					},
					{
						url: require('../../../assets/img/museum/fs10.png'),
						text: '越剧盔帽在用料上和改革后的越剧服装相同，不采用反光性较强的软缎，而多用丝绒、利亚绒、绉缎或绸类。',
						subtitle:'越剧盔帽'
					},
					{
						url: require('../../../assets/img/museum/fs11.png'),
						text: '靴鞋改革以后，不但穿高靴，在靴头上也改成有云饰纹的花样或绣花，色彩套成强烈和谐的三色，俗称三套云高靴。靴的色彩和盔帽类同，往往相辅相成，不采用反光软缎，以丝绒为料且与衣服同色居多。',
						subtitle:'越剧靴鞋'
					},
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
				this.index = this.index+1
			},
			toBack_down: function() {
				this.img.back = require('../../../assets/icon/left-press.png')
			},
			toBack_up: function() {
				this.img.back = require('../../../assets/icon/left.png')
				this.index = this.index-1
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
					height: 100%;
				}
				.subtitle{
					font-family: 'xingkai';
					color: rgba($color: #7b5a44, $alpha: 1.0);
					font-size: 36px;
					position: absolute;
					bottom: 40px;
				}
			}
			.text{
				width: 55%;
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				font-size: 36px;
			}
		}
		
		.background {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
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
