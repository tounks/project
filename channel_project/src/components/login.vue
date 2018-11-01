<template>
  <div class="login">
    <div class="login_form">
       <div class="login_logo">
         <img src="../image/login_logo.png">
       </div>
      <div class="login_content">
        <div>
          <div class="login_info">聪明钱渠道管理后台 <i>Management System</i></div>
        </div>

        <div>
          <div class="login_input notTop">
            <span class="login_span">用户名：</span>
            <input placeholder="请输入用户名" v-model="username"/>
          </div>
        </div>

        <div>
          <div class="login_input">
            <span class="login_span">密&nbsp;&nbsp;&nbsp;码：</span>
            <input placeholder="请输入密码" v-model="password"  @keyup.enter="login" type="password"/>
          </div>
        </div>
        <div class="error_tip">
          <div class="tip">{{validErrorInfo}}</div>
        </div>
      </div>

      <div class="login_button">
        <div class="button_click" @click="login()">登陆</div>
      </div>
    </div>
    <div class="foot-wrap">
      <span>@版权所有</span>
      <a class="name" href="#">杭州承钰资产管理有限公司</a>
    </div>
  </div>
</template>

<script>
  import  "../utils/md5.js"
  import {hex_sha256} from "../utils/SHR256.js"
  export default {
    mounted(){

    },
    data () {
      return {
        username : "",
        password:"",
        validError: false,
        validErrorInfo:'',
      }
    },
    methods: {
       login(){
         if(this.username === ''){
           this.validErrorInfo = "用户名不能为空";
           return false;
         }else if(this.password === ''){
           this.validErrorInfo = "密码不能为空";
           return false;
         }
         this.validErrorInfo = "";
         let vm = this;
         this.$http.post('/chanUsers/login.html',{
           username: this.username,
           password: hex_sha256(md5(this.password)),
         }).then(function(res){
           res.data.data.chanUsers.teamLevel = res.data.data.teamLevel;
           localStorage.setItem('ngStorage-ditch',JSON.stringify(res.data.data.chanUsers));
           vm.$router.push('/mainMenu/mainPage');
         }).catch(function(err){

         })
       },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    background: #232b38 url(../image/login_bg.png) no-repeat center top;
    overflow: hidden;
    .login_form{
      text-align: center;
      margin-top: 200px;
      .login_logo{
        display: inline-block;
        img{
          width: 338px;
        }
      }
      .login_content{
        color: white;
        font-size: 14px;
        margin-top: 50px;
        position: relative;
        .login_info{
          display: inline-block;
          width: 374px;
          text-align: right;
          font-size: 15px;
          i{
            font-size: 13px;
            font-style: italic;
          }
        }
        .login_input.notTop{
          margin-top: 0;
        }
        .login_input{
          width: 374px;
          height: 50px;
          display: inline-block;
          background-color: white;
          text-align: left;
          line-height: 50px;
          margin-top: 25px;
          .login_span{
            color: #9a9a9a;
            margin-left: 10px;
            display: inline-block;
          }
          input{
            height: 35px;
            width: 200px;
          }
        }
        .error_tip{
          position: absolute;
          width: 100%;
          min-width: 1080px;
          text-align: center;
          top: 152px;
          /*transform: translateX(-50%) ;*/
          /*-webkit-transform: translateX(-50%) ;*/
          /*-ms-transform: translateX(-50%) ;*/
          /*-moz-transform: translateX(-50%) ;*/
          /*-o-transform: translateX(-50%);*/
          .tip{
            width: 374px;
            display: inline-block;
            text-align: left;
            color: rgb(254, 106, 106);
          }
        }
      }

      .login_button{
         margin-top: 40px;
         .button_click{
           width: 374px;
           height: 50px;
           background-color: #f8b718;
           display: inline-block;
           font-size: 17px;
           line-height: 50px;
           font-weight: bold;
           letter-spacing:12px;
           cursor: pointer;
         }
      }
    }
    .foot-wrap{
      height: 43px;
      line-height: 43px;
      background: #1b212b;
      border-top: 3px solid #28313f;
      text-align: center;
      color: #d5d5d6;
      position: fixed;
      _position: absolute;
      bottom: 0;
      width: 100%;
      .name{
        color: #cf9a1d;
        margin-left: 8px;
      }
    }
  }
</style>
