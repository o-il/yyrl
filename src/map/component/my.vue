<template>
	<div class="my_content" :class="this.classList">
		<img :src="bgUrl" alt="" class="my_img">
		<div class="up">
			<div class="left">
				<div class="contentup">
					<div class="contentleft">
						<img :src="mydata.avatarimg">
					</div>
					<div class="contentright">
						<div class="name">昵称：{{mydata.nickname}}</div>
						<div class="account">账号：{{mydata.account}}</div>
					</div>
				</div>
				<div class="contentdown">
					已获称号：{{mydata.title}}
				</div>
			</div>
			<div class="right" @mousedown="closedown()" @mouseup="closeup()">
				<img :src="iconUrl" alt="">
			</div>
		</div>
		<div class="down">
			<div class="btn" @click="exit()">
				退出
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['myShow'],
		data() {
			return {
				classList:{
					comeAppear:true,
					disappear:false
				},
				iconUrl: require('../../assets/icon/close.png'),
				bgUrl: require('../../assets/img/底2.jpg'),
				mydata:{
					account:'',
					avatarimg:'',
					nickname:'',
					integral:'',
					title:'初学者'
				}
			}
		},
		mounted() {
			let account = localStorage.getItem('account')
			this.$http.post('/app/user',{
				 "endata":{
					"action":"userinfo",
					"account":account,
				}
			}).then((res)=>{
				res=res.data
				this.mydata.account = res.endata.userdata.account
				this.mydata.avatarimg = res.endata.userdata.avatarimg
				this.mydata.nickname = res.endata.userdata.nickname
				this.mydata.integral = res.endata.userdata.integral
				this.mydata.title = (function(){
					if(res.endata.userdata.rank<4){return '鹤立鸡群'}
					else if(res.endata.userdata.rank<11){return '天赋异禀'}
					else if(res.endata.userdata.rank<21){return '初露峥嵘'}
					else{return '普普通通'}
				})()
			})
		},
		methods:{
			exit:function(){
				this.$store.commit('$_removeStorage'); // 清除登录信息
				this.$router.push('/login');
				this.$message({
					message: '退出成功',
					type:'success'
				});
			},
			closedown: function() {
				this.iconUrl = require('../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.iconUrl = require('../../assets/icon/close.png')
				this.classList.comeAppear = false
				this.classList.disappear = true
				setTimeout(()=>{
					// 关闭组件
					this.$emit('closeComponent',this.myShow)
					this.classList.comeAppear = true
					this.classList.disappear = false
				},400)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_content {
		position: fixed;
		width: 854px;
		height: 482px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		display: flex;
		flex-direction: column;
		align-items: center;

		.my_img {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}
		.up{
			width: 100%;
			height: 75%;
			display: flex;
			justify-content: space-between;
			.left{
				flex: 1;
				padding: 60px;
				.contentup{
					display: flex;
					.contentleft{
						width: 120px;
						height: 120px;
						border-radius: 50%;
						border: 4px solid rgba($color: #dcc098, $alpha: 1.0);
					}
					
					.contentright{
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						font-family: 'xingkai';
						color: rgba($color: #dcc098, $alpha: 1.0);
						padding-left: 50px;
						.name{
							font-size: 50px;
						}
						.account{
							font-size: 30px;
						}
					}
				}
				.contentdown{
					margin-top: 30px;
					font-size: 30px;
					font-family: 'xingkai';
					color: rgba($color: #978262, $alpha: 1.0);
				}
			}
			.right{
				width: 15%;
				padding-top: 15px;
				height: 30%;
				cursor: pointer;
				img{
					margin-left: 15px;
					pointer-events: none;
				}
			}
		}
		.down{
			flex: 1;
			width: 93%;
			border-top: 1px solid rgba($color: #dcc098, $alpha: 1.0);
			display: flex;
			justify-content: center;
			align-items: center;
			.btn{
				width: 200px;
				height: 70px;
				transform: translateY(-10%);
				background-color: rgba($color: #dcc098, $alpha: 1.0);
				font-size: 50px;
				font-family: 'xingkai';
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
		}
	}
	
	
	// 过渡动画
	.comeAppear {
		animation: appear .5s ease;
	}
	.disappear {
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
