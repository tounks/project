<template>
  <div class="exchange-warpper">
    <div class="exchange-award">
      <p>成功兑换以下奖品 :</p>
      <div class="exchange-info">
        <div class="exchange-content" v-for="command in commandList">
          <div class="money">
            {{command.drMemberFavourable.amount}}<span>元</span>
          </div>
          <div style="margin-left: 7.8rem;">
            <p class="offline" style="width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{command.drMemberFavourable.name}}</p>
            <div class="inline"></div>
            <p class="inline-tip">单笔投资满{{command.drMemberFavourable.enableAmount}}元，投资期限≥{{command.drMemberFavourable.productDeadline}}天</p>
            <p class="inline-tip">（新手标/活动标除外）</p>
            <p class="inline-tip">有效期至:{{command.drMemberFavourable.expireDate|formatDate}}</p>
          </div>
        </div>
        <div class="award-button">
          <div class="award-display">
            <span class="hold" @click="goExchange()">继续兑奖</span>
          </div>
          <div class="award-display">
            <span class="look" @click="goEx()">查看奖品</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

  import {formatDate} from '../../js/date.js'

  export default {
    data() {
      return {
        command:'',
        commandList:[],
      }
    },
    components:{

    },
    filters:{
      formatDate(time) {
          var date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd')
      }
    },
    mounted(){
        // console.log(JSON.parse(localStorage.getItem("ngStorage-commend")))
        this.commandList = JSON.parse(localStorage.getItem("ngStorage-commend")).favourableList
    },
    methods:{
      goExchange(){
        this.$parent.$parent.dialogExchangeAward = false
        this.$parent.$parent.dialogExchange = true
      },
      goEx(){
        window.location.href = '/myCoupon'
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
  .exchange-award{
     background-color: white;
     width: 90%;
     margin: 0 auto;
     border-radius: 1rem;
     P{
       color: #ff6937;
       font-size: 1.3rem;
       padding: 0.5rem 0 2rem;
     }
     .exchange-info{
       .exchange-content{
         background: url("../../assets/coupon.png") top left 0.2rem no-repeat;
         background-size: 6.875rem 5.5rem;
         width: 96%;
         height: 5.5rem;
         margin: 0 auto;
         background-color: #eeeeee;
         position: relative;
         margin-bottom: 0.5rem;
         .money{
           position: absolute;
           font-size: 2rem;
           color: white;
           top:50%;
           left:8%;
           transform: translate(0%,-50%);
           -ms-transform:translate(0%,-50%); 	/* IE 9 */
           -moz-transform:translate(0%,-50%); 	/* Firefox */
           -webkit-transform:translate(0%,-50%); /* Safari 和 Chrome */
           -o-transform:translate(0%,-50%);
           span{
             font-size: 1rem;
           }
         }
         p{
           font-size: 1rem;
           line-height: 1rem;
           padding: 0;
           color: #4d4d4d;
           text-align: left;
         }
         .offline{
           width: 8rem;
           font-weight: bold;
           padding-top: 0.3rem;
         }
         .inline{
           border-bottom: 1px solid rgba(181, 181, 181, 1);
           width: 15rem;
           padding-top: 0.5rem;
         }
         .inline-tip{
           font-size: 0.8rem;
           color: #999999;
           line-height: 1.12rem;
           -webkit-transform: scale(0.9);
           margin-left: -0.7rem;
         }
       }
       .award-button{
         padding: 1rem 0 1.5rem;
         display: flex;
         .award-display{
           width: 50%;
           span{
             display: inline-block;
             height: 2.6rem;
             width: 8rem;
             line-height: 2.6rem;
             font-size: 1.2rem;
             border-radius: 2rem;
           }
           .hold{
             border: 1px solid #b5b5b5;
             color: #b5b5b5;
           }
           .look{
             background-color: #ff6937;
             color: white;
           }
         }
       }
     }
  }

</style>
