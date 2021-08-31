<template>
  <div class="content">
      <!-- 背景 -->
      <img :src="imgUrl.background" alt="" class="background">
      
      <!-- 工具栏 -->
      <Tools></Tools>

      <!-- 信物摆放 -->
      <div class="goods">
          <div class="contain">
              <div class="box">
                  <img :src="imgUrl.light" alt="light" class="light" v-show="isShow.lightShow">
              </div>
              <div class="box">
                  <img :src="imgUrl.fan" alt="fan" class="fan" v-show="isShow.fanShow">
              </div>
              <div class="box">
                  <img :src="imgUrl.bottle" alt="bottle" class="bottle" v-show="isShow.bottleShow">
              </div>
          </div>
      </div>

      <!-- 开门 -->
      <div class="open">
          <button @click="getpopup()">开 门</button>
      </div>

      <!-- 弹框提示 -->
      <div class="tip" :class="this.classList" v-show="isShow.popupShow">
			<img :src="imgUrl.popup" alt="" class="pop_img">
            <div class="icon">
				<div class="btn" @mousedown="closedown()" @mouseup="closeup()">
					<img :src="imgUrl.close1" alt="" ref="btn">
				</div>
			</div>
			<div class="text">
				<div class="up">提示:</div>
				<div class="down">{{tipContent}}</div>
			</div>
			
		</div>
		
      
  </div>
</template>

<script>
    import Tools from '../component/tools.vue'
    export default {
        components: {
			'Tools': Tools,
		},
        data() {
			return {
				imgUrl: {
					background: require('../../assets/img/gqm.png'),
                    light:require('../../assets/img/light2.png'),
                    fan:require('../../assets/img/xw-sz.png'),
                    bottle:require('../../assets/img/xw-hp.png'),
                    popup: require('../../assets/img/底2.jpg'),
					close1: require('../../assets/icon/close.png'),
					close2: require('../../assets/icon/close-press.png'),
				},
                isShow: {
					popupShow: false,
                    lightShow: false,
                    fanShow: false,
                    bottleShow: false,
                    doorIfShow: false,
                    doorShow: false,
				},
                classList: {
					appear: true,
					disAppear: false,
				},
                tipContent: "信物尚未集齐！",
                
            }
        },
        //页面加载时执行方法
        mounted:function(){
            this.getshow();
        },
        methods: {
            //关闭弹框
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

            //判断信物是否拥有并改变isShow
            getshow:function(){
                let account = localStorage.getItem('account');
				let data = this;
                this.$http.post('/app/user/', {
					"endata": {
						"action": "myitems",
						"account": account
					}
				}).then((res) => {
					res = res.data
					if (res.endata.items.includes(1)) {
                        data.isShow.lightShow = true
                        //console.log(data.isShow.lightShow)
					}
                    if (res.endata.items.includes(2)) {
                        data.isShow.fanShow = true
                        //console.log(data.isShow.fanShow)
					}
                    if (res.endata.items.includes(3)) {
                        data.isShow.bottleShow = true
                        //console.log(data.isShow.bottleShow)
					}
                    if (data.isShow.lightShow && data.isShow.fanShow && data.isShow.bottleShow) {
                        data.isShow.doorIfShow = true
                    }
				})
            },


            //点击开门按钮 ----测试用-无判断直接弹框
            // getpopup: function() {
            //     let data = this;
            //     data.classList.appear = true;
			// 	data.classList.disAppear = false;
			// 	data.isShow.popupShow = true	
			// },
            //需求：没齐-信物尚未集齐！ 成功-恭喜您打开城门！ 成功后点击-城门已经开启了哦
            getpopup: function() {
                let data = this;
                if (data.isShow.doorIfShow == false){
                   return
                } else{
                    if (data.isShow.doorShow){
                        data.tipContent = "城门已经开启了哦";
                    } else{
                        data.tipContent = "恭喜您打开城门！";
                        data.isShow.doorShow = true;
                    }
                }
                data.classList.appear = true;
                data.classList.disAppear = false;
                data.isShow.popupShow = true;
                	
			},

        },
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

        //信物摆放
        .goods{
            position: absolute;
            top:16%;
            width: 70%;
            height: 40%;
            //background-color: pink;

            .contain{
                display: flex;
                justify-content:space-around;
                align-items: center;
                width: 100%;
                height: 100%;

                .box{
                    width: 16%;
                    height: 48%;
                    border: 4px solid #7b5a44;
                    background-color: #fff;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img{
                        height: 100%;
                        width: auto;
                    }
                }
            }
        }

        //开门按钮
        .open{
            position: absolute;
            top: 60%;
            width: 19%;
            height: 13%;
			
            button{
				cursor: pointer;
                width: 100%;
                height: 100%;
                background-color: #e7e3d7;
                border:8px solid #7b5a44;
                border-radius: 10px;
                font-family: 'xingkai';
                font-size: 70px;
                color: rgba($color: #7b5a44, $alpha: 1.0);
            }
        }

        // 弹框
		.tip {
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

			.pop_img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}

            .icon {
                position: absolute;
                top: 25px;
                right: 25px;
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

			.text {
				width: 70%;
				height: 70%;
                margin-top: 8%;
				font-family: 'xingkai';
				font-size: 50px;
				color: rgba($color: #786850, $alpha: 1.0);
				position: relative;

				.up {
					position: absolute;
					//left: 20px;
                    font-size: 70px;
				}

				.down {
					position: absolute;
					top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                    text-align: center;
					
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
