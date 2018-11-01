<template>
  <div id="app">
    <router-view/>
    <div v-show="showDialog" class="maskErrorDl v-cloak" @click="closeDialog()">
      <div class="maskErrorDl-box" >
        <p>{{netWorkError}}</p>
      </div>
    </div>

    <div class="maskErrorDl" v-show="loginDialog">
      <div class="re-login">
        <p class="tip">提示：</p>
        <p>　　您的登录已过期或已在其他设备登录，请重新登录</p>
        <div class="login-button">
          <span class="button" @click="login()">确定</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import { mapGetters, mapActions,mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      loginDialog:false
    }
  },
  components: {

  },
  mounted() {

  },
  computed:{
    ...mapState({
      showDialog: state => state.showDialog,
      netWorkError: state => state.netWorkError,
      netWorkCode: state => state.netWorkCode
    })
  },
  methods: {
    closeDialog:function () {
      this.showDialog1(false);
      this.netWorkError1('');
    },
    login:function () {
       window.location.href="/dl.html?returnurl=little.html"
    },
    ...mapActions({
      showDialog1: 'showDialog',
      netWorkError1: 'netWorkError'
    })
  },
  watch:{
    showDialog:function (curr,old) {
      let vm =this;
      if(curr){
        window.setTimeout(function() {
          vm.showDialog1(false);
        }, 2000);
      }
    },
    netWorkCode:function (curr,old) {
       if(curr == '9998'){
         this.showDialog1(false);
         this.loginDialog = true;
       }
    }
  }
}
</script>

<style lang="scss" scoped>
  .maskErrorDl {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
  }
  .maskErrorDl .re-login{
    position: absolute;
    top: 37%;
    background-color: white;
    width: 12rem;
    left: 50%;
    transform: translateX(-50%);
    -ms-transform:translateX(-50%); 	/* IE 9 */
    -moz-transform:rotate(7deg)translateX(-50%); 	/* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
    padding: 1rem 1.5rem 1rem;
    .tip{
         font-size: 1.2rem;
         color: #fb6734;
    }
    .login-button{
      text-align: center;
      .button{
        display: inline-block;
        text-align: center;
        width: 11rem;
        margin-top: 0.5rem;
        height: 2.3rem;
        background-color: #fb6734;
        color: white;
        line-height: 2.3rem;
        font-size: 1rem;
      }
    }


  }
  .maskErrorDl .maskErrorDl-box {
    width: 14.81481rem;
    height: 0.40741rem;
    background: #f2f2f2;
    color: #090909;
    overflow: hidden;
    margin: 24%;
    font-size: 1.18519rem;
    text-align: center;
    padding: 0.24691rem 0 1.48148rem;
    border-radius: 0.24691rem;
  }
  .maskErrorDl .maskErrorDl-box p {
    margin: 0rem auto;
  }
  .maskErrorDl .maskErrorDl-box a {
    width: 14.81481rem;
    height: 2.22222rem;
    text-align: center;
    line-height: 2.22222rem;
    background: #ffa200;
    font-size: 1.23457rem;
    color: #fff5dc;
    display: block;
    margin: 2.9rem auto;
    border-radius: 0.24691rem;
  }
</style>
