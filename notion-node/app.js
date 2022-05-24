const Koa = require('koa')
const app = new Koa();
const cors = require('koa2-cors')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()//实例化 -> new
const abnormal = require('./config/abnormal.js')

app.use(cors());
app.use(json());
app.use(bodyParser());
// 全局异常处理
app.use(abnormal)

// 注册 登录
const login = require('./router/login/login.js');
// 商家设置
const uploadres = require('./router/merchant_info/info.js')
// 订单
const order = require('./router/order_related/order_info.js')
// 小程序码相关
const qrCode = require('./router/qr_code/qrCode.js')

//配置路由接口
router.use('/api', login);
router.use('/api', uploadres);
router.use('/api', order)
router.use('/api', qrCode)

// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())
// app.get('/', (ctx) => {
// 	console.log(ctx);
// })
// 自定义端口
const port = 8000;
app.listen(port, () => {
	console.log('服务启动成功，' + port + '端口监听中......');
})