<template>
  <div>
    <div class="password">
      <div>
        <span class="info_span">用户名:&nbsp;&nbsp;</span>
        <span class="qry_span"><el-input v-model="admin" placeholder="请输入用户名" disabled></el-input></span>
      </div>
      <div>
        <span class="info_span">原始密码:&nbsp;&nbsp;</span>
        <span class="qry_span"><el-input v-model="oldPass" placeholder="请输入原始密码" type="password"></el-input></span>
      </div>
      <div>
        <span class="info_span">新密码:&nbsp;&nbsp;</span>
        <span class="qry_span"><el-input v-model="newPass" placeholder="请输入新密码" type="password"></el-input></span>
      </div>
      <div>
        <span class="info_span">确认密码:&nbsp;&nbsp;</span>
        <span class="qry_span"><el-input v-model="checkPass" placeholder="请输入确认密码" type="password"></el-input></span>
      </div>
      <div class="error-tip">{{errorTip}}</div>
      <div class="button">
        <span class="sure" @click="modPass">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import  "../../utils/md5.js"
  import {hex_sha256} from "../../utils/SHR256.js"
  export default {
    data () {
      return {
        userId:"",
        admin:"", //用户名
        oldPass:"", //原始密码
        newPass:"", //新密码
        checkPass:"", //确认密码
        errorTip:"" //错误提示
      }
    },
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.admin = JSON.parse(user).username;
    },
    methods: {
      modPass(){
        if(this.oldPass == ""){
          this.errorTip ="原始密码不能为空";
          return false;
        }else if(this.newPass ==""){
          this.errorTip ="新密码不能为空";
          return false;
        }else if(this.checkPass ==""){
          this.errorTip ="确认密码不能为空";
          return false;
        }else if(this.oldPass == this.newPass){
          this.errorTip ="新密码不能和原始密码相同";
          return false;
        }else if(this.checkPass != this.newPass){
          this.errorTip ="新密码不能和确认密码不同";
          return false;
        }
        this.errorTip = "";
        let vm = this;
        vm.$http.post('/chan/updatePassword.do',{
          userId: this.userId,
          oldPwd: hex_sha256(md5(this.oldPass)),
          newPwd: hex_sha256(md5(this.newPass)),
          confirmPwd: hex_sha256(md5(this.checkPass))
        }).then(function(res){
          localStorage.removeItem('ngStorage-ditch');
          vm.$router.push('/login');
        }).catch(function(err){

        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .password{
    text-align: left;
    margin-left: 1rem;
    position: relative;
    .qry_span{
      width:7rem;
      display:inline-block;
      margin-bottom: 1rem;
    }
    .info_span{
      width: 60px;
      display: inline-block;
      text-align: right;
    }
    .button{
      margin-left: 2rem;
      margin-top: 10px;
      .sure{
        display: inline-block;
        width: 4rem;
        height: 1.3rem;
        background-color: red;
        color: white;
        text-align: center;
        line-height: 1.3rem;
        border-radius: 0.5rem;
        cursor: pointer;
      }
    }
    .error-tip{
      color: red;
      position: absolute;
      bottom: 42px;
      left: 65px;
    }
  }
</style>

