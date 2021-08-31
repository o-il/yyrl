<template>
	<div class="content">
		<!-- 工具栏 -->
		<div class="tools">
			<div class="item" v-for="(item,index) in this.tools" :key="index" :class="item.class"
				@mouseover="hover(index,item.name)" @click="click(index,item.name)" @mouseout="out(index,item.name)">
				<img :src="item.url" class="img" ref="img">
				<div class="text">{{item.text}}</div>
			</div>
		</div>
		
		<!-- 背包 -->
		<Package ref='bag' v-show="component.bagShow"
			bagShow='bagShow' @closeComponent="closeComponent"></Package>
		
		<!-- 个人中心 -->
		<My ref='my' v-show="component.myShow"
			myShow='myShow' @closeComponent="closeComponent"></My>
			
		<!-- 排行榜 -->
		<List ref='list' v-show="component.listShow"
			listShow='listShow' @closeComponent="closeComponent"></List>
		</div>
		
	</div>
</template>

<script>
	import Package from '../component/package.vue'
	import My from '../component/my.vue'
	import List from '../component/list.vue'
	export default {
		components: {
			'Package': Package,
			'My': My,
			'List':List,
		},
		data(){
			return{
				component: {
					bagShow: false,
					myShow: false,
					listShow:false,
				},
				tools: [{
						name:'背包',
						text: '背包',
						url: require('../../assets/icon/bag.png'),
						url2: require('../../assets/icon/bag-press.png'),
						class: {
							nocover: true,
								covered: false,
						},
					},
					{
						name:'排行榜',
						text: '排行榜',
						url: require('../../assets/icon/list.png'),
						url2: require('../../assets/icon/list-press.png'),
						class: {
							nocover: true,
								covered: false,
						},
					},
					{
						name:'我的',
						text: '我的',
						url: require('../../assets/icon/personalcenter.png'),
						url2: require('../../assets/icon/personalcenter-press.png'),
						class: {
							nocover: true,
								covered: false,
						},
					},
					{
						name:'积分',
						text: '0.00',
						url: require('../../assets/icon/currency.png'),
						url2: require('../../assets/icon/currency-press.png'),
						class: {
							doller: true,
								covered: false,
						},
					},
					{
						name:'返回',
						text: '返回',
						url: require('../../assets/icon/home.png'),
						url2: require('../../assets/icon/home-press.png'),
						class: {
							doller: true,
								covered: false,
						},
					},
					{
						name:'声音',
						text: '开启',
						url: require('../../assets/icon/sound-open.png'),
						url2: require('../../assets/icon/sound-close.png'),
						class: {
							vioceOpen: true,
								vioce: true,
						},
					},
				
				],
			}
		},
		methods:{
			// 工具栏动画
			// 鼠标经过
			hover: function(index,name) {
				if (name != '声音') {
					this.$refs.img[index].src = this.tools[index].url2;
				}
			},
			
			// 鼠标离开
			out: function(index,name) {
				if (name != '声音') {
					this.$refs.img[index].src = this.tools[index].url;
				}
			},
			
			// 鼠标点击
			click: function(index,name) {
				switch (name) {
					case '背包':
						this.component.bagShow = true;
						break;
					case '排行榜':
						this.component.listShow = true;
						break;
					case '我的':
						this.component.myShow = true;
						break;
					case '积分':
						break;
					case '返回':
						this.$router.push('/map');
						break;
					case '声音':
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
			// 关闭组件
			closeComponent: function(index) {
				this.component[index] = false
			},
		},
		mounted(){
			let account = localStorage.getItem('account')
			this.$http.post('/app/user',{  
				"endata":{
					"action":"integaladd",
					"account":account,
					"value":0
				},
			}).then((res)=>{
				res=res.data
				if(res.endata.su){
					this.tools[3].text = res.endata.integral
				}
			})
		},
		
	}
</script>

<style lang="scss" scoped>
	.content{
		.tools {
			display: flex;
			position: absolute;
			justify-content: space-around;
			bottom: 0;
			left: 0;
			width: 450px;
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
