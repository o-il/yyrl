<template>
	<div class="container" ref="container">
		<div class="content" ref="content">

			<!-- 背景图 -->
			<img :src="bgUrl" alt="" class="content_bg">

			<!-- building -->
			<!-- @click="gotoHouse(item.housename)" -->
			<div class="house" v-for="(item,index) in this.building" :key="index" :class="item.class" ref="builds">
				<img :src="item.houseUrl">
			</div>

			<!-- 装饰 -->
			<div class="decorate">
				<div class="people">
					<img :src="decorate[0]" alt="">

				</div>
				<div class="railing">
					<img :src="decorate[1]" alt="">
				</div>
				<div class="shelf1">
					<img :src="decorate[2]" alt="">
				</div>
				<div class="shelf2">
					<img :src="decorate[2]" alt="">
				</div>
				<div class="bigShelf">
					<img :src="decorate[3]" alt="">
				</div>
				<div class="tree1">
					<img :src="decorate[4]" alt="">
				</div>
				<div class="tree2">
					<img :src="decorate[5]" alt="">
				</div>
			</div>

			<!-- 工具栏 -->
			<div class="tools" @mousedown='clickdown()' @mouseup='clickup()'>
				<div class="item" v-for="(item,index) in this.tools" :key="index" :class="item.class"
					@mouseover="hover(index)" @click="click(index)" @mouseout="out(index)">
					<img :src="item.url" class="img" ref="img">
					<div class="text">{{item.text}}</div>
				</div>
			</div>

		</div>

		<!-- 背包 -->
		<Package @mousedown.native='clickdown()' @mouseup.native='clickup()' ref='bag' v-show="component.bagShow"
			bagShow='bagShow' @closeComponent="closeComponent"></Package>
		
		<!-- 个人中心 -->
		<My @mousedown.native='clickdown()' @mouseup.native='clickup()' ref='my' v-show="component.myShow"
			myShow='myShow' @closeComponent="closeComponent"></My>
			
		<!-- 排行榜 -->
		<List @mousedown.native='clickdown()' @mouseup.native='clickup()' ref='list' v-show="component.listShow"
			listShow='listShow' @closeComponent="closeComponent"></List>
		</div>
	</div>

</template>

<script>
	import Package from './component/package.vue'
	import My from './component/my.vue'
	import List from './component/list.vue'
	export default {
		components: {
			'Package': Package,
			'My': My,
			'List':List,
		},
		data() {
			return {
				component: {
					bagShow: false,
					myShow: false,
					listShow:false,
				},
				bgUrl: require("../assets/img/ground.png"),
				building: [{
						houseUrl: require('../assets/img/19-stage.png'),
						class: {
							house_1_1: true
						},
						housename:'stage'
					},
					{
						houseUrl: require("../assets/img/9-museum.png"),
						class: {
							house_1_2: true
						},
						housename:'museum'
					},
					{
						houseUrl: require("../assets/img/11-exchange1.png"),
						class: {
							house_1_3: true
						},
						housename:'shop'
					},
					{
						houseUrl: require("../assets/img/13-workshop.png"),
						class: {
							house_1_4: true
						},
						housename:'teach'
					},
					{
						houseUrl: require("../assets/img/8-viewing.png"),
						class: {
							house_1_5: true
						},
						housename:'viewing'
					},
					{
						houseUrl: require("../assets/img/29-costume.png"),
						class: {
							house_2_1: true
						},
						housename:''
					},
					{
						houseUrl: require("../assets/img/28-exchange2.png"),
						class: {
							house_2_2: true
						},
						housename:''
					},
					{
						houseUrl: require("../assets/img/23-pass.png"),
						class: {
							house_2_3: true
						},
						housename:'pass'
					},
					{
						houseUrl: require("../assets/img/26-instruments.png"),
						class: {
							house_2_4: true
						},
						housename:'musical'
					},
					{
						houseUrl: require("../assets/img/6-help.png"),
						class: {
							house_2_5: true
						},
						housename:'helpcenter'
					},
				],
				decorate: [
					require("../assets/img/31-stacticpeople.png"),
					require("../assets/img/14-fence1.png"),
					require("../assets/img/10-lantern1.png"),
					require("../assets/img/33-lantern3.png"),
					require("../assets/img/tree1.png"),
					require("../assets/img/7-trees3.png"),
				],
				tools: [{
						text: '背包',
						url: require('../assets/icon/bag.png'),
						url2: require('../assets/icon/bag-press.png'),
						class: {
							nocover: true,
								covered: false,
						},
					},
					{
						text: '排行榜',
						url: require('../assets/icon/list.png'),
						url2: require('../assets/icon/list-press.png'),
						class: {
							nocover: true,
								covered: false,
						},
					},
					{
						text: '我的',
						url: require('../assets/icon/personalcenter.png'),
						url2: require('../assets/icon/personalcenter-press.png'),
						class: {
							nocover: true,
								covered: false,
						},
					},
					{
						text: '0.00',
						url: require('../assets/icon/currency.png'),
						url2: require('../assets/icon/currency-press.png'),
						class: {
							doller: true,
								covered: false,
						},
					},
					{
						text: '开启',
						url: require('../assets/icon/sound-open.png'),
						url2: require('../assets/icon/sound-close.png'),
						class: {
							vioceOpen: true,
								vioce: true,
						},
					},

				],
				flag: true,
				f:true,
			}
		},
		methods: {
			// 点击房子跳转
			gotoHouse:function(house){
				this.$router.push(house)
			},
			
			
			// 鼠标经过
			hover: function(index) {
				if (index != 4) {
					this.$refs.img[index].src = this.tools[index].url2;
				}
			},

			// 鼠标离开
			out: function(index) {
				if (index != 4) {
					this.$refs.img[index].src = this.tools[index].url;
				}
			},

			// 鼠标点击
			click: function(index) {
				switch (index) {
					case 0:
						this.component.bagShow = true;
						break;
					case 1:
						this.component.listShow = true;
						break;
					case 2:
						this.component.myShow = true;
						break;
					case 3:
						break;
					case 4:
						if (this.tools[index].class.vioceOpen) {
							this.$refs.img[index].src = this.tools[index].url2;
							this.tools[index].class.vioceOpen = false;
							this.tools[index].text = '关闭';
						} else if (!this.tools[index].class.vioceOpen) {
							this.$refs.img[index].src = this.tools[index].url;
							this.tools[index].class.vioceOpen = true;
							this.tools[index].text = '开启';
						}
						break;
				}
			},

			// 不允许操作地图的元素
			clickdown: function() {
				this.flag = false
			},
			clickup: function() {
				this.flag = true
			},

			// 关闭组件
			closeComponent: function(index) {
				this.component[index] = false
			},
		},

		mounted() {
			// 获取用户信息
			let account = localStorage.getItem('account')
			this.$http.post('/app/user',{
				'endata':{
					"action":"integaladd",
					"account":account,
					"value":0
				}
			}).then((res)=>{
				res=res.data
				this.tools[3].text = res.endata.integral
			}).catch((err)=>{
				console.log(err)
			})
			
			
			
			
			// 添加鼠标按下时监听，控制视口移动
			this.$refs.container.addEventListener('mousedown', (e) => {
				if (!this.flag) {
					return
				}
				// 鼠标按下时所处位置
				let beginX = e.clientX
				let beginY = e.clientY

				// 上次鼠标所处位置
				let lastX = 0
				let lastY = 0

				const Mousemove = (e) => {
					// 此时鼠标移动时所处位置
					let movingX = e.clientX
					let movingY = e.clientY

					// 鼠标向左移动，视口向右移动
					if (movingX < beginX) {
						this.$refs.container.scrollLeft += beginX - movingX - lastX
						// 记录此次移动
						lastX = beginX - movingX
					} else if (movingX > beginX) {
						// 鼠标向右移动，视口向左移动
						this.$refs.container.scrollLeft -= movingX - beginX - lastX
						// 记录此次移动
						lastX = movingX - beginX
					}

					// 鼠标向上移动，视口向下移动
					if (movingY < beginY) {
						this.$refs.container.scrollTop += beginY - movingY - lastY
						// 记录此次移动
						lastY = beginY - movingY
					} else if (movingY > beginY) {
						// 鼠标向右移动，视口向左移动
						this.$refs.container.scrollTop -= movingY - beginY - lastY
						// 记录此次移动
						lastY = movingY - beginY
					}
				}

				const Mouseup = (e) => {
					// 移除监听
					this.$refs.container.removeEventListener('mousemove', Mousemove)
					this.$refs.container.removeEventListener('mouseup', Mouseup)
				}

				// 添加监听
				this.$refs.container.addEventListener('mousemove', Mousemove)
				this.$refs.container.addEventListener('mouseup', Mouseup)
			})

			this.$refs.container.addEventListener('mouseup', (e) => {
				this.flag = true
			})
			
			for(let i = 0;i<this.building.length;i++){
				this.$refs.builds[i].addEventListener('mousedown',(e)=>{
					const housemove = (e)=>{
						this.f = false
					}
					const houseup = (e)=>{
						if(this.f){
							setTimeout(()=>{
								this.gotoHouse(this.building[i].housename)
							},100)
						}
						this.f=true
						// 移除监听
						this.$refs.builds[i].removeEventListener('mousemove', housemove)
						this.$refs.builds[i].removeEventListener('mouseup', houseup)
					}
					this.$refs.builds[i].addEventListener('mousemove',housemove)
					this.$refs.builds[i].addEventListener('mouseup',houseup)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		overflow: scroll;
		.btn{
			position: absolute;
			top: 0;
		}
	}

	.content {
		width: 3840px;
		height: 1080px;
		overflow: hidden;
		position: relative;

		// 背景图
		.content_bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
		}

		// 建筑样式
		.house {
			position: absolute;
			cursor: pointer;
			transition: all .3s;

			img {
				pointer-events: none;
			}

			&:hover {
				transform: scale(1.05);
			}
		}

		.house_1_1 {
			top: 20px;
		}

		.house_1_2 {
			top: 30px;
			left: 700px;
		}

		.house_1_3 {
			top: 55px;
			left: 1450px;
			position: absolute;
			z-index: 1;
		}

		.house_1_4 {
			top: 30px;
			left: 2180px;
			position: absolute;
			z-index: 3;
		}

		.house_1_5 {
			top: -20px;
			right: 525px;
		}

		.house_2_1 {
			bottom: 175px;
			left: 300px;
		}

		.house_2_2 {
			bottom: 300px;
			left: 1000px;
		}

		.house_2_3 {
			bottom: 20px;
			left: 1400px;
			z-index: 6;
		}

		.house_2_4 {
			bottom: 30px;
			right: 1185px;
			z-index: 6;
		}

		.house_2_5 {
			bottom: 170px;
			right: 0px;
		}

		.decorate {
			width: 100%;
			height: 100%;
			position: relative;
			// 指针穿透
			pointer-events: none;

			.people {
				position: absolute;
				left: 300px;
				top: 200px;
				z-index: 5;
			}

			.railing {
				position: absolute;
				left: 400px;
			}

			.shelf1 {
				position: absolute;
				left: 1222px;
				top: 130px;
			}

			.shelf2 {
				position: absolute;
				left: 1950px;
				top: 100px;
				z-index: 2;
			}

			.bigShelf {
				position: absolute;
				bottom: 20px;
				left: 780px;
			}

			.tree1 {
				position: absolute;
				bottom: -300px;
				left: 1350px;
				z-index: 11;
			}

			.tree2 {
				position: absolute;
				bottom: 20px;
				right: 0px;
			}
		}

		.tools {
			display: flex;
			position: fixed;
			justify-content: space-around;
			bottom: 0;
			left: 0;
			width: 400px;
			height: 70px;
			background-color: rgba($color: #fff, $alpha: .5);
			z-index: 20;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 15px;
				cursor: pointer;
			}

			.img {
				width: 60%;
				transition: all .3;
				pointer-events: none;

				&:hover {
					transform: scale(1.08);
					// content: url('../assets/icon/bag.png');
				}
			}

			.vioce {
				.img {
					width: 50%;
				}

				.text {
					transform: translateY(3px);
				}
			}

		}
	}
</style>
