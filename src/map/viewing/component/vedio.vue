<template>
	<div class="content">
		<video id="example_video" class="video-js vjs-default-skin " controls ref="source"></video>
		<div class="icon" @mousedown="down()" @mouseup="up()">
			<img :src="imgUrl.icon1" alt="" ref="back">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'state'],
		data() {
			return {
				imgUrl: {
					"碧玉簪":require('../../../assets/video/fbyz.png'),
					"梁祝":require('../../../assets/video/flz.png'),
					"王老虎抢亲":require('../../../assets/video/fwlh.png'),
					"追云-观灯":require('../../../assets/video/fzy.png'),
					icon1: require('../../../assets/icon/left.png'),
					icon2: require('../../../assets/icon/left-press.png'),
				},
				vedio: {
					"碧玉簪": {
						url: require('../../../assets/video/碧玉簪片花3.mp4'),
						name: '碧玉簪'
					},
					"梁祝": {
						url: require('../../../assets/video/越剧《梁祝》哭兄选段：一见梁兄魂魄消，金静表演-超清720P.mp4'),
						name: '梁祝'
					},
					"王老虎抢亲": {
						url: require('../../../assets/video/越剧《王老虎抢亲》选段，周文宾男扮女装，祝枝山面对面认不出-超清720P.mp4'),
						name: '王老虎抢亲'
					},
					"追云-观灯": {
						url: require('../../../assets/video/越剧大师徐玉兰王文娟《追鱼-观灯》片段，经典代代相传！-高清480P.mp4'),
						name: '追云-观灯'
					},
				},
			}
		},
		methods: {
			down:function(){
				this.$refs.back.src = this.imgUrl.icon2
			},
			up:function(){
				this.$refs.back.src = this.imgUrl.icon1
				this.$refs.source.pause()
				this.$emit('back_up')
			},
		},
		watch: {
			name(item1, item2) {
				if(this.state){
					// item1为新值，item2为旧值
					this.$refs.source.src = this.vedio[item1].url
					this.$refs.source.poster = this.imgUrl[item1]
				}

			},
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 1440px;
		height: 810px;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		#example_video {
			width: 980px;
			height: 550px;
		}
		.icon {
			position: absolute;
			right: 355px;
			top: 85px;
			cursor: pointer;
		
			img {
				pointer-events: none;
			}
		}
	}
</style>
