<template>
	<div class="video_content">
		<div class="video_warp" :class="classList">
			<img :src="imgUrl.background" alt="" class="background">
			<div class="warp" v-show="isShow.textShow">
				<div class="video_title">水袖</div>
				<div class="video_text">
					水袖古有“长袖善舞”之说，水袖的文化源远流长。
					它是中华名族文化的艺术结晶，作为袖舞道具的“水袖”，
					成为了一门独立的艺术表演。它有着独特的表现形式，
					体现了中国古典舞中华民族精神气质的韵味。水袖的运用，
					不仅肢体动作得以延伸，更是扩展了身体的表现力和延伸了内在感情。
					通过技法和身体的表现力，体现出“行云流水”般的美感。
				</div>
				<div class="playbtn" @mousedown="play_down()" @mouseup="play_up()">
					<img :src="imgUrl.icon1" alt="" ref="playbtn">
				</div>
				<div class="close" @mousedown="close_down()" @mouseup="close_up()">
					<img :src="imgUrl.icon3" alt="" ref="closebtn">
				</div>
			</div>
			
			<div class="warp" v-show="isShow.videoShow">
				<img :src="imgUrl.background" alt="" class="background">
				<video id="example_video" class="video-js vjs-default-skin " controls ref="source"></video>
				<div class="icon" @mousedown="back_down()" @mouseup="back_up()">
					<img :src="imgUrl.icon5" alt="" ref="back">
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow:{
					textShow:true,
					videoShow:false,
				},
				imgUrl: {
					background: require('../../../assets/img/bg2.png'),
					icon1: require('../../../assets/icon/vedio.png'),
					icon2: require('../../../assets/icon/vedio-press.png'),
					icon3: require('../../../assets/icon/close.png'),
					icon4: require('../../../assets/icon/close-press.png'),
					icon5: require('../../../assets/icon/left.png'),
					icon6: require('../../../assets/icon/left-press.png'),
					poster: require('../../../assets/img/f.png')
				},
				classList:{
					action_in:true,
					action_out:false,
				},
				video:require('../../../assets/video/jx.mp4')
			}
		},
		methods:{
			
			play_down:function(){
				this.$refs.playbtn.src = this.imgUrl.icon2
			},
			play_up:function(){
				this.$refs.playbtn.src = this.imgUrl.icon1
				this.isShow.textShow = false
				this.isShow.videoShow = true
				this.$refs.source.src = this.video
				this.$refs.source.poster = this.imgUrl.poster
			},
			
			close_down:function(){
				this.$refs.closebtn.src = this.imgUrl.icon4
			},
			close_up:function(){
				this.$refs.closebtn.src = this.imgUrl.icon3
				this.classList.action_in = false
				this.classList.action_out = true
				setTimeout(()=>{
					this.$emit('display')
					this.classList.action_in = true
					this.classList.action_out = false
				},200)
			},
			
			back_down:function(){
				this.$refs.back.src = this.imgUrl.icon6
			},
			back_up:function(){
				this.$refs.back.src = this.imgUrl.icon5
				this.isShow.textShow = true
				this.isShow.videoShow = false
				this.$refs.source.pause()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_content {
		position: absolute;
		width: 1920px;
		height: 969px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;

		.video_warp {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			align-items: center;
			width: 80%;
			height: 80%;
			position: absolute;
			font-family: 'xingkai';
			color: rgba($color: #7b5a44, $alpha: 1.0);
			font-size: 40px;
			.warp{
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				align-items: center;
				position: absolute;
				height: 100%;
				width: 100%;
				#example_video{
					width: 70%;
					height: 70%;
					margin-top: 120px;
				}
			}
			.background {
				height: 100%;
				width: 100%;
				pointer-events: none;
				position: absolute;
				z-index: -1;
			}

			.video_title {
				font-size: 80px;
				margin-top: 90px;
			}

			.video_text {
				width: 70%;
				margin-top: 50px;
			}

			.playbtn {
				margin-top:50px;
				cursor: pointer;
			}
			.close{
				position: absolute;
				top: 100px;
				right: 140px;
				cursor: pointer;
			}
			.icon {
				position: absolute;
				right: 120px;
				top: 85px;
				cursor: pointer;
				img {
					pointer-events: none;
				}
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
