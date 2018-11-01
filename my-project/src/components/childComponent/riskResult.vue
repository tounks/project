<template>
  <div class="riskHeight">
    <div class="common-head">
      <i @click="back()"></i>
      <span>{{title}}</span>
    </div>
    <div class="riskResult">
       <img src="../../assets/riskResult.png">
       <div class="result-title">测评结果</div>
       <div class="result-content">
         <!--类型背景转化-->
         <span class="result-img" :class="{1:'result-keep',2:'result-steady',3:'result-enter'}[riskLevel]"></span>

         <div class="result-info">
           <p v-text="{1:'保守型',2:'稳健型',3:'进取型'}[riskLevel]"></p>
           <span class="result-img1" :class="{1:'result-keep1',2:'result-steady1',3:'result-enter1'}[riskLevel]"></span>
         </div>
         <div class="result-line"></div>
         <div class="result-tip">
           <p class="p1">理财投资风险测评结果</p>
           <p class="p2">适当配置：<span v-text="{1:'极低风险项目',2:'较低风险产品',3:'较高风险产品'}[riskLevel]"></span></p>
         </div>
         <div class="result-line"></div>
         <div class="result-button">
           <div class="result-display">
             <span class="hold-test" @click="onceMore()">重新测评</span>
           </div>
           <div class="result-display">
             <span class="imm-invest" @click="toInvest()">立即投资</span>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import commonTitle from '../commons/commonTitle'
  export default {

    data() {
      return {
        titleShow: true,
        title:'风险测评',
        riskLevel : 1,  //1代表保守型，2代表稳健型，3代表进取型
      }
    },
    components: {
      commonTitle
    },
    mounted(){
      this.riskLevel = this.$route.query.riskLevel
    },
    methods:{
      onceMore(){
         this.$router.push({ path: 'makeSurvey'})
      },
      toInvest(){
        window.location.href = '/main/bankBillList'
      },
      back(){
          this.$router.push({ name: 'littleGold'})
      }
    }
  }
</script>
<style lang="less" scoped>
  body{
    background-color: #eee;
  }
  .common-head {
    height: 3.40741rem;
    background: #FFFFFF;
    color: #333333;
    width: 100%;
    max-width: 750px;
    position: relative;
  }
  .common-bottom{
    height: 0.4rem;
    background-color: #eee;
  }
  .common-head i{
    z-index: 5;
    width: 1rem;
    height: 1.9rem;
    display: block;
    position: absolute;
    background-image: url(../../assets/icon_left.png);
    background-size: cover;
    top: 50%;
    left: 2rem;
    transform: translate(0,-50%);
    -webkit-transform: translate(0,-50%);
    -o-transform: translate(0,-50%);
    -moz-transform: translate(0,-50%);
  }
  .common-head span{
    text-align: center;
    font-size: 1.28rem;
    line-height: 3.40741rem;
    position: absolute;
    width: 100%;
  }
  .riskHeight{
    background-color: #eee;
    padding-bottom: 4rem;
  }
  .riskResult{
    background-color: white;
    width: 90%;
    margin: 0 auto;
    margin-top: 1.3rem;
    border-radius: 1rem;
    position: relative;
    img{
      margin-top: 1rem;
      width: 100%;
    }
    .result-title{
      position: absolute;
      top: 3.9%;
      left:50%;
      font-size: 1.12rem;
      color: #33cacc;
      font-weight: bold;
      transform: translate(-50%,0%);
      -ms-transform:translate(-50%,0%); 	/* IE 9 */
      -moz-transform:translate(-50%,0%); 	/* Firefox */
      -webkit-transform:translate(-50%,0%); /* Safari 和 Chrome */
      -o-transform:translate(-50%,0%);
    }
    .result-content{
      text-align: center;
      .result-img{
        background: url("../../assets/riskResult-keep.png") top center no-repeat;
        width: 9.9rem;
        height: 8.2rem;
        display: inline-block;
        background-size: cover;
      }
      .result-img.result-keep{
        background: url("../../assets/riskResult-keep.png") top center no-repeat;
        background-size: cover;
        width: 9.9rem;
        height: 8.2rem;
      }
      .result-img.result-enter{
        background: url("../../assets/riskResult-enter.png") top center no-repeat;
        background-size: cover;
        width: 5.9rem;
        height: 9.2rem;
      }
      .result-img.result-steady{
        background: url("../../assets/riskResult-steady.png") top center no-repeat;
        background-size: cover;
        width: 8.8rem;
        height: 9.2rem;
      }
      .result-info{
        margin-top: 1rem;
        p{
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6937;
          font-family: ﻿¹ã½Ý¾ÓÃÔÄã×Ö¿â;
        }
        .result-img1{
          background: url("../../assets/three-star.png") top center no-repeat;
          width: 5.3rem;
          height: 1.20rem;
          display: inline-block;
          background-size: cover;
        }
        .result-img1.result-keep1{
          background: url("../../assets/three-star.png") top center no-repeat;
          width: 5.3rem;
          height: 1.20rem;
          background-size: cover;
        }
        .result-img1.result-enter1{
          background: url("../../assets/one-star.png") top center no-repeat;
          width: 1.21rem;
          height: 1.20rem;
          background-size: cover;
        }
        .result-img1.result-steady1{
          background: url("../../assets/two-star.png") top center no-repeat;
          width: 3.2rem;
          height: 1.20rem;
          background-size: cover;
        }
      }
      .result-line{
        padding-top: 2rem;
        border-bottom: 1px solid #e5e5e5;
        width: 80%;
        margin: 0 auto;
      }
      .result-tip{
        margin-top: 2rem;
        .p1{
          color: #cccccc;
        }
        .p2 span{
          color: #ff6937;
          font-size: 1.2rem;
        }
      }
      .result-button{
        display: flex;
        padding: 1.5rem 0;
        .result-display{
          width: 50%;
          span{
            display: inline-block;
            width: 10rem;
            height: 2.8rem;
            border-radius: 2rem;
            line-height: 2.8rem;
            border: solid 1px rgba(111, 111, 111, 1);
            font-size: 1.12rem;
            color: #4d4d4d;
          }
          .imm-invest{
            background-color: #ff6937;
            color: white;
            border: none;
          }

        }
      }
    }

  }

</style>
