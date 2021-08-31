<template>
	<div class="game_content">

		<img :src="imgUrl.background" class="background">

		<!-- 工具栏 -->
		<Tools :key="componentKey"></Tools>

		<!-- 问题框 -->
		<div class="problem">
			<div class="problem_text">题目{{now_question.number}}:{{questions[now_question.number-1].question}}</div>
			<div class="options">
				<div class="option" v-for="(item,index) in questions[now_question.number-1].options" :key="'info2-'+index">
					{{item.option}}.{{item.text}}
					<img :src="item.url" alt="" v-show="questions[now_question.number-1].img == true">
				</div>
			</div>
		</div>

		<!-- aside -->
		<div class="aside">
			<div class="up">{{now_question.number}}/10</div>
			<div class="img">
				<!-- <img :src="questions[now_question.number-1].options" alt=""> -->
				图片位置
			</div>
			<div class="mid">
				<div class="mid_up">
					答对：{{now_question.right}}
				</div>
				<div class="mid_down">
					积分：{{now_question.integral}}
				</div>
			</div>
			<div class="down" @click="back()">返回</div>
		</div>

		<!-- 人物 -->
		<div class="man" ref="man">
			<img src="../../assets/img/p1.png">
		</div>
		
		<!-- 豆子 -->
		<div class="bean" v-for="(item,index) in now_question.arr" :key="'info2-'+ index" :class="['bean'+index,classList]" ref="bean">
			<img src="../../assets/icon/bean.png">
		</div>
	</div>
</template>

<script>
	import Tools from '../component/tools.vue'
	export default {
		components: {
			'Tools': Tools,
		},
		data() {
			return {
				componentKey:0,
				imgUrl: {
					background: require('../../assets/img/舞台.png')
				},
				questions: [{
						question: "下列不属于越剧十姐妹的是:",
						options: [{
								text: "吕瑞英",
								option: 'A',
							},
							{
								text: "尹桂芳",
								option: 'B',
							},
							{
								text: "筱丹桂",
								option: 'C',
							},
							{
								text: "徐玉兰",
								option: 'D',
							}
						],
						answer: "A",
					},
					{
						question: "越剧十姐妹中被称为越剧皇帝的是:",
						options: [{
								text: "吴小楼",
								option: 'A',
							},
							{
								text: "竺水招",
								option: 'B',
							},
							{
								text: "尹桂芳",
								option: 'C',
							},
							{
								text: "筱丹桂",
								option: 'D',
							}
						],
						answer: "C",
					},
					{
						question: "越剧十姐妹中被称为越剧皇后的是:",
						options: [{
								text: "吴小楼",
								option: 'A',
							},
							{
								text: "竺水招",
								option: 'B',
							},
							{
								text: "尹桂芳",
								option: 'C',
							},
							{
								text: "筱丹桂",
								option: 'D',
							}
						],
						answer: "D",
					},
					{
						question: "第一个越剧女班是谁在什么时候确立的:",
						options: [{
								text: "1923年7月",
								option: 'A',
							},
							{
								text: "1923年5月",
								option: 'B',
							},
							{
								text: "1921年7月",
								option: 'C',
							},
							{
								text: "1922年5月",
								option: 'D',
							}
						],
						answer: "A",
					},
					{
						question: "余少群学习越剧拜的哪位老师？",
						options: [{
								text: "闻一多",
								option: 'A',
							},
							{
								text: "赵志刚",
								option: 'B',
							},
							{
								text: "贝多芬",
								option: 'C',
							},
							{
								text: "刘绍群",
								option: 'D',
							}
						],
						answer: "D",
					},
					{
						question: "下列哪位表演艺术家不是越剧代表人物？",
						options: [{
								text: "范瑞娟",
								option: 'A',
							},
							{
								text: "王文娟",
								option: 'B',
							},
							{
								text: "新凤霞",
								option: 'C',
							},
							{
								text: "徐玉兰",
								option: 'D',
							}
						],
						answer: "C",
					},
					{
						question: "下列哪一个是越剧中的小生造型:",
						options: [{
								url: require('../../assets/img/q1.jpg'),
								option: 'A',
							},
							{
								url: require('../../assets/img/q2.jpg'),
								option: 'B',
							},
							{
								url: require('../../assets/img/q3.jpg'),
								option: 'C',
							},
							{
								url: require('../../assets/img/q4.jpg'),
								option: 'D',
							}
						],
						img: true,
						answer: "A",
					},
					{
						question: "下列哪一个是越剧中的老生造型:",
						options: [{
								url: require('../../assets/img/q1.jpg'),
								option: 'A',
							},
							{
								url: require('../../assets/img/q2.jpg'),
								option: 'B',
							},
							{
								url: require('../../assets/img/q3.jpg'),
								option: 'C',
							},
							{
								url: require('../../assets/img/q4.jpg'),
								option: 'D',
							}
						],
						img: true,
						answer: "B",
					},
					{
						question: "下列哪首乐曲是越剧的代表作品之一?",
						options: [{
								text: "《红楼梦》",
								option: 'A',
							},
							{
								text: "《花为媒》",
								option: 'B',
							},
							{
								text: "《拾儿记》",
								option: 'C',
							},
							{
								text: "《天仙配》",
								option: 'D',
							}
						],
						answer: "A",
					},
					{
						question: "在越剧界有“老旦王”之誉是哪位越剧大师？",
						options: [{
								text: "王文娟",
								option: 'A',
							},
							{
								text: "金艳芳",
								option: 'B',
							},
							{
								text: "周宝奎",
								option: 'C',
							},
							{
								text: "张桂凤",
								option: 'D',
							}
						],
						answer: "C",
					}
				],
				now_question: {
					number: 1, //目前是哪道题目
					right: 0, //对了几道
					integral: 0, //积分
					select: 0, //用户的回答
					arr:["A","B","C","D"],
				},
				classList:{
					animation:true
				}
			}
		},
		mounted() {
			let data = this
			document.onkeydown = function(event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 39) { // 按 right
					//要做的事情
					if (data.now_question.select < 3) {
						// 选择+1
						data.now_question.select++
						// 人物向右移动
						data.$refs.man.style.left = 150 + 350 * data.now_question.select + "px"
					}
				}
				if (e && e.keyCode == 37) { // 按 left
					//要做的事情
					if (data.now_question.select > 0) {
						// 选择-1
						data.now_question.select--
						// 人物向左移动
						data.$refs.man.style.left = 1200 - 350 * (3 - data.now_question.select) + "px"
					}
				}
			}

			// 每隔5秒执行
			let sh = window.setInterval(() => {
				setTimeout(data.setanswer(data,sh), 0)
			}, 1000*5);
		},
		methods: {
			// 强制刷新组件
			forceRerender() {
			    this.componentKey += 1; 
			},
			
			setanswer: function(data,sh) {
				// 记录这一次回答
				// 判断回答的是否正确
				if(data.now_question.arr[data.now_question.select] == data.questions[data.now_question.number-1].answer){
					// 回答正确 加积分
					data.now_question.integral+=10
					let account = localStorage.getItem('account')
					this.$http.post('/app/user',{  
						"endata":{
							"action":"integaladd",
							"account":account,
							"value":10
						},
					}).then((res)=>{
						res=res.data
						// 强制刷新组件
						this.forceRerender()
					})
					// 加回答正确数
					data.now_question.right++
				}
				// 判断是否还有下一题
				if(data.now_question.number < 10){
					// 换下一题
					data.now_question.number++
				}else{
					// 动画结束
					data.classList.animation = false
					// 关闭定时器
					clearInterval(sh);
				}
			},
			
			// 回到上级路由
			back:function(){
				this.$router.push('/stage')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_content {
		position: relative;
		overflow: hidden;
		width: 1920px;
		height: 969px !important;
		display: flex;
		align-items: center;
		justify-content: center;
		.bean{
			width: 50px;
			height: 50px;
			border-radius: 50%;
			position: absolute;
			img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
				pointer-events: none;
				position: absolute;
			}
		}
		.bean0{
			top: 150px;
			left: 150px;
		}
		.bean1{
			top: 150px;
			left: 500px;
		}
		.bean2{
			top: 150px;
			left: 850px;
		}
		.bean3{
			top: 150px;
			left: 1200px;
		}
		.background {
			width: 100%;
			height: 100%;
			pointer-events: none;
			position: absolute;
			z-index: -1;
		}

		.problem {
			width: 1480px;
			height: 300px;
			position: absolute;
			top: 0;
			left: 20px;
			background: url('../../assets/img/bg2.png');
			background-position: bottom;
			background-size: cover;
			display: flex;
			flex-direction: column;
			align-items: center;

			.problem_text {
				width: 80%;
				height: 25%;
				font-size: 45px;
				font-family: 'xingkai';
				color: rgba($color: #7b5a44, $alpha: 1.0);
				line-height: 60px;
			}

			.options {
				width: 80%;
				height: 55%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;

				.option {
					font-size: 35px;
					font-family: 'xingkai';
					color: rgba($color: #7b5a44, $alpha: 1.0);
					display: flex;
					align-items: center;

					img {
						margin-left: 20px;
						width: 100px;
						height: 100px;
					}
				}
			}
		}

		.aside {
			width: 400px;
			height: 100%;
			background-color: rgba($color: #fff, $alpha: .7);
			position: absolute;
			right: 0;
			font-size: 55px;
			font-family: 'xingkai';
			color: rgba($color: #7b5a44, $alpha: 1.0);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

			.mid {
				font-size: 45px;
			}

			.img {
				width: 70%;
				height: 350px;
				border: 1px solid rgba($color: #7b5a44, $alpha: 1.0);
				background-color: rgba($color: #e7e3d7, $alpha: 1.0);
				;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.down {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 80px;
				width: 200px;
				border: 1px solid rgba($color: #7b5a44, $alpha: 1.0);
				background-color: rgba($color: #e7e3d7, $alpha: 1.0);
				cursor: pointer;
			}
		}

		.man {
			width: 200px;
			height: 300px;
			position: absolute;
			bottom: 20px;
			left: 150px;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.animation{
		animation: getdown 5s linear infinite;
	}
	
	@keyframes getdown {
		0% {
			transform: translateY(0px);
		}
	
		100% {
			transform: translateY(500px);
		}
	}
</style>
