<template>
	<view>
		<text>霍奇餐厅</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	text {
		color: #ffb837;
		font-size: 58rpx;
		letter-spacing: 8px;
		font-family: "微软雅黑";
		font-weight: bolder;
		position: relative;
		top: 30rpx;
	}
	page {
		/* background-image: url('https://notion-cos-1309679443.cos.ap-guangzhou.myqcloud.com/notion-upload/tipImage.jpg'); */
			background-image: url('https://notion-cos-1309679443.cos.ap-guangzhou.myqcloud.com/notion-upload/saomaTip.jpg');
			background-attachment: fixed;
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
			background-color: #5e00b6;
			text-align: center;
	}
</style>
