merchant-list: 商家列表
权限：所有用户可读仅创建者可读写
merchant-info: 商家信息集合
权限：所有用户可读仅创建者可读写
dishes-category: 菜品类目
权限：所有用户可读仅创建者可读写
seven-day-sales: 每天销售额集合
权限：所有用户可读写
菜品类目集合设计：
[{
	cid: 'a001', //分类id
	count: 22, //分类商品数
	value: '小吃类',
	label: '小吃类',
	sele_quantity: 0, 该分类下选择的商品数量
	
}]

dishes-cate: 菜品单位
权限：所有用户可读仅创建者可读写
菜品单位集合设计：
[{
	value: '份',
	label: '份',
	unid: '', //唯一标识
}]

shelvesList: 上架商品
权限：所有用户可读仅创建者可读写
集合设计：
{[
	'cid': 'a001', //分类id
	'category': '小吃类', //所属分类
	'image': 'http', //商品图片地址
	'name': '番茄炒鸡蛋', //商品名称
	'monthlysale': 22, //销售量
	'specsArray': [
		{
			'unitprice': 22, //商品单价
			'unit': '份', //商品单位
			'attribute': '中辣中杯', 商品属性
		} 
	]//商品规格
	'quantity': 2, //商品已选数量
	'time': 2022-2-19, //上架时间
	
	'onsale': true, //上下架状态
	
]}

订单存储集合： order-data
订单数据库设计

[
	{
		table_number: 桌号
		number_of_diners: 用餐人数
		order_time: 下单时间
		sett_amount: 用餐金额
		order_number: 订单编号
		transac_status: 结账状态,未结账： 'unsettled', 已结账： 'success'
		order_receiving: 结账状态 未接单： 'mis_order', 已接单： 'rec_order'
		
		下单次数：第一次，【第二次 。。。】-> 加菜
		menu: [
			{
				goods_list: [购物车商品]//第二次下单
			},
			{
				goods_list: [购物车商品]
			}
		]
		
	}
]

<!-- 销售额集合 -->
