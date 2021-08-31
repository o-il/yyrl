<template>
	<div class="content">
		<img :src="bgUrl" alt="" class="content_bg">
		<div class="container" ref="container" :class="container_animate">
			<img :src="iconUrl" alt="" class="icon" @mouseover="iconHover()" @mouseleave="iconLeave()"
				@click="goBack()">
			<div class="login">登录</div>
			<div class="warp">
				<label class="label" @blur="cheakAccount()">账号
					<input type="number" name="username" class="input" v-model="user.account" /></label>

				<label class="label">密码
					<input type="password" name="passworld" class="input" v-model="user.password" /></label>

				<button class="btn" @click="login()">登录</button>
			</div>
			<div class="gotoRegist">没有账号？<a @click="gotoRegist()">去注册</a></div>
		</div>
		<div class="title" ref="title">越音绕梁</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active1: 'color: black;',
				active2: 'color: black;',
				isShow: false,
				bgUrl: require('../assets/img/bg.jpg'),
				iconUrl: require('../assets/icon/left.png'),
				container_animate: {
					animation2: true,
					animation3: false
				},
				user: {
					account: '',
					password: ''
				},
			}
		},
		mounted() {
			// sessionStorage.setItem("username", '');
			// this.$message({
			// 	message: '登陆成功',
			// 	type: 'success'
			// });
		},
		created() {
			// self = this;
			// setTimeout(function () {
			//   self.$refs.container.style="display:flex";
			// },500)
		},

		methods: {

			iconHover: function() {
				this.iconUrl = require('../assets/icon/left-press.png');
			},
			iconLeave: function() {
				this.iconUrl = require('../assets/icon/left.png');
			},

			// 从登录返回主页面
			goBack: function() {

				// 登录退场
				this.container_animate.animation2 = false;
				this.container_animate.animation3 = true;
				// 跳转到主页面
				setTimeout(() => {
					this.$router.push('/index')
				}, 500)
			},

			//表单验证
			cheakAccount: function() {

			},

			// 表单提交
			login: function() {
				//发送登录请求
				this.$http.post('/app/login/', {
					'endata': this.user
				}).then((res) => {
					res = res.data;
					if (res.endata.su == 1) {
						this.$message({
							message: '登陆成功',
							type: 'success'
						});
						this.$store.commit('$_setToken', res.endata.token);
						this.$store.commit('$_setaccount', res.endata.userdata.account);
						this.$router.push('/map')
					} else {
						this.$message({
							message: '用户名或者密码错误',
							type: 'error'
						});
					}
				}).catch(function(error) { // 请求失败处理
					console.log(error);
				})
			},

			gotoRegist: function() {
				this.container_animate.animation3 = true;
				this.container_animate.animation2 = false;
				setTimeout(() => {
					this.$router.push('/regist')
				}, 500)
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		width: 1920px;
		height: 1080px;
		position: relative;

		// overflow-y: hidden;
		.content_bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -10;
		}

		.help {
			display: none;
			position: absolute;
			width: 1200px;
			height: 700px;
			background: url(../assets/img/bg2.png);
			background-size: cover;
			opacity: 0;
			top: 50%;
			left: 50%;
			z-index: 1;
			transform: translate(-50%, -50%);
			animation-fill-mode: forwards;
			color: rgba($color: #786a59, $alpha: 1.0);

			.help_title {
				font-size: 65px;
				font-family: 'xingkai';
				margin-top: 155px;
				margin-left: 155px;
				display: flex;
				width: 80%;
				justify-content: space-between;
				align-items: center;

				.help_btn {
					width: 70px;
					height: 70px;
					cursor: pointer;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					img {
						position: absolute;
						width: 100%;
						height: 100%;
					}
				}

			}

			.help_text {
				font-size: 32px;
				font-family: 'xingkai';
				margin-top: 100px;
				margin-left: 155px;
				width: 80%;
				text-indent: 80px;
				line-height: 45px;
			}
		}

		.container {
			position: absolute;
			animation-fill-mode: forwards;
			width: 45%;
			height: 75%;
			background-color: rgba($color: #fff, $alpha: .7);
			top: 18%;
			right: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 1;

			.icon {
				position: absolute;
				width: 70px;
				height: 70px;
				cursor: pointer;
				top: 50px;
				right: 50px;
			}

			.login {
				width: 80%;
				text-align: center;
				margin-top: 50px;
				border-bottom: 1px solid rgba($color: #5c544d, $alpha: 1.0);
				font-size: 75px;
				font-family: 'xingkai';
				color: rgba($color: #5c544d, $alpha: 1.0);
			}

			.warp {
				margin-top: 25px;
				width: 70%;
				height: 50%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.label {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 35px;
					font-family: 'xingkai';
				}

				.input {
					width: 65%;
					height: 50px;
					outline: none;
					font-size: 25px;
					padding-left: 15px;
					margin-right: 55px;
				}

				.btn {
					width: 150px;
					height: 60px;
					border: 0px;
					background-color: rgba($color: #ccae88, $alpha: 1.0);
					line-height: 45px;
					color: white;
					font-size: 35px;
					cursor: pointer;
				}
			}

			.gotoRegist {
				position: absolute;
				left: 10%;
				bottom: 25%;
				font-family: 'xingkai';
				font-size: 22px;

				a {
					text-decoration: none;
					color: #3ab3ef;
					font-family: "宋体";
					font-weight: 600;
					cursor: pointer;
				}
			}
		}

		.title {
			position: absolute;
			width: 145px;
			height: 600px;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 50px;
			font-family: 'xingkai';
			color: rgba($color: #786a59, $alpha: 1.0);
			writing-mode: vertical-lr;
			left: 950px;
			font-size: 120px;
			letter-spacing: 15px;
			border: 2px solid rgba($color: #786a59, $alpha: 1.0);
			z-index: -1;
		}

		.title::after {
			content: '';
			display: inline-block;
			position: absolute;
			top: 40px;
			left: 40px;
			width: 145px;
			height: 600px;
			background-color: rgba($color: #fff, $alpha: .7);
			z-index: -9;
		}

		.fan {
			width: 585px;
			height: 979px;
			position: absolute;
			writing-mode: vertical-lr;
			right: 50px;
			animation-fill-mode: forwards;
			font-size: 75px;
			font-family: 'xingkai';
			display: flex;
			align-items: center;
			flex-direction: column;
			z-index: 1;

			img {
				width: 100%;
				position: absolute;
			}

			.left {
				margin-left: 65px;
				margin-top: 150px;
				cursor: pointer;
			}

			.right {
				margin-top: -150px;
				margin-left: 15px;
				cursor: pointer;
			}
		}
	}

	// .animation {
	// 	animation: move1 1s ease;
	// }
	.animation2 {
		animation: move2 1s ease;
	}

	.animation3 {
		animation: move3 1s ease;
	}

	// @keyframes move1 {
	// 	0% {
	// 		opacity: 0.2;
	// 		transform: translateX(-50px);
	// 	}

	// 	100% {
	// 		opacity: 1;
	// 		transform: translateX(0);
	// 	}
	// }

	@keyframes move2 {
		0% {
			opacity: 0.2;
			transform: translateX(550px);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes move3 {
		0% {
			opacity: 1;
			transform: translateX(0px);
		}

		100% {
			opacity: 0;
			transform: translateX(550px);
		}
	}
</style>
