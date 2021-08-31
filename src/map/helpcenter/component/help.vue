<template>
  <div class="help_content">
		<div class="help_warp" :class="classList">
			<img :src="imgUrl.background" alt="" class="background">
			<div class="warp">
				<div class="help_title">帮助中心</div>
                
                <!-- 不同的内容 -->
				<div class="help_text">
                    <div class="help_left">
                        <img :src="build[index].img" alt="" class="build_img">
                        <div class="build_name">{{build[index].name}}</div>
                    </div>
                    <div class="help_right">
                        <div class="build_text">{{build[index].introduce}}</div>
                    </div>
                </div>

                <!-- 按钮 -->
                <div class="icon" @mousedown="closedown" @mouseup="closeup">
			        <img :src="imgUrl.iconUrl" alt="">
                </div>
                <div class="next" @mousedown="toNext_down" @mouseup="toNext_up" v-show="index<build.length-1">
                    <img :src="imgUrl.next" alt="">
                </div>
                <div class="back" @mousedown="toBack_down" @mouseup="toBack_up" v-show="index!=0">
                    <img :src="imgUrl.back" alt="">
                </div>
				
			</div>
			
			
		</div>
	</div>
</template>

<script>
	export default {
		props: ['help'],
		data(){
			return{
				imgUrl:{
					background:require('../../../assets/img/bg2.png'),
					iconUrl:require('../../../assets/icon/close.png'),
					next:require('../../../assets/icon/right.png'),
					back:require('../../../assets/icon/left.png'),
				},
                build:[{
                    name:'观影台',
                    img:require("../../../assets/img/8-viewing.png"),
                    introduce:'用于观赏越剧的古老建筑',
                },{
                    name:'教学亭',
                    img:require("../../../assets/img/13-workshop.png"),
                    introduce:'近期在这里开设了水袖教程',
                },{
                    name:'博物馆',
                    img:require("../../../assets/img/9-museum.png"),
                    introduce:'你可以在这里了解到一部分越剧的历史',
                },{
                    name:'乐器房',
                    img:require("../../../assets/img/26-instruments.png"),
                    introduce:'如果对演奏越剧音乐的乐器感兴趣的话,就来这里看一看吧',
                },{
                    name:'城门关卡',
                    img:require("../../../assets/img/23-pass.png"),
                    introduce:'大门关闭着呢，这里有人把守，想要进入里面的话好像需要给他们什么东西',
                },{
                    name:'换装间',
                    img:require("../../../assets/img/29-costume.png"),
                    introduce:'这里有好多漂亮的衣服哦 \n小游戏：听题换装，根据给出的主题选择最合适的服饰',
                },{
                    name:'舞台',
                    img:require("../../../assets/img/19-stage.png"),
                    introduce:'已经了解一点越剧知识的你需要在这里测验哦 \n小游戏：听题吃豆豆，根据给出的问题，在掉落的答案中选择正确的豆豆',
                },{
                    name:'兑换屋',
                    img:require("../../../assets/img/11-exchange1.png"),
                    introduce:'可以用积分兑换部分服饰道具',
                },{
                    name:'兑换摊',
                    img:require("../../../assets/img/28-exchange2.png"),
                    introduce:'可以用信物兑换部分服饰道具',
                },],
                index:0,
				classList:{
					action_in:true,
					action_out:false,
				},
			}
		},
		methods:{
			closedown: function() {
				this.imgUrl.iconUrl = require('../../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.imgUrl.iconUrl = require('../../../assets/icon/close.png')
				this.classList.action_in = false,
				this.classList.action_out = true
				setTimeout(() => {
					// 关闭组件
					this.$emit('display')
					this.classList.action_in = true
					this.classList.action_out = false
				}, 250)
			},
			toNext_down:function(){
				this.imgUrl.next = require('../../../assets/icon/right-press.png')
			},
			toNext_up:function(){
				this.imgUrl.next = require('../../../assets/icon/right.png')
				this.index++;
			},
			toBack_down:function(){
				this.imgUrl.back = require('../../../assets/icon/left-press.png')
			},
			toBack_up:function(){
				this.imgUrl.back = require('../../../assets/icon/left.png')
				this.index--;
			}
			
		}
	}
</script>


<style lang="scss" scoped>
	.help_content {
		position: absolute;
		width: 1920px;
		height: 969px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;

		.help_warp {
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
			}
			.background {
				height: 100%;
				width: 100%;
				pointer-events: none;
				position: absolute;
				z-index: -1;
			}

			.warp .help_title {
				font-size: 70px;
				margin-top: 90px;
			}

			.warp .help_text {
				display: flex;
				flex-direction: row;
                justify-content: center;
                //background-color: red;
                padding-top: 50px;
				height: 50%;
				width: 75%;

                .help_left{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    width: 45%;
                    //background-color: gold;

                    .build_img{
                        width: auto;
                        height: 70%;
                    }

                    .build_name{
                        padding-top: 50px;
                    }
                }

                .help_right{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    width: 55%;
                    //background-color: greenyellow;
                }
			}


           
            .icon{
                position: absolute;
                top: 80px;
                right: 135px;
                cursor: pointer;
                img{
                    pointer-events: none;
                }
            }
            .next{
                position: absolute;
                top: 570px;
                right: 130px;
                cursor: pointer;
                img{
                    pointer-events: none;
                    width: 100%;
                }
            }
            .back{
                position: absolute;
                top: 570px;
                left: 130px;
                cursor: pointer;
                img{
                    pointer-events: none;
                    width: 100%;
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