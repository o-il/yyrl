<template>
	<div class="museum_content">
		<!-- 背景图 -->
		<img :src="imgUrl.background[this.index].url" alt="" class="background" ref="background">
		
		<!-- 左图标 -->
		<div class="lefticon" @click="goleft()">
			<img :src="imgUrl.icon1" alt="">
		</div>
		
		<!-- 右图标 -->
		<div class="righticon lefticon" @click="goright()">
			<img :src="imgUrl.icon2" alt="">
		</div>
		
		<!-- btn -->
		<div class="btnicon" @click="show()">{{title[this.index]}}</div>
		
		<!-- History -->
		<History v-show="component.historyShow" @close="close"></History>
		
		<!-- Makeup -->
		<Makeup v-show="component.makeupShow" @close="close"></Makeup>
		
		<!-- Clothes -->
		<Clothes v-show="component.clothesShow" @close="close"></Clothes>
		
		<!-- 工具栏 -->
		<Tools :key="toolKey"></Tools>
		
		<!-- 红色胭脂盒 -->
		<div class="red" @click="getred()"></div>
		
		<!-- 黄色胭脂盒 -->
		<div class="yellow" @click="getyellow()"></div>
		
		<!-- 弹窗-胭脂盒 -->
		<div class="bag_content" :class="this.classList" v-show="component.isShow">
			<img :src="imgUrl.background2" alt="" class="bag_img">
			<div class="left">
				<img src="../../assets/img/xw-yzhong.png" v-show="component.popupShow">
				<img src="../../assets/img/xw-yzh.png" v-show="!component.popupShow">
			</div>
			<div class="mid" v-show="component.popupShow">
				<div class="up">恭喜您获得:</div>
				<div class="down">信物-红胭脂</div>
			</div>
			<div class="mid" v-show="!component.popupShow">
				<div class="up">恭喜您获得:</div>
				<div class="down">信物-黄胭脂</div>
			</div>
			<div class="right">
				<div class="btn" @mousedown="closedown()" @mouseup="closeup()">
					<img :src="imgUrl.icon3" alt="" ref="close">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import History from './component/history.vue'
	import Makeup from './component/makeup.vue'
	import Clothes  from './component/clothes .vue'
	export default {
		components:{
			Tools,
			Clothes,
			Makeup,
			History
		},
		data(){
			return{
				toolKey:0,
				classList: {
					appear: true,
					disAppear: false,
				},
				imgUrl:{
					background:[
						{
							url:require('../../assets/img/bwg-fs.png'),
						},
						{
							url:require('../../assets/img/bwg-ls.png'),
						},
						{
							url:require('../../assets/img/bwg-zr.png'),
						}
					],
					background2:require('../../assets/img/底2.jpg'),
					icon1:require('../../assets/icon/b.png'),
					icon2:require('../../assets/icon/n.png'),
					icon3:require('../../assets/icon/close.png'),
					icon4:require('../../assets/icon/close-press.png'),
				},
				index:1,
				component: {
					historyShow: false,
					makeupShow:false,
					clothesShow:false,
					popupShow:false,
					isShow:false,
				},
				descriptList:['clothesShow','historyShow','makeupShow'],
				title:['服饰','历史','妆容']
			}
		},
		methods:{
			goleft(){
				this.index = (this.index+2)%3
			},
			goright(){
				this.index = (this.index+1)%3
			},
			show(){
				this.component[this.descriptList[this.index]] = true
			},
			close(){
				this.component[this.descriptList[this.index]] = false
			},
			getred(){
				// 判断是否在妆容页面
				if(this.index == 2){
					// 查找该用户是否有此物品
					let account = localStorage.getItem('account')
					let data = this
					// 查找该用户是否有此物品
					this.$http.post('/app/user/', {
						"endata": {
							"action": "myitems",
							"account": account
						}
					}).then((res) => {
						res = res.data
						if (res.endata.items.includes(18)) {
							// 若有则return
							return
						} else {
							data.$http.post('/app/user/', {
								"endata": {
									"action": "newitem",
									"account": account,
									"item_id": 18
								}
							}).then((res) => {
								// 若无则弹窗出现
								if (res.data.endata.su == 1) {
									this.component.isShow = true
									this.component.popupShow = true
									// 强制刷新背包
									this.toolKey++
								}
							})
						}
					})
				}
			},
			getyellow(){
				// 判断是否在妆容页面
				if(this.index == 2){
					// 查找该用户是否有此物品
					let account = localStorage.getItem('account')
					let data = this
					// 查找该用户是否有此物品
					this.$http.post('/app/user/', {
						"endata": {
							"action": "myitems",
							"account": account
						}
					}).then((res) => {
						res = res.data
						if (res.endata.items.includes(20)) {
							// 若有则return
							return
						} else {
							data.$http.post('/app/user/', {
								"endata": {
									"action": "newitem",
									"account": account,
									"item_id": 20
								}
							}).then((res) => {
								// 若无则弹窗出现
								if (res.data.endata.su == 1) {
									this.component.isShow = true
									this.component.popupShow = false
									// 强制刷新背包
									this.toolKey++
								}
							})
						}
					})
				}
			},
			
			// 弹窗关闭
			closedown: function() {
				this.$refs.close.src = this.imgUrl.icon4
			},
			closeup: function() {
				this.$refs.close.src = this.imgUrl.icon3
				this.classList.appear = false
				this.classList.disAppear = true
				setTimeout(() => {
					this.component.isShow = false
					this.classList.appear = true
					this.classList.disAppear = false
				}, 200)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.museum_content{
		width: 1920px;
		height: 969px;
		overflow: hidden;
		position: relative;
		
		.background{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			pointer-events: none;
		}
		
		// 信物
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
			justify-content: center;
		
			.bag_img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}
		
			.left {
				width: 40%;
				display: flex;
				justify-content: center;
		
				img {
					pointer-events: none;
				}
			}
		
			.mid {
				width: 50%;
				height: 30%;
				font-family: 'xingkai';
				font-size: 40px;
				color: rgba($color: #786850, $alpha: 1.0);
				position: relative;
		
				.up {
					position: absolute;
					left: 20px;
				}
		
				.down {
					position: absolute;
					bottom: 0;
					right: 80px;
				}
			}
		
			.right {
				width: 15%;
				height: 90%;
		
				.btn {
					cursor: pointer;
					margin-top: 20px;
		
					img {
						pointer-events: none;
					}
				}
			}
		}
		
		.lefticon{
			position: absolute;
			width: 110px;
			height: 110px;
			top: 50%;
			transform: translateY(-50%);
			background-color: rgba($color: #e2dace, $alpha: .6);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			img{
				width: 70%;
				pointer-events: none;
				transform: translateX(-5px);
			}
		}
		.righticon{
			right: 0;
			img{
				transform: translateX(5px);
			}
		}
		.btnicon{
			position: absolute;
			width: 250px;
			height: 80px;
			background-color: rgba($color: #e2dace, $alpha: 1);
			top: 50%;
			transform: translate(-50%,-50%);
			left: 50%;
			font-size: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: 'xingkai';
			color: rgba($color: #7b5a44, $alpha: 1);
			border: 2px solid rgba($color: #7b5a44, $alpha: 1);;
			cursor: pointer;
		}
		.red{
			width: 150px;
			height: 150px;
			position: absolute;
			left: 500px;
			top: 400px;
		}
		.yellow{
			width: 150px;
			height: 150px;
			position: absolute;
			right: 540px;
			top: 400px;
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
