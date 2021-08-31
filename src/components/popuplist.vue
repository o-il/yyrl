<template>
	<div class="content"></div>
</template>

<script>
	export default {
		data() {
			return {
				// 物品列表
				popuplist: [{
						name: '灯笼',
						id: 1,
						url: require('../assets/img/light2.png')
					},
					{
						name: '扇子',
						id: 2,
						url: require('../assets/img/xw-sz.png')
					},
					{
						name: '瓶子',
						id: 3,
						url: require('../assets/img/xw-hp.png')
					},
					{
						title: '发',
						url: require('../assets/img/shop/hdt1.png'),
						isSelect: false,
						pride: 30,
						id: 4,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/hdy2.png'),
						isSelect: false,
						pride: 50,
						id: 5,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/hdy3.png'),
						isSelect: false,
						pride: 40,
						id: 6,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/xsy1.png'),
						isSelect: false,
						pride: 60,
						id: 7,
					},
					{
						title: '发',
						url: require('../assets/img/shop/xst1.png'),
						isSelect: false,
						pride: 40,
						id: 8,
					},
					{
						title: '发',
						url: require('../assets/img/shop/xst2.png'),
						isSelect: false,
						pride: 40,
						id: 9,
					},
					{
						title: '发',
						url: require('../assets/img/shop/ldf1.png'),
						isSelect: false,
						pride: 30,
						id: 10,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/xsy2.png'),
						isSelect: false,
						pride: 60,
						id: 11,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/dmy1.png'),
						isSelect: false,
						pride: 70,
						id: 12,
					},
					{
						title: '面',
						url: require('../assets/img/shop/ldz1.png'),
						isSelect: false,
						pride: 50,
						id: 13,
					}
				],
				productList: [{
						title: '发',
						url: require('../assets/img/shop/hdt1.png'),
						isSelect: false,
						pride: 30,
						id: 4,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/hdy2.png'),
						isSelect: false,
						pride: 50,
						id: 5,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/hdy3.png'),
						isSelect: false,
						pride: 40,
						id: 6,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/xsy1.png'),
						isSelect: false,
						pride: 60,
						id: 7,
					},
					{
						title: '发',
						url: require('../assets/img/shop/xst1.png'),
						isSelect: false,
						pride: 40,
						id: 8,
					},
					{
						title: '发',
						url: require('../assets/img/shop/xst2.png'),
						isSelect: false,
						pride: 40,
						id: 9,
					},
					{
						title: '发',
						url: require('../assets/img/shop/ldf1.png'),
						isSelect: false,
						pride: 30,
						id: 10,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/xsy2.png'),
						isSelect: false,
						pride: 60,
						id: 11,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/dmy1.png'),
						isSelect: false,
						pride: 70,
						id: 12,
					},
					{
						title: '面',
						url: require('../assets/img/shop/ldz1.png'),
						isSelect: false,
						pride: 50,
						id: 13,
					}
				]
			}
		},
	}
</script>

<style>
</style>
