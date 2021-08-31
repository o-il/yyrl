<template>
	<div class="bag_content" :class="this.classList">
		<img :src="bgUrl" alt="" class="bag_img">

		<!-- 标题 -->
		<div class="left">
			<div class="title">
				背包
			</div>
		</div>

		<!-- 背包中的物品 -->
		<div class="mid">
			<div class="warp">
				<div class="cell" v-for="(item,index) in goods" :key="index"  v-show="isShow(index)">
					<img :src="item.url" alt="">
				</div>
			</div>

		</div>

		<!-- 关闭按钮 -->
		<div class="right">
			<div class="up" @mousedown="closedown()" @mouseup="closeup()">
				<img :src="goback" alt="">
			</div>
			<div class="down">
				<div class="forword" @click="goforword()">
					<img :src="forword" alt="">
				</div>
				<div class="next" @click="gonext()">
					<img :src="next" alt="" class="next">
				</div>
			</div>
		</div>
		
		<!-- 物品列表 -->
		<Popuplist ref="Popuplist"></Popuplist>
	</div>
</template>

<script>
	import Popuplist from "../../components/popuplist.vue"
	export default {
		// 引入父组件传过来的值
		props: ['bagShow'],
		components: {
			Popuplist
		},
		data() {
			return {
				classList: {
					comeAppear: true,
					disappear: false
				},
				bgUrl: require('../../assets/img/底2.jpg'),
				goback: require('../../assets/icon/close.png'),
				next: require('../../assets/icon/right.png'),
				forword: require('../../assets/icon/left.png'),
				goods: [],
				popuplist:[],
				page:1,
			}
		},
		methods: {
			closedown: function() {
				this.goback = require('../../assets/icon/close-press.png')
			},
			closeup: function() {
				this.goback = require('../../assets/icon/close.png')
				this.classList.comeAppear = false
				this.classList.disappear = true
				setTimeout(() => {
					// 关闭组件
					this.$emit('closeComponent', this.bagShow)
					this.classList.comeAppear = true
					this.classList.disappear = false
				}, 400)
			},
			isShow(index){
				return index >= (this.page-1)*9 && index < this.page*9
			},
			gonext(){
				if(this.goods.length>this.page*9){
					this.page++
				}
			},
			goforword(){
				if(this.page>1){
					this.page--
				}
			}
		},
		mounted() {
			let account = localStorage.getItem('account')
			let data = this
			this.popuplist = this.$refs.Popuplist.popuplist
			this.$http.post('/app/user', {
				"endata": {
					"action": "myitems",
					"account": account
				}
			}).then((res) => {
				res = res.data
				for (let i = 0; i < res.endata.items.length; i++) {
					let id = res.endata.items[i]
					let item = {
						url: data.popuplist[id-1].url
					}
					data.goods.push(item)
				}
				if(data.goods.length%9!=0||data.goods.length==0){
					let length = 9-data.goods.length%9
					for(let i=0;i<length;i++){
						let item = {
							url:''
						}
						data.goods.push(item)
					}
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.bag_content {
		position: fixed;
		width: 854px;
		height: 482px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		display: flex;
		align-items: center;

		.bag_img {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}

		.left {
			height: 100%;
			width: 18%;

			.title {
				width: 70px;
				height: 130px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-family: 'xingkai';
				color: white;
				font-size: 50px;
				writing-mode: vertical-lr;
				background-color: rgba($color: #947e6a, $alpha: 1.0);
				margin-top: 60px;
				margin-left: 40px;

			}
		}

		.mid {
			flex: 1;
			height: 100%;
			// background-color: rgba($color: #ffff00, $alpha: .5);
			display: flex;
			justify-content: center;
			align-items: center;

			.warp {
				width: 100%;
				height: 80%;
				display: flex;
				flex-wrap: wrap;
				
			}
			
			.warp .cell:nth-child(3n+3){
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 100%;
					width: 100%;
					height: 100%;
					border-left: 1px solid rgba($color: #dcc098, $alpha: 1.0);
					border-bottom: 1px solid rgba($color: #dcc098, $alpha: 1.0);
				}
			}
			
			.warp .cell:nth-child(9n+7){
				border-bottom: 0px;
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 100%;
					width: 100%;
					height: 100%;
					border-left: 1px solid rgba($color: #dcc098, $alpha: 1.0);
					border-bottom: 0px;
				}
			}
			.warp .cell:nth-child(9n+8){
				border-bottom: 0px;
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 100%;
					width: 100%;
					height: 100%;
					border-left: 1px solid rgba($color: #dcc098, $alpha: 1.0);
					border-bottom: 0px;
				}
			}
			.warp .cell:nth-child(9n+9){
				border-bottom: 0px;
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 100%;
					width: 100%;
					height: 100%;
					border-left: 1px solid rgba($color: #dcc098, $alpha: 1.0);
					border-bottom: 0px;
				}
			}
			
			.cell {
				width: 25%;
				height: 33%;
				position: relative;
				border-left: 1px solid rgba($color: #dcc098, $alpha: 1.0);
				border-bottom: 1px solid rgba($color: #dcc098, $alpha: 1.0);
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					max-height: 90%;
					max-width: 90%;
					object-fit: contain;
				}
			}
		}

		.right {
			height: 90%;
			width: 15%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			// background-color: rgba($color: #ffff00, $alpha: .5);
			position: relative;
			z-index: 12;

			.up {
				cursor: pointer;
			}

			.down {
				width: 200%;
				display: flex;
				margin-right: 75px;

				img {
					width: 38%;
				}

				.forword {
					cursor: pointer;

					&:hover {
						content: url(../../assets/icon/left-press.png);
					}
					img{
						width: 100%;
					}
				}

				.next {
					cursor: pointer;
					img{
						width: 100%;
					}
					&:hover {
						content: url(../../assets/icon/right-press.png);
					}
				}
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
