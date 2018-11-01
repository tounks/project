<template>
  <div class="risk-protocol">
    <div class="protocol-img">
      <div class="risk-test"></div>
    </div>
    <div class="protocol-info">
      <p>1、在购买理财产品之前，请您先根据自身实际情况认真填写本问卷，以便杭州承钰资产管理有限公司（简称“聪明钱”）在了解您风险承受力的基础上界定您的风险类型，帮助您根据自身的风险承受能力选择合适的理财产品。</p>
      <p>2、如果您的财务状况、投资经验、风险偏好、风险承受力等情况发生重大改变或距离最近一次填写本问卷时间超过一年，请您重新填写本问卷。</p>
      <p>3、在您填写问卷前，您应当保证：您具备投资风险意识和风险识别能力，拥有非保本类金融产品投资的经历并熟悉互联网，能够独立判断并且承受投资风险。若您不符合上述要求或不同意进行保证，请您不要填写本问卷及购买理财产品，否则因此产生的法律后果由您自行承担。</p>
      <p>4、如果您提供的资料不准确、不完整、不真实，或是您选择不填写本问卷，则可能对您的风险承受能力评估以及理财产品推荐带来不利影响，聪明钱对因此造成的所有后果不承担任何责任。</p>
      <p>5、本问卷包括十个问题，每个问题只能选择一项，请根据您的实际情况如实做出选择。</p>
      <p>6、本问卷最终解释权归聪明钱所有。您若对本问卷内容有任何疑惑，请向聪明钱客服咨询。</p>
    </div>
    <div class="protocol-button">
      <div class="button-line" @click="disAgree()">
        <span class="reject-span">不接受</span>
      </div>
      <div class="button-line"  @click="agree()">
        <span class="agree-span">同意</span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {

    data() {
      return {

      }
    },
    components:{

    },
    mounted(){

    },
    methods:{
      disAgree(){
        this.$parent.$parent.dialogRiskProtocol = false
      },
      agree(){
         this.$router.push({ name: 'makeSurvey'})
      },
    }
  }
</script>
<style lang="less" scoped>
   .risk-protocol{
     text-align: center;
     font-size: 1rem;
     width: 88%;
     margin: 0 auto;
     background-color: white;
     border-radius: 1rem;
     .protocol-img{
        text-align: center;
       padding-top: 1.3rem;
       .risk-test{
         background: url("../../assets/riskProtocol.png") top center no-repeat;
         width: 5rem;
         height: 4rem;
         background-size: cover;
         display: inline-block;
       }
     }
     .protocol-info{
       text-align: left;
       padding: 0.5rem 1.5rem;
       color: #4d4d4d;
       height: 22rem;
       overflow-y: scroll;
       p{
         font-size: 0.9rem;
         line-height: 1.6rem;
         color: #4d4d4d;
       }
     }
     .protocol-button{
       display: flex;
       padding: 1rem 0;
       .button-line{
          width: 50%;
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
   }
</style>
