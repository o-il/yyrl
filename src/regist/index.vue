<template>
	<div class="content">
		<img :src="bgUrl" alt="" class="content_bg">
		<div class="container" ref="container" :class="animation">
			<div class="regist">注册</div>
			<div class="warp">
				<label class="label" :class="accountClass"><span>账号</span>
					<input type="number" name="account" class="input" v-model="user.account" @blur="cheakAccount()"
						ref="account" placeholder="8-10位纯数字" /></label>

				<label class="label" :class="nameClass"><span>昵称</span>
					<input type="text" name="name" class="input" v-model="user.nickname" @blur="cheakName()"
						placeholder="不包含空格" /></label>

				<label class="label" :class="passwordClass"><span>密码</span>
					<input type="password" name="passworld" class="input" v-model="user.password" placeholder="不少于6位"
						@blur="cheakPassword()" /></label>

				<label class="label" :class="passwordRepeatClass"><span>确认密码</span>
					<input type="password" name="passwordRepeat" class="input" v-model="user.passwordRepeat"
						placeholder="确认密码" @blur="cheakPasswordRepeat()" /></label>
				<button type="submit" class="btn" @click="regist()">注册</button>
			</div>
			<div class="gotoRegist">已有账号？<a @click="gotoLogin()">去登录</a>
			</div>
		</div>
		<div class="title" ref="title">越音绕梁</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bgUrl: require('../assets/img/bg.jpg'),
				animation: {
					animation1: true,
					animation2: false
				},
				user: {
					account: '',
					password: '',
					nickname: '',
					passwordRepeat: ''
				},
				accountClass: {
					countErr: false,
					countErr2: false,
					countSuccess: false,
				},
				nameClass: {
					nameErr: false,
					nameSuccess: false,
				},
				passwordClass: {
					passwordErr: false,
					passwordSuccess: false,
				},
				passwordRepeatClass: {
					passwordRepeatErr: false,
					passwordRepeatSuccess: false,
				}
			}
		},
		methods: {

			// 注册
			regist: function() {
				// 表单验证全部通过后执行
				if (this.cheakAccount() && this.cheakName() && this.cheakPassword() && this.cheakPasswordRepeat()) {
					this.$http.post('/app/register/', {
						"endata": this.user
					}).then((res) => {
						res = res.data;
						if (res.endata.su == 1) {
							this.$router.push('/login')
							this.$message({
								message: '注册成功',
								type: 'success'
							});
						} else {
							this.$message({
								message: '该账号已被注册',
								type: 'error'
							});
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},

			// 回到登陆页面
			gotoLogin: function() {
				this.animation.animation1 = false;
				this.animation.animation2 = true;
				setTimeout(() => {
					this.$router.push('login')
				}, 500)
			},

			// 表单验证
			cheakAccount: function() {
				let content = this.user.account;
				if (content != '') {
					if (content.length > 10 || content.length < 8) {
						this.accountClass.countErr = true;
						this.accountClass.countErr2 = false;
						this.accountClass.countSuccess = false;
						return false;
					} else {
						this.accountClass.countErr = false;
						this.accountClass.countErr2 = false;
						this.accountClass.countSuccess = true;
						return true;
					}
				} else {
					this.accountClass.countErr = false;
					this.accountClass.countErr2 = false;
					this.accountClass.countSuccess = false;
					return false;
				}
			},
			cheakName: function() {
				let name = this.user.nickname;
				if (name != '') {
					if (name.indexOf(" ") == -1) {
						this.nameClass.nameErr = false;
						this.nameClass.nameSuccess = true;
						return true;
					} else {
						this.nameClass.nameErr = true;
						this.nameClass.nameSuccess = false;
						return false;
					}
				} else {
					this.nameClass.nameErr = false;
					this.nameClass.nameSuccess = false;
					return false;
				}
			},
			cheakPassword: function() {
				let password = this.user.password;
				if (password != '') {
					if (password.length < 6) {
						this.passwordClass.passwordErr = true;
						this.passwordClass.passwordSuccess = false;
						return false;
					} else {
						this.passwordClass.passwordErr = false;
						this.passwordClass.passwordSuccess = true;
						return true;
					}
				} else {
					this.passwordClass.passwordErr = false;
					this.passwordClass.passwordSuccess = false;
					return false;
				}
			},
			cheakPasswordRepeat: function() {
				let passwordRepeat = this.user.passwordRepeat;
				let password = this.user.password;
				if (passwordRepeat != '') {
					if (passwordRepeat != password) {
						this.passwordRepeatClass.passwordRepeatErr = true;
						this.passwordRepeatClass.passwordRepeatSuccess = false;
						return false;
					} else {
						this.passwordRepeatClass.passwordRepeatErr = false;
						this.passwordRepeatClass.passwordRepeatSuccess = true;
						return true;
					}
				} else {
					this.passwordRepeatClass.passwordRepeatErr = false;
					this.passwordRepeatClass.passwordRepeatSuccess = false;
					return false;
				}
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 1920px;
		height: 1080px;
		position: relative;

		.content_bg {
			width: 100%;
			height: 100%;
			position: absolute;
		}

		img {
			z-index: -10;
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

		.container {
			position: absolute;
			animation-fill-mode: forwards;
			width: 45%;
			height: 75vh;
			background-color: rgba($color: #fff, $alpha: .7);
			top: 18%;
			right: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 1;

			.regist {
				width: 80%;
				text-align: center;
				border-bottom: 1px solid rgba($color: #5c544d, $alpha: 1.0);
				font-size: 75px;
				font-family: 'xingkai';
				color: rgba($color: #5c544d, $alpha: 1.0);
			}

			.warp {
				margin-top: 25px;
				width: 80%;
				height: 70%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.label {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 35px;
					font-family: 'xingkai';
					position: relative;

					span {
						display: flex;
						justify-content: flex-end;
						// display: inline-block;
						width: 22%;
						margin-right: 15px;
					}

					.input {
						width: 60%;
						height: 50px;
						outline: none;
						font-size: 25px;
						padding-left: 15px;
					}
				}



				.btn {
					width: 150px;
					height: 60px;
					border: 0px;
					background-color: rgba($color: #ccae88, $alpha: 1.0);
					color: white;
					font-size: 35px;
					cursor: pointer;
				}
			}

			.gotoRegist {
				position: absolute;
				left: 10%;
				bottom: 15%;
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
	}


	// 表单验证
	.countErr::after {
		content: "账号为8-10位的纯数字";
		font-size: 15px;
		position: absolute;
		color: red;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.countErr2::after {
		content: "账号已被注册";
		font-size: 15px;
		position: absolute;
		color: red;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.countSuccess::after {
		content: "账号可用";
		font-size: 15px;
		position: absolute;
		color: green;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.nameSuccess::after {
		content: "昵称可用";
		font-size: 15px;
		position: absolute;
		color: green;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.nameErr::after {
		content: "昵称不能包含空格";
		font-size: 15px;
		position: absolute;
		color: red;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.passwordErr::after {
		content: "密码不少于6位";
		font-size: 15px;
		position: absolute;
		color: red;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.passwordSuccess::after {
		content: "密码可用";
		font-size: 15px;
		position: absolute;
		color: green;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.passwordRepeatSuccess::after {
		content: "密码一致";
		font-size: 15px;
		position: absolute;
		color: green;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}

	.passwordRepeatErr::after {
		content: "两次密码不一致";
		font-size: 15px;
		position: absolute;
		color: red;
		font-family: '思源黑体';
		left: 24%;
		top: 60px;
	}




	// 动画
	.animation1 {
		animation: regist_move1 1s ease;
	}

	.animation2 {
		animation: regist_move2 1s ease;
	}

	@keyframes regist_move1 {
		0% {
			opacity: .2;
			transform: translateX(250px);
		}

		100% {
			opacity: 1;
			transform: translateX(0px);
		}
	}

	@keyframes regist_move2 {
		0% {
			opacity: 1;
			transform: translateX(0px);
		}

		100% {
			opacity: 0;
			transform: translateX(250px);
		}
	}
</style>
