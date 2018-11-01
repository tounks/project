<template>
  <div class="every-warpper">
    <div class="every">
      <div class="everypacket">
        <img src="../../assets/packetFalse.png"  v-show="notGet" style="width:60%;">
        <p v-show="notGet" style="color:#fff;font-size:1.2rem;height:2rem;">{{errMsg}}</p>
        <img src="../../assets/everypacket.png" v-show="alreadyget">
        <div class="detail" v-show="alreadyget">
          <p class="yuan">{{amount}}<span>元</span></p>
          <p>投资期限≥{{productDeadline}}天</p>
          <p>投资≥{{enableAmount}}元</p>
          <p style="padding-bottom:1rem;">红包有效期 :{{deadline}}天</p>
          <p class="already">*红包已经放入券包中*</p>
        </div>
      </div>
    </div>
    <div class="protocol-button">
      <div class="button"></div>
      <div class="button-line" >
        <span class="reject-span" @click="close()" v-show="alreadyget||notGet">关闭窗口</span>
      </div>
      <div class="button-line">
        <span class="agree-span"  v-show="alreadyget" @click="use()">立即使用</span>
        <span class="agree-span"  v-show="notGet" @click="seePacket()">查看红包</span>
      </div>
    </div>
    <div class="rules">
      <div :class="ruleShow==true?'rules_top':'rules_down'" @click="ruleShow = !ruleShow">活动规则</div>
      <div class="rules_content" v-show="ruleShow">
        <p>1、每位注册用户每天可参加一次“每日抢红包”活动；</p>
        <p>2、每位用户均有一定概率获得每日红包奖励，具体红包使用条件请见APP中【我的】-【优惠券】-【返现红包】；</p>
        <p>3、本活动最终解释权在法律允许范围内归聪明钱所有，如有疑问请联系客户服务热线400-1818-880，我们将竭诚为您服务。</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        alreadyget:false,
        notGet:false,
        deadline:'', //红包有限期
        enableAmount:'',//投资
        productDeadline:'',//投资期限
        amount:'',
        errMsg:'',
        ruleShow:false,
      }
    },
    mounted(){
      this.iforNot()
    },  
    methods:{
      ...mapActions({
        showDialog1: 'showDialog',
      }),
      seePacket(){
         window.location.href = '/myCoupon' 
      },
      use(){
         window.location.href = '/main/bankBillList' 
      },
      close(){
        this.$parent.$parent.dialogeveryRed = false
      },
      iforNot(){
        var vm = this
        this.axios.post('/gw/p2p/member/toSign.dos',{
          'uid':JSON.parse(localStorage.getItem("ngStorage-user")).member.uid,
          'token':JSON.parse(localStorage.getItem("ngStorage-user")).token,
        }).then(function(res){
            vm.showDialog1(false);
            if(res.data.errorCode == '8888'){
              vm.alreadyget = true
              vm.productDeadline = res.data.map.favourable.productDeadline
              vm.enableAmount  = res.data.map.favourable.enableAmount
              vm.deadline   = res.data.map.deadline  //有效期
              vm.amount = res.data.map.favourable.amount
            }
            vm.$parent.$parent.iforNot()
            // window.magicFunc.SaHongBao(function(){
            //     console.log("“SaHongBao”动画播放完成");
            // });

        }).catch(function(err){
            if(err.data.success == false){
              vm.notGet = true
              vm.errMsg = err.data.errorMsg
            }
            vm.$parent.$parent.iforNot()
            vm.showDialog1(false);
            // vm.everydayPacket = true
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .every-warpper{
    text-align: center;
    font-size: 1rem;
    margin-top: 2.5rem;
    .every{
      width: 70%;
      margin:0 auto;
      img{
        width: 100%;
      }
      .everypacket{
        position: relative;
      }
      .detail{
        position: absolute;
        top: 12%;
        padding: 10%;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        color: #fff;
        padding-top: 4rem;
      }
      .yuan{
        font-size: 3rem;
        padding-bottom: 1rem;
        height: 4.5rem;
        span{
          font-size: 0.8rem;
        }
      }
      p{
        font-size: 0.8rem;
        height: 1.3rem;
      }
      p.already{
        width: 76%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.3);
        height:2rem;
        line-height: 2rem;
        border-radius: 2rem;
        margin-top: 0.2rem;
      }
    }
  }
   .protocol-button{
      display: flex;
       padding: 1rem 0;
       .button{
        width: 10%;
       }
       .button-line{
          width: 40%;
         text-align: center;
          span{
            height: 2.5rem;
            width: 8rem;
            line-height: 2.5rem;
            border-radius: 2rem;
            display: inline-block;
          }
         .reject-span{
           border: solid 1px rgba(128, 128, 128, 1);
           color: rgba(128, 128, 128, 1);
         }
         .agree-span{
           background-color: #ff6937;
           color: white;
         }
       }
     }
     .rules{
          width: 86%;
          margin: 0 auto;
          color: #fff;
          background:rgba(92,92,92,0.3);
          border-radius: 2rem;
          padding:1rem;
          // opacity: 0.3;
          .rules_top{
             background:url(../../assets/to_top.png) right 35% center no-repeat; 
             height: 2rem;
             line-height: 2rem;
             background-size: 1rem;
             font-size: 1.2rem;
          }
          .rules_down{
             background:url(../../assets/to_down.png) right 35% center no-repeat; 
             height: 2rem;
             line-height: 2rem;
             background-size: 1rem;
             font-size: 1.2rem;
          }
          .rules_content{
            text-align: justify;
            font-size: 1rem;
          }
     }

</style>
