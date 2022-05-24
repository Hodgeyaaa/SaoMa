<script>
	export default {
		onLaunch: function() {
			// 云环境开发初始化
			    wx.cloud.init({
			      env: "notion-code-7gz3u668b0a47416",//云开发环境ID
				  traceUser: true
			    })
			
			 //goeasy建立连接
			    this.goeasy.connect({
			        id:"001", //pubsub选填，im必填，最大长度60字符
			        data:{}, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
			        onSuccess: function () {  //连接成功
			          console.log("GoEasy connect successfully.") //连接成功
			        },
			        onFailed: function (error) { //连接失败
			          console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
			        },
			        onProgress:function(attempts) { //连接或自动重连中
			          console.log("GoEasy is connecting", attempts);
			        }
			    });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
