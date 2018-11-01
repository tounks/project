<template>
  <div class="exchange1-warpper">
    <div class="exchange">
      <div class="exchange-title">
        <span class="exchange-img"></span>
        <span>兑换区</span>
        <span class="exchange-right" @click="toExplain()"></span>
      </div>

      <div class="exchange-list">
        <div class="exchange-play">
          <p>输入兑换码</p>
          <p class="input-exchange"></p>
        </div>
        <div class="exchange-play">
          <p>确认兑换</p>
          <p class="act-exchange"></p>
        </div>
        <div class="exchange-play">
          <p>兑换完成</p>
          <p class="com-exchange"></p>
        </div>

        <!--箭头显示-->
        <div class="icon_left">
            <img src="../../assets/exchange-right.png" />
            <img src="../../assets/exchange-right.png" class="right"/>
        </div>


        <!--错误信息报错-->
        <div class="exchange-error" v-show="error">
          <p>
            <span class="exchange-arm"></span>
          </p>
          <p>{{errorMsg}}</p>
          <div class="exchange-icon">
            <img src="../../assets/exchange-icon.png">
          </div>
        </div>
      </div>
      <!--<input placeholder="请输入您的兑换码" v-model="command" maxlength="20" :class="active==true?'active':''"/>-->

      <div class="exchange-input">
         <input placeholder="请输入您的兑换码" v-model="command" maxlength="20" :class="active==true?'active':''"/>
      </div>
      <div class="exchange-bottom">
        <div class="exchange-button">
          <div class="exchange-click" @click="commend()">确认兑换</div>
        </div>
        <div class="exchange-look" @click="tomycoupon()">
          查看已兑换红包>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        command:'',
        error:false,
        errorMsg:'',
        active:false,
      }
    },
    components:{

    },
    mounted(){
      // $('.exchange-input input').on('touchstart',function () {
      //   $(this).focus();
      // })
    },
    methods:{
      ...mapActions({
        showDialog1: 'showDialog',
      }),
      toExplain(){
         this.$router.push({ name: 'exchangeExplain', query: { wap: true }})
      },
      commend(){
        var vm = this
        this.axios.post('/gw/p2p/member/getCommandReward.do',{
          'uid':JSON.parse(localStorage.getItem("ngStorage-user")).member.uid,
          'token':JSON.parse(localStorage.getItem("ngStorage-user")).token,
          'command':this.command,
        }).then(function(res){
            if(res.data.success){
                localStorage.setItem("ngStorage-commend",JSON.stringify(res.data.map));
            }
            vm.$parent.$parent.dialogExchange = false
            vm.$parent.$parent.dialogExchangeAward = true

        }).catch(function(err){
          console.log(err)
          vm.error = true
          vm.errorMsg = err.data.errorMsg
          vm.active = true
          vm.showDialog1(false);

        })
      },
      tomycoupon(){
        window.location.href = '/myCoupon?from=vue'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .exchange1-warpper{
    text-align: center;
    font-size: 1rem;
    margin-top: 2.5rem;
    z-index: 10000;
    overflow: hidden;
  }
  .exchange{
    background: url("../../assets/exchange.png") top center no-repeat;
    width: 87%;
    margin: 0 auto;
    border-radius: 2rem;
    background-size: cover;
    .exchange-title{
      font-size: 1.2rem;
      color: #ffffff;
      padding-top: 1rem;
      padding-bottom: 1rem;
      position: relative;
      .exchange-img{
        background: url("../../assets/exchange-gift.png") top center no-repeat;
        width: 1.3rem;
        background-size:cover;
        display: inline-block;
        vertical-align: text-top;
        height: 1.5rem;
      }
      .exchange-right{
        background: url("../../assets/exchange-ques.png") top center no-repeat;
        width: 1.3rem;
        background-size:cover;
        display: inline-block;
        vertical-align: text-top;
        height: 1.3rem;
        position: absolute;
        top:50%;
        right: 8%;
        transform: translateY(-50%);
        -webkit-transform:  translateY(-50%);
        -ms-transform:  translateY(-50%);
        -moz-transform: translateY(-50%);
        -o-transform: translateY(-50%);
      }
    }
    .exchange-list{
      padding:2rem 0 ;
      display: flex;
      position: relative;
      .icon_left{
        position: absolute;
        width: 100%;
        text-align: left;
        top: 54%;
        left: 0%;
        img{
          width: 0.6rem;
          margin-left: 31.3%;
        }
      }
      .exchange-play{
        width: 33.33%;
        text-align: center;
        color: #ffffff;
        font-size: 1.12rem;
        .input-exchange{
          background: url("../../assets/exchange-input.png") top center no-repeat;
          width: 1.5rem;
          height: 1.5rem;
          background-size:cover;
          display: inline-block;
          margin-top: 0.5rem;
        }
        .act-exchange{
          background: url("../../assets/exchange-act.png") top center no-repeat;
          width: 1.5rem;
          height: 1.5rem;
          background-size:cover;
          display: inline-block;
          margin-top: 0.5rem;
        }
        .com-exchange{
          background: url("../../assets/exchange-com.png") top center no-repeat;
          width: 1.5rem;
          height: 1.5rem;
          background-size:cover;
          display: inline-block;
          margin-top: 0.5rem;
        }
      }
      .exchange-error{
        position: absolute;
        width: 13rem;
        height: 5.5rem;
        background-color: white;
        left: 50%;
        border-radius: 1rem;
        top: 19%;
        text-align: center;
        transform: translateX(-50%);
        -webkit-transform:  translateX(-50%);
        -ms-transform:  translateX(-50%);
        -moz-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        p{
          text-align: center;
          font-size: 0.8rem;
          color: #000000;
          -webkit-transform: scale(0.9);
        }
        .exchange-arm{
          background: url("../../assets/exchange-arm.png") top center no-repeat;
          margin-top: 0.3rem;
          width: 1.3rem;
          height: 1.3rem;
          background-size:cover;
          display: inline-block;
        }
        .exchange-icon{
          img{
            width: 4rem;
          }
        }

      }
    }
    .exchange-input{
      margin-top: 0.5rem;
      text-align: center;
      font-size: 1rem;
      overflow: hidden;
      input{
        height: 3rem;
        width: 17rem;
        border-radius: 2rem;
        text-align: center;
        font-size: 1rem;
      }
      .active{
        border: 1px solid #ff6937;
      }
    }
    .exchange-bottom {
      margin-top: 1rem;
      background-color: white;
      height: 9rem;
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
      .exchange-button{
        padding: 2rem 0 1.8rem;
        .exchange-click{
          height: 3.1rem;
          width: 17rem;
          margin: 0 auto;
          line-height: 3.1rem;
          background-color: #ff6937;
          border-radius: 2rem;
          color: white;
          font-size: 1.12rem;
        }
      }
    }
    .exchange-look{
      color: #f84655;
      width: 50%;
      margin: 0 auto;
    }
  }

</style>
