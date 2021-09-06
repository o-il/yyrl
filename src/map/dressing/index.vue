<template>
	<div class="dress_content">

		<!-- 背景图片 -->
		<img :src="imgUrl.background" alt="" class="background">

		<!-- begin -->
		<div class="begin" v-show="isShow.beginShow">
			<img :src="imgUrl.background2" class="background2">
			<div class="title">{{text.begin.title}}</div>
			<div class="text">{{text.begin.content}}</div>
			<div class="btn" @click="begin()">开始游戏</div>
		</div>

		<!-- game -->
		<div class="game" v-show="!isShow.beginShow" :class="classList">
			<div class="girl">
				<!-- body -->
				<img :src="imgUrl.body" alt="" class="body">
				<!-- head -->
				<img :src="head[current.headIndex].url" alt="" class="head" :class="sethead(this.head[current.headIndex].id)">
				<!-- face -->
				<img :src="face[current.faceIndex].url" alt="" class="face"  :class="setface(this.face[current.faceIndex].id)">
				<!-- clothes -->
				<img :src="clothes[current.clothesIndex].url" alt="" class="clothes" :class="setclothes(this.clothes[current.clothesIndex].id)">
			</div>
			<div class="game_right">
				<div class="tool">
					<div class="head tools" @click="setTypeIndex(0)" ref="clothes"
						:class="{seleted:current.typeIndex==0}">发</div>
					<div class="face tools" @click="setTypeIndex(1)" ref="clothes"
						:class="{seleted:current.typeIndex==1}">面</div>
					<div class="clothes tools" @click="setTypeIndex(2)" ref="clothes"
						:class="{seleted:current.typeIndex==2}">衣</div>
					<div class="complete tools" @click="complete()">完 成</div>
				</div>
				<div class="right">
					<div class="clothes">
						<div class="icon icon_left" @click="previousClothes()">
							<img src="../../assets/icon/b.png">
						</div>
						<div class="icon icon_right" @click="nextClothes()">
							<img src="../../assets/icon/n.png">
						</div>
						<img :src="head[current.headIndex].url" class="myclothes" v-show="current.typeIndex%3==0">
						<img :src="face[current.faceIndex].url" class="myclothes" v-show="current.typeIndex%3==1">
						<img :src="clothes[current.clothesIndex].url" class="myclothes" v-show="current.typeIndex%3==2">
					</div>
					<div class="subtitle">题目：{{subject[current.index-1].title}}</div>
				</div>
			</div>
		</div>

		<!-- 工具栏 -->
		<Tools></Tools>

		<!-- 物品表 -->
		<productList ref="productList"></productList>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	import productList from '../../components/popuplist.vue'
	export default {
		components: {
			Tools,
			productList
		},
		data() {
			return {
				imgUrl: {
					background: require('../../assets/img/dress/0.png'),
					background2: require('../../assets/img/bg2.png'),
					body: require('../../assets/img/dress/t.png'),
				},
				text: {
					begin: {
						title: '化妆间',
						content: `请根据所给的题目，搭配出合适的服饰
例如：祝英台--《梁山伯与祝英台》--花旦
那么便要给出花符合花旦的服饰`,
					},
				},
				isShow: {
					beginShow: true,
				},
				// 题目
				subject: [
					{
						title: "祝英台",
						type:"花旦",
					},
					{
						title: "梁山伯",
						type:"小生",
					},
					{
						title: "王秀英",
						type:"花旦",
					},
					{
						title: "张君瑞",
						type:"小生",
					},
					{
						title: "贾母",
						type:"老旦",
					},
					{
						title: "吕布",
						type:"小生",
					},
					{
						title: "楚王",
						type:"老生",
					},
					{
						title: "红娘",
						type:"花旦",
					},
					{
						title: "赵祯",
						type:"小生",
					},
					{
						title: "王玉林",
						type:"小生",
					},
					{
						title: "刘兰芝",
						type:"花旦",
					},
					{
						title: "魏虎",
						type:"老生",
					},
					{
						title: "杜十娘",
						type:"花旦",
					},
					{
						title: "崔夫人",
						type:"老旦",
					},
				],
				// 用户拥有的衣服
				head: [{
					url: require('../../assets/img/dress/t0.png'),
					id: 0
				}],
				face: [{
					url: require('../../assets/img/dress/hdz0.png'),
					id: 0
				}],
				clothes: [{
					url: require('../../assets/img/dress/y0.png'),
					id: 0
				}],
				// 当前问题和答案
				current: {
					// 问题
					index: 1,
					// 头发
					headIndex: 0,
					// 面妆
					faceIndex: 0,
					// 衣服
					clothesIndex: 0,
					// 目前选择的衣服类别
					typeIndex: 0,
				},
				// 动画效果
				classList: {
					appear: true,
					disAppear: false,
				}
			}
		},
		methods: {
			begin() {
				this.isShow.beginShow = false
			},

			nextClothes() {
				switch (this.current.typeIndex) {
					case 0:
						//这里是值对应的处理
						if (this.head.length > this.current.headIndex + 1) {
							this.current.headIndex++
						}
						break
					case 1:
						//这里是值对应的处理
						if (this.face.length > this.current.faceIndex + 1) {
							this.current.faceIndex++
						}
						break
					case 2:
						//这里是值对应的处理
						if (this.clothes.length > this.current.clothesIndex + 1) {
							this.current.clothesIndex++
						}
						break
					default:
						//这里是没有找到对应的值处理
						break
				}
			},

			previousClothes() {
				switch (this.current.typeIndex) {
					case 0:
						//这里是值对应的处理
						if (this.current.headIndex) {
							this.current.headIndex--
						}
						break
					case 1:
						//这里是值对应的处理
						if (this.current.faceIndex) {
							this.current.faceIndex--
						}
						break
					case 2:
						//这里是值对应的处理
						if (this.current.clothesIndex) {
							this.current.clothesIndex--
						}
						break
					default:
						//这里是没有找到对应的值处理
						break
				}
			},

			sethead(index) {
				return 'headClass' + index
			},
			
			setface(index){
				return 'faceClass' + index
			},
			
			setclothes(index) {
				return 'clothesClass' + index
			},
			
			setTypeIndex(num) {
				this.current.typeIndex = num
			},
			
			// 完成选装，提交
			complete(){
				let account = localStorage.getItem('account')
				// 获取用户选择的衣服的id
				let user_head = this.head[this.current.headIndex].id
				let user_face = this.face[this.current.faceIndex].id
				let user_clothes = this.clothes[this.current.clothesIndex].id
				let user_select = [user_head,user_face,user_clothes]
				// 判断该问题的类型
				let user_question = this.subject[this.current.index-1].type
				// 根据问题类型打分
				switch(user_question){
					case '花旦':
						let arr = [4,27,21,26,5,6]
						let num = 0
						let myCombination = []
						for(let item in user_select){
							if(arr.includes(user_select[item])){
								num++
								myCombination.push(user_select[item])
							}
						}
						switch(num){
							case 0:
								// 没有一件衣服是对的
								this.$message({
									message: '完成度：0%',
								});
								break
							case 1:
								this.$message({
									message: '完成度：30%',
								});
								break
							case 2:
								let combination = [[4,5],[4,6],[26,27],[6,26]]
								let x2 = 60
								for(let i in combination){
									if(combination[i].sort().toString() == myCombination.sort().toString()){
										x2 = 50
									}
								}
								this.$message({
									message: '完成度：'+ x2 +'%',
								});
								break
							case 3:
								let combination1 = [[4,27,21],[5,21,26]]
								let combination2 = [[4,5,21],[27,21,26]]
								let x3 = 80
								for(let i in combination1){
									if(combination1[i].sort().toString() == myCombination.sort().toString()){
										x3 = 100
									}
								}
								for(let i in combination2){
									if(combination2[i].sort().toString() == myCombination.sort().toString()){
										x3 = 90
									}
								}
								if(x3>90){
									// 进入下一题
									this.current.index++
									this.current.headIndex = 0
									this.current.faceIndex = 0
									this.current.clothesIndex = 0
									this.current.typeIndex = 0
									this.$message({
										message: '完成度：'+ x3 +'% 恭喜解锁下一关',
										type: 'success'
									});
									// 更新用户数据
									this.$http.post('/app/user',{
										"endata":{
											"action":"userinfo",
											"account": account
										}
									}).then((res)=>{
										res = res.data.endata.userdata
										console.log(typeof(res.answered))
										console.log(typeof(JSON.parse(res.answered)))
										res.answered = JSON.parse(res.answered).push(0)
										res.integral += 50
										console.log(typeof(res.answered))
									})
									break
								}
								this.$message({
									message: '完成度：'+ x3 +'%',
								});
								break
						}
						break
					case '小生':
						arr = [8,9,7,11,25]
						num = 0
						myCombination = []
						for(let item in user_select){
							if(arr.includes(user_select[item])){
								num++
								myCombination.push(user_select[item])
							}
						}
						switch(num){
							case 0:
								this.$message({
									message: '完成度：0%',
								});
								break
							case 1:
								this.$message({
									message: '完成度：30%',
								});
								break
							case 2:
								let combination = [[8,11],[9,7]]
								let x2 = 60
								for(let i in combination){
									if(combination[i].sort().toString() == myCombination.sort().toString()){
										x2 = 50
									}
								}
								this.$message({
									message: '完成度：'+ x2 +'%',
								});
								break
							case 3:
								combination = [[8,7,25],[9,11,25]]
								let x3 = 90
								for(let i in combination){
									if(combination[i].sort().toString() == myCombination.sort().toString()){
										x3 = 100
									}
								}
								if(x3>90){
									this.current.index++
									this.current.headIndex = 0
									this.current.faceIndex = 0
									this.current.clothesIndex = 0
									this.current.typeIndex = 0
									this.$message({
										message: '完成度：'+ x3 +'% 恭喜解锁下一关',
										type: 'success'
									});
									// 更新用户数据
									this.$http.post('/app/user',{
										"endata":{
											"action":"userinfo",
											"account": account
										}
									}).then((res)=>{
										res = res.data.endata.userdata
										JSON.parse(res.answered).push(0)
										res.integral += 50
									})
									break
								}
								this.$message({
									message: '完成度：'+ x3 +'%',
								});
								break
						}
						break
					case '老旦':
						arr = [10,24,13]
						num = 0
						myCombination = []
						for(let item in user_select){
							if(arr.includes(user_select[item])){
								num++
								myCombination.push(user_select[item])
							}
						}
						switch(num){
							case 0:
								this.$message({
									message: '完成度：0%',
								});
								break
							case 1:
								this.$message({
									message: '完成度：30%',
								});
								break
							case 2:
								this.$message({
									message: '完成度：60%',
								});
								break
							case 3:
								this.current.index++
								this.current.headIndex = 0
								this.current.faceIndex = 0
								this.current.clothesIndex = 0
								this.current.typeIndex = 0
								this.$message({
									message: '完成度：100% 恭喜解锁下一关',
									type: 'success'
								});
								// 更新用户数据
								this.$http.post('/app/user',{
									"endata":{
										"action":"userinfo",
										"account": account
									}
								}).then((res)=>{
									res = res.data.endata.userdata
									JSON.parse(res.answered).push(0)
									res.integral += 50
								})
								break
						}
						break
					case '老生':
						arr = [23,12,22]
						num = 0
						myCombination = []
						for(let item in user_select){
							if(arr.includes(user_select[item])){
								num++
								myCombination.push(user_select[item])
							}
						}
						switch(num){
							case 0:
								this.$message({
									message: '完成度：0%',
								});
								break
							case 1:
								this.$message({
									message: '完成度：30%',
								});
								break
							case 2:
								this.$message({
									message: '完成度：60%',
								});
								break
							case 3:
								this.current.index++
								this.current.headIndex = 0
								this.current.faceIndex = 0
								this.current.clothesIndex = 0
								this.current.typeIndex = 0
								this.$message({
									message: '完成度：100% 恭喜解锁下一关',
									type: 'success'
								});
								// 更新用户数据
								this.$http.post('/app/user',{
									"endata":{
										"action":"userinfo",
										"account": account
									}
								}).then((res)=>{
									res = res.data.endata.userdata
									JSON.parse(res.answered).push(0)
									res.integral += 50
								})
								break
						}
						break
				}
			}
		},
		mounted() {
			// 获取数据表
			let table = this.$refs.productList.popuplist
			// 获取用户所拥有的所有物品
			let account = localStorage.getItem("account")
			let data = this
			this.$http.post('/app/user', {
				"endata": {
					"action": "myitems",
					"account": account
				}
			}).then((res) => {
				res = res.data.endata
				for (let item of res.items) {
					if (table[item - 1].title == '发') {
						data.head.push(table[item - 1])
					}else if(table[item - 1].title == '面'){
						data.face.push(table[item - 1])
					}else if(table[item - 1].title == '衣'){
						data.clothes.push(table[item - 1])
					}
				}
			})
			
			// 获取用户的答题进度
			this.$http.post('/app/user',{
				"endata":{
					"action":"userinfo",
					"account": account
				}
			}).then((res)=>{
				res = res.data.endata.userdata
				data.current.index = JSON.parse(res.answered).length+1
			})
		}
	}
</script>

<style lang="scss" scoped>
	.dress_content {
		position: relative;
		width: 1920px;
		height: 969px;
		display: flex;
		align-items: center;
		justify-content: center;

		.background {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
		}

		.game {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-between;

			.girl {
				width: 40%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				.body {
					height: 100%;
				}

				.head {
					position: absolute;
					top: 38px;
					width: 370px;
				}

				.face {
					position: absolute;
					top: 135px;
					width: 270px;
				}

				.clothes {
					position: absolute;
					top: -30px;
				}

				.headClass10 {
					top: 45px;
					width: 365px;
				}

				.headClass26 {
					top: 85px;
					transform: translateX(3px);
					width: 165px;
					z-index: 1;
				}
				
				.headClass4 {
					top: 85px;
					transform: translate(-15px,-5px);
					width: 155px;
					z-index: 1;
				}
				
				.headClass8 {
					top: 85px;
					transform: translate(3px,-23px);
					width: 230px;
					z-index: 1;
				}
				
				.headClass9 {
					top: 85px;
					transform: translate(0px,-41px);
					width: 362px;
					z-index: 1;
				}
				
				.headClass23 {
					top: 85px;
					transform: translate(2px,-23px);
					width: 262px;
					z-index: 1;
				}
				
				.faceClass21 {
					top: 180px;
					width: 95px;
					transform: translate(2px,0px);
					z-index: 1;
				}
				
				.faceClass25{
					top: 175px;
					transform: translate(1px,0px);
					width: 110px;
				}
				
				.faceClass13{
					// top: 175px;
					transform: translate(1px,7px);
					width: 240px;
				}
				
				.faceClass22{
					z-index: 1;
				}
				
				.clothesClass11{
					top: 260px;
					transform: translate(17px,0px);
					width: 270px;
				}
				
				.clothesClass27{
					top: 262px;
					transform: translate(27px,0px);
					width: 680px;
				}
				
				.clothesClass5{
					top: 262px;
					transform: translate(27px,0px);
					width: 680px;
				}
				
				.clothesClass6{
					top: 262px;
					transform: translate(27px,0px);
					width: 280px;
				}
				
				.clothesClass7{
					top: 262px;
					transform: translate(27px,0px);
					width: 680px;
				}
				
				.clothesClass12{
					top: 250px;
					transform: translate(0px,0px);
					width: 720px;
				}
				
				.clothesClass24{
					top: 258px;
					transform: translate(-10px,0px);
					width: 350px;
				}
			}

			.game_right {
				width: 50%;
				display: flex;
				justify-content: space-around;

				.tool {
					width: 10%;
					display: flex;
					flex-direction: column;
					align-items: center;

					.tools {
						width: 80px;
						height: 80px;
						color: rgba($color: #e7e3d7, $alpha: 1.0);
						background-color: rgba($color: #7b5a44, $alpha: 1.0);
						font-size: 70px;
						font-family: 'xingkai';
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 100px;
					}

					.seleted {
						width: 100px;
						height: 100px;
						font-size: 80px;
					}

					.head {}

					.face {}

					.clothes {}

					.complete {
						width: 200px;
						font-size: 60px;
						margin-top: 150px;
					}
				}

				.right {
					height: 100%;
					width: 65%;

					.clothes {
						height: 85%;
						width: 100%;
						margin-top: 50px;
						border: 1px solid rgba($color: #7b5a44, $alpha: 1.0);
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;

						.icon {
							width: 80px;
							height: 80px;
							position: absolute;
							cursor: pointer;

							img {
								width: 100%;
							}
						}

						.icon_left {
							left: 0;
							top: 350px;
						}

						.icon_right {
							right: 0;
							top: 350px;
						}

						.myclothes {
							max-width: 80%;
						}
					}

					.subtitle {
						width: 100%;
						height: 70px;
						border: 1px solid rgba($color: #7b5a44, $alpha: 1.0);
						background-color: rgba($color: #e7e3d7, $alpha: 1.0);
						color: rgba($color: #7b5a44, $alpha: 1.0);
						font-size: 60px;
						font-family: 'xingkai';
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}


		.begin {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.background2 {
				width: atuo;
				height: 100%;
				position: absolute;
				z-index: -1;
			}

			.title {
				font-size: 120px;
				transform: translate(-500px, -20px);
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				white-space: pre-wrap;
				line-height: 120px;
			}

			.text {
				font-size: 60px;
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				white-space: pre-wrap;
				line-height: 120px;
			}

			.btn {
				width: 350px;
				height: 150px;
				color: rgba($color: #e7e3d7, $alpha: 1.0);
				background-color: rgba($color: #7b5a44, $alpha: 1.0);
				font-size: 75px;
				font-family: 'xingkai';
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 50px;
			}
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
