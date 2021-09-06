<template>
	<div class="shop2_content" :class="classList">
		<div class="shop2">
			<!-- 背景图 -->
			<img :src="imgUrl.background" alt="" class="img">

			<div class="icon" @mousedown="close_down()" @mouseup="close_up()">
				<img :src="imgUrl.icon1" alt="" ref="close">
			</div>
			<div class="back" @click="goback()">
				<img :src="imgUrl.back" alt="">
			</div>
			<div class="next" @click="gonext()">
				<img :src="imgUrl.next" alt="">
			</div>

			<div class="name">兑换点</div>

			<!-- product list -->
			<div class="productList" :key="key.shopKey">
				<div class="cell" v-for="(item,index) in productList2" :key="index" v-show="isShow(index)"
					@click="select(index)">
					<img :src="item.url" alt="" class="cell_img">
					<div class="title">{{item.title}}</div>
				</div>
			</div>

			<!-- 点击物品弹框-->
			<div class="exchange" :class="classList" v-show="popupShow">
				<img :src="imgUrl.background2" alt="" class="exchange_img">
				<div class="icon">
					<div class="btn" @mousedown="closedown()" @mouseup="closeup()">
						<img :src="imgUrl.icon1" alt="" ref="btn">
					</div>
				</div>
				<div class="contain">
					<div class="top">
						<div class="left">
							<div class="xw_img">
								<img :src="imgUrl.xw">
							</div>
							<div class="ifxw">{{ifxw_1}}/1</div>
						</div>
						<div class="right">
							<div class="up">{{ifxw_2}}:</div>
							<div class="down">信物-{{xw_name}}</div>
						</div>
					</div>
					<div class="button" @click="change()">确 定</div>
				</div>
			</div>

			<div class="sellout" v-show="!this.productList2.length">
				<img :src="imgUrl.sellout" alt="">
			</div>

		</div>

		<productList2 ref="productList2"></productList2>
	</div>
</template>

<script>
	import productList2 from '../../../components/popuplist.vue'
	export default {
		components: {
			productList2,
		},
		props: ['name', 'state'],
		data() {
			return {
				key:{
					shopKey: 0,
				},
				imgUrl: {
					icon1: require('../../../assets/icon/close.png'),
					icon2: require('../../../assets/icon/close-press.png'),
					background: require('../../../assets/img/bg2.png'),
					background2: require('../../../assets/img/底2.jpg'),
					back: require('../../../assets/icon/left.png'),
					next: require('../../../assets/icon/right.png'),
					xw: require('../../../assets/img/xw-hz.png'),
					sellout: require('../../../assets/img/sellout.png')
				},
				classList: {
					come_in: true,
					come_out: false,
				},
				popupShow: false,

				page: 1,

				productList2: [],
				pride: 0,
				popuplist: [],
				selectList: [],


				//判断是否拥有所需信物，更改展示内容
				ifxw: false,
				ifxw_1: "0", //数量0/1
				ifxw_2: "缺少", //缺少/拥有
				xw_name: "画轴", //name
			}
		},
		methods: {
			// 关闭组件
			close_down: function() {
				this.$refs.close.src = this.imgUrl.icon2
			},
			close_up: function() {
				this.$refs.close.src = this.imgUrl.icon1
				this.classList.come_out = true
				this.classList.come_in = false
				setTimeout(() => {
					this.$emit('closeShop')
					this.classList.come_out = false
					this.classList.come_in = true
				}, 250)
			},

			select: function(index) {
				let data = this
				data.selectList = data.productList2[index];
				//判断是否拥有信物
				data.pride = data.productList2[index].pride;
				//查找背包
				let account = localStorage.getItem('account');
				this.$http.post('/app/user/', {
					"endata": {
						"action": "myitems",
						"account": account
					}
				}).then((res) => {
					res = res.data
					if (res.endata.items.includes(data.pride)) {
						//拥有该信物
						data.ifxw_1 = "1";
						data.ifxw_2 = "拥有";
						data.xw_name = data.$refs.productList2.popuplist[data.pride - 1].title
						data.imgUrl.xw = data.$refs.productList2.popuplist[data.pride - 1].url
						data.ifxw = true;
					} else {
						// 未拥有该信物
						data.ifxw_1 = "0";
						data.ifxw_2 = "缺少";
						data.xw_name = data.$refs.productList2.popuplist[data.pride - 1].title
						data.imgUrl.xw = data.$refs.productList2.popuplist[data.pride - 1].url
						data.ifxw = false;
					}
				})
				//打开弹框
				data.popupShow = true;
			},

			closedown: function() {
				this.$refs.btn.src = this.imgUrl.icon2
			},
			closeup: function() {
				this.$refs.btn.src = this.imgUrl.icon1
				this.popupShow = false
			},

			//翻页
			isShow(index) {
				return index >= (this.page - 1) * 6 && index < this.page * 6
			},
			gonext() {
				if (this.productList2.length > this.page * 6) {
					this.page++
				}
			},
			goback() {
				if (this.page > 1) {
					this.page--
				}
			},

			//交易
			change() {
				let account = localStorage.getItem('account')
				let data = this
				if (this.ifxw) {
					// 拥有信物，可以兑换
					data.$http.post('/app/user', {
						"endata": {
							"action": "newitem",
							"account": account,
							"item_id": data.selectList.id
						}
					}).then((res)=>{
						res = res.data.endata
						if(res.su == 1){
							// 交易成功
							this.popupShow = false
							data.$message({
								message: '兑换成功',
								type: 'success'
							})
							// 强制刷新商店和背包
							this.key.shopKey++
							this.$emit('forceRerender')
						}
					})
				} else {
					// 交易不成功
					data.$message({
						message: '信物尚未集齐',
					})
				}
			},



		},
		mounted() {
			let account = localStorage.getItem('account')
			let data = this
			// 获取商品列表
			this.productList2 = this.$refs.productList2.productList2

			this.popuplist = this.$refs.productList2.popuplist
			// 查看用户已拥有的物品，用户拥有后将不再展示该物品
			this.$http.post('/app/user', {
				"endata": {
					"action": "myitems",
					"account": account,
				}
			}).then((res) => {
				res = res.data.endata
				for (let i = 0; i < this.productList2.length; i++) {
					if (res.items.includes(this.productList2[i].id)) {
						this.productList2.splice(i, 1)
						i--
					}
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.shop2_content {
		width: 1920px;
		height: 1080px;
		background-color: rgba($color: #000000, $alpha: .5);
		position: absolute;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;

		.shop2 {
			position: absolute;
			width: 1536px;
			height: 864px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.icon {
				position: absolute;
				right: 100px;
				top: 120px;
				cursor: pointer;
				z-index: 9;

				img {
					pointer-events: none;
					width: 80%;
				}
			}

			.back {
				position: absolute;
				left: 195px;
				bottom: 120px;
				cursor: pointer;
				z-index: 9;

				&:hover {
					content: url(../../../assets/icon/left-press.png);
				}

				img {
					pointer-events: none;
					width: 100%;
				}
			}

			.next {
				position: absolute;
				right: 145px;
				bottom: 120px;
				cursor: pointer;
				z-index: 9;

				&:hover {
					content: url(../../../assets/icon/right-press.png);
				}

				img {
					pointer-events: none;
					width: 100%;
				}
			}


			.img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}

			.name {
				position: absolute;
				top: 290px;
				left: 90px;
				width: 8%;
				height: 30%;
				color: rgba($color: #7b5a44, $alpha: 1.0);
				font-size: 70px;
				font-family: 'xingkai';
				text-align: center;
			}


			.productList {
				position: absolute;
				top: 60px;
				left: 280px;
				width: 73%;
				height: 80%;
				padding: 15px;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				overflow: auto;

				.cell {
					position: relative;
					width: 22%;
					height: 304px;
					margin: 20px 45px;
					border: 2px solid rgba($color: #7b5a44, $alpha: 1.0);
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;

					.cell_img {
						position: absolute;
						height: 80%;
						max-width: 90%;
						object-fit: contain;
					}

					.title {
						position: absolute;
						width: 80px;
						height: 80px;
						bottom: 0;
						left: 0;
						background-color: rgba($color: #7b5a44, $alpha: 1.0);
						color: rgba($color: #e7e3d7, $alpha: 1.0);
						font-size: 65px;
						font-family: 'xingkai';
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

				.sellout {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;

					img {
						height: 70%;
					}
				}
			}

			.exchange {
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

				.exchange_img {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: -1;
					pointer-events: none;
				}

				.img {
					img {
						pointer-events: none;
					}
				}

				.icon {
					position: absolute;
					top: 20px;
					right: 5px;

					.btn {
						cursor: pointer;
						display: flex;

						img {
							pointer-events: none;
						}
					}
				}

				.contain {
					width: 100%;
					height: 100%;

					.top {
						width: 90%;
						height: 60%;
						position: absolute;
						top: 60px;
						left: 5%;
						display: flex;
						justify-content: space-around;
						align-items: center;

						.left {
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							align-items: center;

							.xw_img {
								width: 200px;
								height: 160px;
								background-color: #E7E3D7;
								border: #7b5a44 solid 3px;
								display: flex;
								justify-content: center;
								align-items: center;

								img {
									height: 100%;
								}
							}

							.ifxw {
								color: rgba($color: #7b5a44, $alpha: 1.0);
								font-size: 45px;
								font-family: 'xingkai';
								padding-top: 20px;
							}

						}

						.right {
							width: 45%;
							height: 60%;
							position: relative;
							font-family: 'xingkai';
							font-size: 45px;
							color: rgba($color: #786850, $alpha: 1.0);

							//background-color: aqua;
							.up {
								position: absolute;
								top: -15px;
								//left: 20px;
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

					.button {
						position: absolute;
						bottom: 55px;
						left: 35%;
						width: 30%;
						height: 70px;
						background-color: rgba($color: #7b5a44, $alpha: 1.0);
						color: rgba($color: #e7e3d7, $alpha: 1.0);
						font-size: 50px;
						font-family: 'xingkai';
						display: flex;
						justify-content: center;
						align-items: center;
						cursor: pointer;
					}
				}
			}


		}
	}

	.come_in {
		animation: appear .3s ease;
	}

	.come_out {
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
