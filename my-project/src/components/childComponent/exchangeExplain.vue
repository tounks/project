<template>
  <div>
    <common-title :is-show="titleShow" :title="title" v-show="getWap()"></common-title>
    <div class="exchange-explain">
      <div>
        <p class="explain-p">1.什么是兑换码？</p>
        <p>兑换码是聪明钱为回馈广大用户推出的一种电子虚拟券，由一串字母、数字或文字随机组合而成，兑换成功后，您可以获得该兑换码对应的奖励。</p>
      </div>

      <div class="explain-top">
        <p class="explain-p">2.如何获得兑换码？？</p>
        <p>请关注聪明钱官网，手机客户端和官方微信，我们将不定期举办各种活动发放兑换码。</p>
      </div>

      <div class="explain-top">
        <p class="explain-p">3.如何进行兑换？</p>
        <p>进入【兑换区】，在兑换码输入框中输入您获得的兑换码，确认兑换后，您将获得相应的奖励，且该记录会显示在下方列表中以便您的查阅。</p>
      </div>

      <div class="explain-top">
        <p class="explain-p">4.兑换码使用有什么条件？</p>
        <p>①每个兑换码只能兑换一次，多次兑换无效；</p>
        <p>②每个兑换码具有有效期，请您在有效期内兑换，过期后兑换无效。</p>
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
        title:'兑换区说明'
      }
    },
    components: {
      commonTitle
    },
    computed:{
    },
    mounted(){
      console.log(this.$route.query.wap)
    },
    methods:{
      getWap(){
        if(this.$route.query.wap){
          return true
        }else{
          return false
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .exchange-warpper{
    text-align: center;
    font-size: 1rem;
    margin-top: 2.5rem;
  }
  .exchange-explain{
    padding: 2rem;
    p{
      font-size: 1.02rem;
    }
    .explain-p{
      font-weight: bold;
    }
    .explain-top{
      margin-top: 1.3rem;
    }
  }


</style>
