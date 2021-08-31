<template>
	<div class="list_content" :class="this.classList">
		<img :src="bgUrl" alt="" class="list_img">
		<div class="close" @mousedown="closedown()" @mouseup="closeup()">
			<img :src="iconUrl" alt="">
		</div>
		<div class="top">
			<div class="rank">排名</div>
			<div class="user">用户</div>
			<div class="title">称号</div>
			<div class="integral">积分</div>
		</div>
		<div class="warp">
			<div class="list_item" v-for="(item,index) in dataList" :key="index">
				<div class="rank">{{item.rank}}</div>
				<!-- <div class="img"><img :src="item.img"></div> -->
				<div class="user">{{item.user}}</div>
				<div class="title">{{item.title}}</div>
				<div class="integral">{{item.integral}}</div>
			</div>
		</div>
		<div class="myPosition">
				<div class="rank">{{mydata.rank}}</div>
				<!-- <div class="img"><img :src="item.img"></div> -->
				<div class="user">{{mydata.user}}</div>
				<div class="title">{{mydata.title}}</div>
				<div class="integral">{{mydata.integral}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['listShow'],
		data() {
			return {
				classList: {
					comeAppear: true,
					disappear: false
				},
				iconUrl: require('../../assets/icon/close.png'),
				bgUrl: require('../../assets/img/bg2.png'),
				dataList: [],
				mydata: {}
			}
		},
		methods: {
			closedown: function() {
				this.iconUrl = require('../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.iconUrl = require('../../assets/icon/close.png')
				this.classList.comeAppear = false
				this.classList.disappear = true
				setTimeout(() => {
					// 关闭组件
					this.$emit('closeComponent', this.listShow)
					this.classList.comeAppear = true
					this.classList.disappear = false
				}, 400)
			},
		},
		mounted(){
			let account = localStorage.getItem('account')
			let data = this
			this.$http.post('/app/user',{
				"endata":{
					"action": "rank",
					"account": account
				}
			}).then((res)=>{
				res = res.data.endata
				// 数据获取
				for(let i=0;i<res.rankdata.length;i++){
					let item = {
						rank: res.rankdata[i].rank,
						img: '',
						user: res.rankdata[i].nickname,
						title: (function(){
						if(res.rankdata[i].rank<4){return '鹤立鸡群'}
						else if(res.rankdata[i].rank<11){return '天赋异禀'}
						else if(res.rankdata[i].rank<21){return '初露峥嵘'}
						else{return '普普通通'}
					})(),
						integral: res.rankdata[i].integral,
					};
					data.dataList.push(item);
				}
				
				let item = {
					rank: res.my.rank,
					img: '',
					user: res.my.nickname,
					title: (function(){
						if(res.my.rank<4){return '鹤立鸡群'}
						else if(res.my.rank<11){return '天赋异禀'}
						else if(res.my.rank<21){return '初露峥嵘'}
						else{return '普普通通'}
					})(),
					integral: res.my.integral,
				};
				data.mydata = item;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.list_content {
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
		justify-content: center;

		.list_img {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}

		.close {
			position: absolute;
			right: 25px;
			top: 55px;
			cursor: pointer;

			img {
				width: 60%;
				pointer-events: none;
			}
		}

		.top {
			width: 70%;
			height: 45px;
			background-color: rgba($color: #7b5a43, $alpha: 1.0);
			display: flex;
			justify-content: space-between;

			div {
				width: 100px;
				height: 100%;
				// background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24px;
				font-family: 'xingkai';
				color: white;

			}
		}

		.warp {
			width: 70%;
			height: 50%;
			overflow: auto;
			position: relative;

			.list_item {
				display: flex;
				justify-content: space-between;
				height: 50px;
				width: 100%;

				div {
					width: 100px;
					height: 100%;
					// background-color: red;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24px;
					font-family: 'xingkai';
					color: rgba($color: #7b5a43, $alpha: 1.0);
				}
			}
		}

		.myPosition {
			height: 12%;
			border-top:3px solid rgba($color: #7b5a43, $alpha: 1.0) ;
			width: 70%;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			div{
				width: 100px;
				height: 70%;
				display: flex;
				justify-content: center;
				font-size: 24px;
				font-family: 'xingkai';
				color: rgba($color: #7b5a43, $alpha: 1.0);
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
