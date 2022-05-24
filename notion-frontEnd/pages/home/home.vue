<template>
	<view>
		<!-- 顶部 -->
		<view class="top-view">
			<view>{{peopleNum}}人就餐</view>
			<view class="top-view-flex">
				<image src="/static/tab/fenxiang.svg" mode="widthFix"  class="top-search"></image>
				<image src="/static/tab/dingdan.svg" mode="widthFix" @click="my_order()"></image>
			</view>
		</view>
		<view class="order-view">
			<view class="commodity">
				<!-- 左 -->
				<view class="order-left">
					<scroll-view scroll-y="true" class="scroll-Hei" :scroll-with-animation="true" :enhanced="true" :show-scrollbar="false">
						<block v-for="(item,index) in itemize" :key="index">
							<view class="itemize-text" :class="{active: index == trigger}" @click="itemIze(index,item.cid)">
								<text>{{item.value}}</text>
								<text v-if="item.sele_quantity > 0">{{item.sele_quantity}}</text>
							</view>
						</block>
					</scroll-view>
				</view>
				<!-- 右 -->
				<view class="order-right">
					<scroll-view scroll-y="true" class="scroll-Hei"  :scroll-with-animation="true" :enhanced="true" :show-scrollbar="false" :scroll-into-view="scroll_into" @scroll="scroLl">
						<block v-for="(item,index) in goods" :key="index">
						<view :id="item.cid" class="rig-height">
							<view class="classif">{{item.category}}</view>
							<view class="classif-goods" v-for="(itemgood,good_index) in item.good_query" :key="good_index" @click="popup_item(true,index,good_index,item.cid,itemgood, specs_index)">
								<view class="goods-image"><image :src="itemgood.image[0].url" mode="aspectFill"></image></view>
								<view class="goods-Price">
									<view class="goods-name">
										<text class="Bold">{{itemgood.name}}</text>
										<text class="Thinning">已售 {{itemgood.monthlysale}}</text>
									</view>
									<view class="unit-price">
										<text class="Symbol">¥</text>
										<text class="Bold">{{itemgood.specsArray[0].unitprice}}</text>
										<text class="Thinning">/{{itemgood.specsArray[0].unit}}</text>
									</view>
								</view>
								<!-- 无规格 -->
								<view class="quantity" v-if="!JSON.parse(itemgood.att_hide)">
									<view><image v-if="itemgood.quantity > 0" src="/static/tab/jianhao.png" mode="widthFix" @click.stop="reduce(index,good_index,item.cid,itemgood, specs_index)"></image></view>
									<view><text v-if="itemgood.quantity > 0">{{itemgood.quantity}}</text></view>
									<view><image src="/static/tab/jia.png" mode="widthFix" @click.stop="plus(index,good_index,item.cid,itemgood, specs_index)"></image></view>
								</view>
								<!-- 有规格 -->
								<view class="quantity specs-view" v-if="JSON.parse(itemgood.att_hide)">
									<text>选规格</text>
									<text v-if="itemgood.quantity > 0">{{itemgood.quantity}}</text>
								</view>
							</view>
						</view>
						</block>
						<view style="height: 400rpx;"></view>
					</scroll-view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="order-bottom" @click="pop_Shopping()" :style="{'padding-bottom': Modelmes ? '68rpx' : ''}">
				<view class="Shopping" style="width: 115rpx;">
					<view class="Shopping-left">
						<image src="/static/tab/gouwuche.png" mode="widthFix"></image>
					</view>
					<view class="Shopping-number" v-if="total_quantity > 0">{{total_quantity}}</view>
				</view>
				<view class="Shopping-title" v-if="total_quantity > 0">已点{{total_quantity}}份菜品</view>
				<view class="place-order" @click.stop="total_quantity == 0 ? false : true && placean_order()">
					<button plain="true" open-type="getUserInfo">选好了</button>
				</view>
			</view>
		</view>
		<!-- 购物车 -->
		<Cart class="coup-anim" v-if="whetherShow" :shopping_card="shopping_array"></Cart>
		<!-- 商品详情 -->
		<Details v-if="detailWhetherShow" :pro_details="pro_details"></Details>
	</view>
</template>

<script>
	import {orderCode} from '../../config/order.js'
	//购物车组件
	import Cart from './components/shopping-cart.vue'
	//商品详情弹窗组件
	import Details from './components/goods-details.vue'
	// 销售额计算类
	import {analysis} from '../../config/salesVolume.js'
	
	const db = wx.cloud.database()
	const good_collect = db.collection('order-data')
	const dishes_data = db.collection('shelves-list')
	const _ = db.command
	
	export default {
		data() {
			return {
				peopleNum: 0,
				itemize: [],
				trigger: 0,//类目选中索引
				goods: [],
				moduleHright: [],
				whetherShow: false,
				tophei: 0,
				scroll_into: '',
				total_quantity: 0,
				shopping_array: [],
				detailWhetherShow: false,
				pro_details: {},
				specs_index: 0,
				tmplIds: 'h36MiW4ZBuZ-yy9wLRdqehnsz7h3IZcnx7nah4vzs7Y'
			}
		},
		components: {
			Cart,
			Details
		},
		methods: {
			async dishesRequest() {
				const res = await wx.cloud.callFunction({
				  // 云函数名称
				  name: 'Request-message',
				  // 传给云函数的参数
				  data: {},
				})
				console.log(res)
				this.itemize = res.result.res_cate
				this.goods = res.result.res_dishes
				this.$nextTick(() => {
					this.goods_height()
				})
			},
			itemIze(index, cid) {
				this.trigger = index
				this.scroll_into = cid
				setTimeout(() => {
					this.scroll_into = ''
				}, 400)
				
			},
			// 计算右边每个模块的高度
			goods_height() {
				const query = wx.createSelectorQuery()
				query.selectAll('.rig-height').boundingClientRect()
				// query.selectViewport().scrollOffset()
				query.exec((res) => {
				  // res[0].top       // #the-id节点的上边界坐标
				  // res[1].scrollTop // 显示区域的竖直滚动位置
				 // console.log(res)
				 res[0].reduce((prev, next) => {
					 // this.moduleHright.push(prev + next.height)
					 this.moduleHright.push(Math.floor(prev + next.height))
					return prev + next.height
				 }, 0)
				 
				})
			},
			// 右边滚动触发
			scroLl(event) {
				let scrollTop = event.detail.scrollTop
							
					if(scrollTop > this.tophei) {
						if(scrollTop >= this.moduleHright[this.trigger]) {
							this.trigger += 1
						}
					}else {
						if(scrollTop < this.moduleHright[this.trigger - 1]) {//与上一个对比
							this.trigger -= 1
						}
					}
				this.tophei = scrollTop
			},
			// 添加商品
			plus(index,good_index,cid,itemgood, specs_index = 0) {
				const {_id, image, name} = itemgood
				const {unitprice, unit} = itemgood.specsArray[specs_index]
				const num = ++this.goods[index].good_query[good_index].quantity
				++this.itemize[index].sele_quantity
				++this.total_quantity
				this.specs_index = specs_index
				const obj = {_id, cid, image, name, unitprice, quantity: num, unit, total_price: unitprice * num, good_index, specs_index}
				this.shopping_Cart(obj)
				// console.log(JSON.parse(itemgood.att_hide))
			},
			//减少商品
			reduce(index,good_index,cid,itemgood, specs_index = 0) {
				const {_id, image, name} = itemgood
				const {unitprice, unit} = itemgood.specsArray[specs_index]
				const num = --this.goods[index].good_query[good_index].quantity
				--this.itemize[index].sele_quantity
				--this.total_quantity
				this.specs_index = specs_index
				const obj = {_id, cid, image, name, unitprice, quantity: num, unit, total_price: unitprice * num, good_index, specs_index}
				this.shopping_Cart(obj)
			},
			// 购物车中的商品
			shopping_Cart(obj) {
				// console.log("obj: ", obj)
				const is_exit = this.shopping_array.find((item) => {
					return obj._id == item._id && obj.specs_index == item.specs_index
				})
				if(is_exit === undefined) {
					this.shopping_array.push(obj)
				}else {
					// console.log("已存在")
					this.shopping_array.forEach((att, index) => {
						if(att._id == obj._id) {
							att.quantity = obj.quantity
							att.total_price = att.quantity * att.unitprice
						}
						if(att.quantity == 0) {
							this.shopping_array.splice(index, 1)
						}
					})
				}
				console.log("购物车商品：", this.shopping_array)
				
			},
			// 购物车中的商品加减
			shopping_Cart_add_sub(index, QU, _id, cid, good_index, unitprice, specs_index) {
				if(QU == 0) {
					this.shopping_array.splice(index, 1)
					
				}else {
					this.shopping_array[index].quantity = QU
					this.shopping_array[index].total_price = QU * unitprice
					
				}
				// 右边的商品列表对应商品同步
				this.goods.forEach((item, index) => {
					if(item.cid == cid) {
						if(item.good_query[good_index].quantity > QU) {
							// 减
							item.good_query[good_index].quantity = QU
							--this.itemize[index].sele_quantity
							--this.total_quantity
						}else {
							// 加
							item.good_query[good_index].quantity = QU
							++this.itemize[index].sele_quantity
							++this.total_quantity
						}
					}
				})
			},
		// 清空购物车
		empty_data() {
			this.shopping_array = []
			this.itemize.forEach((item) => {
				item.sele_quantity = 0
			})
			this.goods.forEach((item) => {
				item.good_query.forEach((att) => {
					att.quantity = 0
				})
			})
			this.total_quantity = 0
			this.pop_Shopping(false)
		},
		// 弹出购物车组件
		pop_Shopping(value = true) {
			this.whetherShow = value
			
		},
		// 弹出商品详情弹窗
		popup_item(value, index, good_index, cid, itemgood, specs_index = 0) {
			this.detailWhetherShow = value
			this.pro_details = {index, good_index, cid, itemgood, specs_index}
		},
		// 点击提交订单弹出订阅消息弹窗
		async placean_order(){
			//消息弹窗
			wx.requestSubscribeMessage({
			  tmplIds: [this.tmplIds],
			  success:(res)=>{
				  this.sub_database()
			  },
			  fail:(err)=>{
				  this.sub_database()
			  }
			})
		},
		// 提交订单
		async sub_database() {
			wx.showLoading({
			  title: '正在下单中',
			  mask: true,
			})
				let table_number = wx.getStorageSync('table_num')
				let number_of_diners = wx.getStorageSync('number_of_diners')
				let order = {
					table_number,
					number_of_diners,
					order_time: this.$Time().utcOffset(8).format("YYYY-MM-DD HH:mm:ss"),
					sett_amount: this.shoppinPrice,
					order_no: orderCode(),
					transac_status: 'unsettled', //结账状态
					order_receiving: 'mis_orders', //接单状态
					menu: [
						{goods_list: this.shopping_array}
					]
				}
				try{
					// 1. 提交订单后是否是加菜， 根据transac_status 结账状态以及table_number 桌号做判断; .field({})可以选择返回字段
					const query = await good_collect.where({table_number, transac_status: 'unsettled'}).get()
					console.log("QUERY: ", query)
					if(query.data.length == 0) {
						// 已经结账，添加新订单
						await good_collect.add({data: order})
					}else {
						// 未结账，此订单提交为加菜订单，使用更新数组操作符
						console.log("未结账")
						let total_amount = Number(query.data[0].sett_amount) + order.sett_amount
						await good_collect.doc(query.data[0]._id).update({
								data: {sett_amount: total_amount, order_receiving: 'mis_orders', menu: _.unshift(order.menu[0])}
							})
					}
					//批量自增售出商品数量
					this.shopping_array.forEach(async (item) => {
						await dishes_data.doc(item._id).update({data: {monthlysale: _.inc(item.quantity)}})
						console.log("销售量改变")
					})
					// 计算当天销售额
					let current_day = this.$Time().utcOffset(8).format("YYYY-MM-DD")
					await new analysis().sameDay(current_day, order.sett_amount)
					// 推送提醒
					this.pushMessage()
					
					// 跳转到订单页
					wx.redirectTo({
						url:'/pages/order/order'
					})
					wx.hideLoading()
				}catch(e){
					wx.showToast({
					  title: '发生错误',
					  icon: 'error',
					  duration: 1000
					})
				}
			},
		
			// 推送订单提醒
			pushMessage() {
				var pubsub = this.goeasy.pubsub;
				pubsub.publish({
					channel: "my_channel",//替换为您自己的channel
					message: "这是小程序home页面发的信息!",//替换为您想要发送的消息内容
					onSuccess:function(){
						console.log("消息发布成功。");
					},
					onFailed: function (error) {
						console.log("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
					}
				});
			},
			// 跳转到我的订单
			my_order() {
				wx.navigateTo({
					url: "/pages/myOrder/myOrder"
				})
			}
		},
		onLoad(e) {
			this.dishesRequest()
			// 获取用餐人数
			this.peopleNum = wx.getStorageSync('number_of_diners')
		},
		// 小程序端监听数据库变化测试
		// onShow() {
		// 	const watcher = db.collection('order-data').doc('fe4f571c625685ed00327f1f66fb44f9')
		// 	.watch({
		// 	    onChange: function(snapshot) {
		// 	      console.log('snapshot', snapshot)
		// 	    },
		// 	    onError: function(err) {
		// 	      console.error('the watch closed because of error', err)
		// 	    }
		// 	  })
		// },
		computed: {
			shoppinPrice() {
				const all_price = this.shopping_array.reduce((prev, next) => {
					return prev + next.total_price
				}, 0)
				 return all_price
			}
		}
		
	}
</script>

<style scoped>
.top-view{
	background:linear-gradient(to bottom, #f7d45f,#f7d562,#f8d561,#f9db76, #f9de80);
	height: 120rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
}
.top-view image{
	display: block;
	width: 35rpx;
	height: 35rpx;
}
.top-view-flex{
	display: flex;
	align-items: center;
}
.top-search{padding-right: 50rpx;}
/* 点餐界面 */
.order-view{margin-top: 120rpx;}
.commodity{
	display: flex;
	position: fixed;
	top: 120rpx;
	left: 0;
	right: 0;
	}
.order-left{
	background-color: #fafafa;
	width: 150rpx;
	overflow-y: auto;
}
.itemize-text{
	font-size: 27rpx;
	padding: 30rpx 10rpx;
	display: flex;
	align-items: center;
	color: #797979;
}
.itemize-text text:nth-child(1){flex: 1;}
.itemize-text text:nth-child(2){
	background-color: #eb5941;
	border-radius: 50%;
	font-size: 20rpx;
	color: #FFFFFF;
	width: 30rpx;
	height: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 2rpx;
}
.scroll-Hei{
	height: 100vh;
	/* white-space: nowrap; */
}
.order-right{
	background-color: #FFFFFF;
	flex: 1;
	overflow-y: auto;
	
}
.classif{
	font-size: 27rpx;
	padding: 30rpx 20rpx;
	color: #797979;
}
/* 分类商品 */
.classif-goods{
	display: flex;
	justify-content: space-between;
	padding: 0 20rpx;
	height: 150rpx;
	font-size: 30rpx;
	margin-bottom: 45rpx;
}

.goods-image image{
	display: block;
	width: 150rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.goods-Price{
	flex: 1;
	position: relative;
	padding: 0 20rpx;
}
.goods-Price text{display: block;}
.goods-name{
	display: flex;
	flex-direction: column;
	position: relative;
	top: 0;
}
.goods-name text:nth-child(1){padding-bottom: 9rpx;}
.unit-price{
	position: absolute;
	bottom: 0;
	display: flex;
	align-items: baseline;
}
.Bold{font-weight: bold;}
.Symbol{font-size: 20rpx;}
.Thinning{font-size: 25rpx;
color: #cccccc;
}
.quantity image{width: 50rpx; height: 50rpx;}
.quantity view{
	width: 50rpx;
	height: 50rpx;
	text-align: center;
    line-height: 50rpx;
}
.quantity{
	display: flex;
	align-items: center;
	align-self: flex-end;
	width: 200rpx;
	justify-content: space-between;
}
/* 规格 */
.specs-view{
	height: 50rpx;
	width: 100rpx !important;
	border-radius: 50rpx;
	font-size: 25rpx;
	justify-content: center !important;
	position: relative;
	background: linear-gradient(to right,#f8da81,#f8d771,#f7d362,#f6cb4a);
}
.specs-view text:nth-child(2){
	position: absolute;
	right: -10rpx;
	top: -17rpx;
	background-color: #eb5941;
	border-radius: 50%;
	font-size: 20rpx;
	color: #FFFFFF;
	width: 30rpx;
	height: 30rpx;
	text-align: center;
	line-height: 30rpx;
}
.order-bottom{
	background-color: #fefefe;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	z-index: 9;
}
.Shopping image{width: 75rpx; height: 75rpx; display: block;}
.Shopping-left{width: 75rpx; height: 75rpx;}
.Shopping{
	display: flex;
	align-items: center;
	/* height: 120rpx; */
}
.Shopping-number{
	align-self: flex-start;
	background: #eb5941;
	color: #ffff;
	width: 40rpx;
	border-radius: 50rpx;
	text-align: center;
	font-size: 20rpx;
	/* margin-top: 15rpx; */
}
.Shopping-title{
	flex: 1;
	padding: 0 25rpx;
	color: #999999;
	/* height: 120rpx;
	line-height: 120rpx; */
}
.place-order button{
	border: none;
	background:linear-gradient(to right,#f8da81,#f8d771,#f7d362,#f6cb4a);
	width: 200rpx;
	height: 75rpx;
	line-height: 75rpx;
	border-radius: 50rpx;
	font-weight: bold;
	z-index: 9;
}
/* 点击分类列表加上背景色 */
.active{
	background-color: #FFFFFF;
	color: #000000 !important;
}
</style>
