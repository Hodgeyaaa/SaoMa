<template>
	<div id="login">
		  <div class="container" :class="[active ? 'active' : '']">
		        <div class="user signinBx">
		          <div class="imgBx"><img src="../../../static/login/test1.png" /></div>
		          <div class="formBx">
		            <form action="">
		              <h2>登录</h2>
		              <input type="text" v-model="account" placeholder="请输入手机号码" />
		              <input type="password" v-model="password" placeholder="请输入密码" />
		              <input type="submit" @click="signin" value="登录" />
		              <p class="signup">
		                还没有账号?<a href="#" @click="toggleForm();">注册</a>
		              </p>
		            </form>
		          </div>
		        </div>
		
		        <div class="user signupBx">
		          <div class="imgBx"><img src="../../../static/login/text2.png" /></div>
		          <div class="formBx">
		            <form action="">
		              <h2>注册</h2>
		              <input type="text" v-model="account" placeholder="请输入手机号码" />
		              <input type="password" v-model="password" placeholder="请输入密码" />
		              <input type="submit" @click="register" value="注册" />
		              <p class="signup">
		                已注册账号?<a href="#" @click="toggleForm();">登录</a>
		              </p>
		            </form>
		          </div>
		        </div>
		      </div>
	</div>
</template>

<script>
export default{
	data() {
		return {
			load:true,
			account: '',
			password:'',
			active: false,
		}
	},
	methods:{
		// 切换登录注册
		regiBtn(){
			this.regi = this.regi == '登录' ? '注册' : '登录'
		},
		// 注册
		async register(){
			this.load = true
			let obj = {account:this.account,password:this.password}
			try{
				let res = await new this.Request(this.Urls.m().register,this.$qs.stringify(obj)).modepost()
				if(res.status != 200){
					new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
				}else if(res.status == 200){
					new this.mytitle(this.$message,'success',res.data.msg).funtitle()
					this.toggleForm();
				}
				this.load = false
			}catch(e){
				this.load = false
				new this.mytitle(this.$message,'info','发生错误,重试').funtitle()
			}
		},
		// 登录
		async signin(){
			this.load = true
			let obj = {account:this.account,password:this.password}
			try{
				let res = await new this.Request(this.Urls.m().login,this.$qs.stringify(obj)).modepost()
				if(res.status != 200){
					console.log('123')
					new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
				}else if(res.status == 200){
					let ids = '1'
					localStorage.setItem("nuvmenuid", JSON.stringify(ids))
					localStorage.setItem("token", res.data.data.token)
					// 查询商家信息数据库
					// 登录成功之后查询商家信息数据库，是否有还商家信息
					// 有的话就跳转到index主界面。
					// 否则的话跳转到商家信息上传界面
					let infor = await new this.Request(this.Urls.m().obtainshop).modeget()
					if(infor.data.data.length == 0){
						this.$router.push({name:'modify-infor'})
					}else{
						localStorage.setItem("company", infor.data.data[0].name)
						this.$router.push({name:'index'})
					}
				}
				this.load = false
			}catch(e){
				console.log(e)
				this.load = false
				new this.mytitle(this.$message,'info','发生错误,重试').funtitle()
			}
		},
		// 登录注册切换
		toggleForm() {
		       
			   if(!this.active) {
				   this.active = true;
			   }else
			   this.active = false;
		      }
	}
}
</script>

<style>
	*{
	    margin:0;
	    padding: 0;
	    box-sizing: border-box;
	}
	#login{
	    min-height: 100vh;
	    position: relative;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    background-color: khaki;
	    transition: 0.5s;
	}
	.container{
	    position: relative;
	    width: 800px;
	    height: 500px;
	    background-color: white;
	    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
	    overflow: hidden;
	}
	.container .user{
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    transition: 0.5s;
	}
	.container .user .imgBx{
	    position: relative;
	    width: 50%;
	    height: 100%;
	    transition: 0.5s;
	    
	    
	}
	.container .user .imgBx img{
	    width: 100%;
	    height: 100%;
	    object-fit: cover;
	    position: absolute;
	    top: 0;
	    left: 0;
	    
	}
	.container .user .formBx{
	    padding: 40px;
	    width: 50%;
	    background-color: white;
	    position: relative;
	    transition: 0.5s;
	}
	.container .user h2{
	    font-size: 18px;
	    font-weight: 600;
	    text-transform: uppercase;
	    text-align: center;
	    letter-spacing: 2px;
	    width: 100%;
	    margin-bottom: 10px;
	    color: #555;
	}
	.container .user input{
	    width: 100%;
	    padding: 10px;
	    background-color: #f5f5f5;
	    color: #333;
	    border: none;
	    outline: none;
	    box-shadow: none;
	    font-size: 14px;
	    margin: 8px 0px;
	    
	    font-weight: 300;
	
	}
	.container .user .formBx input[type="submit"]{
	    max-width: 100px;
		height: 38px;
	    color: #fff;
	    background-color: #677eff;
	    cursor: pointer;
	    font-weight: 500;
	    letter-spacing: 1px;
	    transition: 0.5s;
	}
	.container  .signupBx .formBx input[type="submit"]{
	    background-color: #e73e49;
	}
	.container .user .formBx .signup{
	    position: relative;
	    margin-top: 20px;
	    font-size: 12px;
	    color: #555;
	    text-transform: uppercase;
	    font-weight: 300;
		letter-spacing: 2px;
	}
	.container .user .formBx .signup a{
	    font-weight: 600;
	    color: #577eff;
	}
	
	.container .signupBx{
	    pointer-events: none;
	}
	.container.active .signupBx{
	    pointer-events: initial;
	}
	.container .signupBx .imgBx{
	    top: -100%;
	}
	.container .signupBx .formBx{
	    top: 100%;
	}
	.container .signinBx .imgBx{
	    top: 0;
	}
	.container .signinBx .formBx{
	    top: 0;
	}
	.container.active .signupBx .imgBx{
	    top: 0;
	}
	.container.active .signupBx .formBx{
	    top: 0;
	}
	.container.active .signinBx .imgBx{
	    top: -100%;
	}
	.container.active .signinBx .formBx{
	    top: 100%;
	}
	
	@media (max-width: 991px){
	     .container{
	        max-width: 400px;
	    }
	     .container .imgBx{
	        display: none;
	    }
	     .container .user .formBx{
	        width: 100%;
	    }
	     .container.active .signinBx .formBx{
	        top: -100%;
	    }
	    
	}

</style>
