<template>
	<div class="shop_content" :class="classList">
		<div class="shop">
			<!-- 背景图 -->
			<img :src="imgUrl.background" alt="" class="img">
			
			<div class="icon" @mousedown="close_down()" @mouseup="close_up()">
				<img :src="imgUrl.icon1" alt="" ref="close">
			</div>
			
			<!-- product list -->
			<div class="productList">
				<div class="cell" v-for="(item,index) in productList" :key="index" @click="select(index)">
					<img :src="item.url" alt="" class="cell_img">
					<div class="title">{{item.title}}</div>
					<img :src="imgUrl.icon3" alt="" class="select" v-show="item.isSelect">
				</div>
				<div class="cart">
					<img :src="imgUrl.background1" alt="" class="background1">
					<div class="row">
						<div class="row1">
							我的积分:
							<span>{{mymoney}}</span>
						</div>
						<div class="row2">
							需要积分:
							<span>{{pride}}</span>
						</div>
						<div class="row3" v-show="this.pride - this.mymoney > 0">! 积分不足</div>
					</div>
					<div class="col">
						<div class="col1" @click="change()">兑换</div>
						<div class="col2" @click="cancel()">取消</div>
					</div>
				</div>
				<div class="sellout" v-show="!this.productList.length">
					<img :src="imgUrl.sellout" alt="">
				</div>
			</div>
		</div>
		
		<productList ref="productList"></productList>
	</div>
</template>

<script>
	import productList from '../../../components/popuplist.vue'
	export default {
		components:{
			productList
		},
		props: ['name', 'state'],
		data() {
			return {
				imgUrl: {
					icon1: require('../../../assets/icon/close.png'),
					icon2: require('../../../assets/icon/close-press.png'),
					icon3: require('../../../assets/icon/xz.png'),
					background: require('../../../assets/img/bg2.png'),
					background1:require('../../../assets/img/底2.jpg'),
					sellout:require('../../../assets/img/sellout.png')
				},
				classList: {
					come_in: true,
					come_out: false
				},
				
				productList:[],
				pride:0,
				selectList:[],
				mymoney:0,
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
				}, 400)
			},
			
			// 选择商品
			select(index){
				if(this.productList[index].isSelect){
					this.pride = this.pride - this.productList[index].pride
					// 将商品id从数组中删除
					let item = this.selectList.indexOf(this.productList[index].id);
					this.selectList.splice(item, 1);
				}else{
					this.pride = this.pride + this.productList[index].pride
					// 将商品id添加到数组中
					this.selectList.push(this.productList[index].id)
				}
				this.productList[index].isSelect = !this.productList[index].isSelect
			},
			
			// 尝试交易
			change(){
				// 判断钱是否足够购买
				if(!(this.pride - this.mymoney > 0)&&this.selectList.length>0){
					let account = localStorage.getItem('account')
					let data = this
					// 先扣钱
					this.$http.post('/app/user',{
						"endata":{
							"action":"integaladd",
							"account":account,
							"value":data.pride*(-1)
						}
					}).then((res)=>{
						// 更新积分数据
						res=res.data
						data.mymoney = res.endata.integral
						// 更新物品数据
						data.$http.post('/app/user',{
							"endata":{
								"action":"newitem",
								"account":account,
								"item_id":data.selectList
							}
						}).then((res)=>{
							// 重新渲染商品
							this.$emit('forceRerender')
							this.$message({
								message: '购买成功',
								type: 'success'
							});
						})
					
					})
				}else{
					console.log('交易未进行')
				}
			},
			
			// 取消交易
			cancel(){
				this.pride = 0
				for(let i=0;i<this.productList.length;i++){
					if(this.selectList.includes(this.productList[i].id)){
						this.productList[i].isSelect=false
					}
				}
				this.selectList = []
			}
		},
		mounted(){
			let account = localStorage.getItem('account')
			let data = this
			// 获取商品列表
			this.productList = this.$refs.productList.productList
			// 查看用户已拥有的物品，用户拥有后将不再展示该物品
			this.$http.post('/app/user',{
				"endata":{
					"action":"myitems",
					"account":account,
				}
			}).then((res)=>{
				res=res.data.endata
				for(let i=0;i<this.productList.length;i++){
					if(res.items.includes(this.productList[i].id)){
						this.productList.splice(i,1)
						i--
					}
				}
			})
			// 获取用户目前的积分
			this.$http.post('/app/user',{
				"endata":{
					"action":"integaladd",
					"account":account,
					"value":0
				}
			}).then((res)=>{
				res=res.data
				data.mymoney = res.endata.integral
			})
		}
	}
</script>

<style lang="scss" scoped>
	.shop_content {
		width: 1920px;
		height: 1080px;
		background-color: rgba($color: #000000, $alpha: .5);
		position: absolute;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.shop {
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
			
			.productList{
				width: 70%;
				height: 80%;
				padding: 15px;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				overflow: auto;
				.cart{
					position: fixed;
					width: 450px;
					height: 150px;
					transform: translate(650px,480px);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.background1{
						width: 100%;
						position: absolute;
						z-index: -1;
					}
					.row{
						color: rgba($color: #7b5a44, $alpha: 1.0);
						font-size: 35px;
						font-family: 'xingkai';
						span{
							display: inline-block;
							width: 150px;
							height: 30px;
							border: 1px solid rgba($color: #7b5a44, $alpha: 1.0);
							margin-left: 15px;
							text-align: center;
							line-height: 35px;
						}
						div{
							margin-bottom: 18px;
						}
						.row1{
							
						}
						.row2{
							margin-bottom: 8px;
						}
						.row3{
							color: rgba($color: #ff0000, $alpha: 1.0);
							font-size: 25px;
							margin-bottom: 8px;
						}
					}
					.col{
						display: flex;
						width: 70%;
						justify-content: space-between;
						div{
							width: 130px;
							height: 50px;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: rgba($color: #7b5a44, $alpha: 1.0);
							color: rgba($color: #e7e3d7, $alpha: 1.0);
							font-size: 35px;
							font-family: 'xingkai';
							cursor: pointer;
						}
						.col1{
							
						}
						.col2{
							
						}
					}
				}
				.cell{
					position: relative;
					width: 26%;
					height: 350px;
					margin-top: 45px;
					margin-right: 60px;
					border: 2px solid rgba($color: #7b5a44, $alpha: 1.0);
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					.cell_img{
						position: absolute;
						height: 80%;
						max-width: 90%;
						object-fit: contain;
					}
					.title{
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
					.select{
						position: absolute;
						right: -50px;
						top: -50px;
						width: 100px;
					}
				}
				.sellout{
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					img{
						height: 70%;
					}
				}
			}
			
			.icon {
				position: absolute;
				right: 100px;
				top: 120px;
				cursor: pointer;
			
				img {
					pointer-events: none;
					width: 80%;
				}
			}
			
			.img {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				pointer-events: none;
			}
		
			
		}
	}
	
	.come_in {
		animation: appear .5s ease;
	}
	
	.come_out {
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
