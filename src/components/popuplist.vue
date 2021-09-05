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
						url: require('../assets/img/shop/dmf1.png'),
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
					},
					{
						title: '糖葫芦',
						url: require('../assets/img/xw-thl.png'),
						id: 14,
					},
					{
						title: '卷轴',
						url: require('../assets/img/xw-hz.png'),
						id: 15,
					},
					{
						title: '钱币',
						url: require('../assets/img/xw-tq.png'),
						id: 16,
					},
					{
						title: '树枝',
						url: require('../assets/img/xw-szhi.png'),
						id: 17,
					},
					{
						title: '胭脂盒（红）',
						url: require('../assets/img/xw-yzhong.png'),
						id: 18,
					},
					{
						title: '豆子',
						url: require('../assets/img/xw-dz.png'),
						id: 19,
					},
					{
						title: '胭脂盒（黄）',
						url: require('../assets/img/xw-yzh.png'),
						id: 20,
					},
					{
						title: '面',
						url: require('../assets/img/shop/hdz1.png'),
						isSelect: false,
						pride: 14,
						id: 21,
					},
					{
						title: '面',
						url: require('../assets/img/shop/dmz1.png'),
						isSelect: false,
						pride: 15,
						id: 22,
					},
					{
						title: '发',
						url: require('../assets/img/shop/xst2.png'),
						isSelect: false,
						pride: 16,
						id: 23,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/ldy1.png'),
						isSelect: false,
						pride: 17,
						id: 24,
					},
					{
						title: '面',
						url: require('../assets/img/shop/xsz1.png'),
						isSelect: false,
						pride: 18,
						id: 25,
					},
					{
						title: '发',
						url: require('../assets/img/shop/hdt2.png'),
						isSelect: false,
						pride: 19,
						id: 26,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/hdy1.png'),
						isSelect: false,
						pride: 20,
						id: 27,
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
						url: require('../assets/img/shop/dmf1.png'),
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
					},
				],
				productList2: [{
						title: '面',
						url: require('../assets/img/shop/hdz1.png'),
						isSelect: false,
						pride: 14,
						id: 21,
					},
					{
						title: '面',
						url: require('../assets/img/shop/dmz1.png'),
						isSelect: false,
						pride: 15,
						id: 22,
					},
					{
						title: '发',
						url: require('../assets/img/shop/xst2.png'),
						isSelect: false,
						pride: 16,
						id: 23,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/ldy1.png'),
						isSelect: false,
						pride: 17,
						id: 24,
					},
					{
						title: '面',
						url: require('../assets/img/shop/xsz1.png'),
						isSelect: false,
						pride: 18,
						id: 25,
					},
					{
						title: '发',
						url: require('../assets/img/shop/hdt2.png'),
						isSelect: false,
						pride: 19,
						id: 26,
					},
					{
						title: '衣',
						url: require('../assets/img/shop/hdy1.png'),
						isSelect: false,
						pride: 20,
						id: 27,
					}],
			}
		},
	}
</script>

<style>
</style>
