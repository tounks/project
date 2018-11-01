
<template>
  <div class="bornRecord-warpper">
    <div class="bornRecord">
      <div class="bornName">
        昵称:<input type="text" name="" placeholder="请输入机器人昵称" v-model="nickname" @blur="modName()" ref="input" maxlength="20">
        <span class="born-img"  @click="focusInput()">
          <img src="../../assets/mod.png">
        </span>
      </div>

      <!--星座背景图-->
      <div class="star-bg virgo"
           :class="{'白羊座':'Aries','处女座':'Virgo','金牛座':'Taurus','巨蟹座':'Cancer','摩羯座':'Capricornus','射手座':'Sagittarius','狮子座':'Leo',
           '双鱼座':'Pisces','双子座':'Gemini','水瓶座':'Aquarius','天枰座':'Libra','天蝎座':'Scorpio'}[constellation]">
      </div>

      <div class="xinzhuo">
        <div class="birthday">
          <span class="birthday-span"></span>
          <span>{{birthday}}</span>
        </div>
        <div class="xin">
          <span class="xin-span"></span>
          <span>{{constellation}}</span>
        </div>
      </div>
    </div>
    <div class="AI-intro">
      小元宝是聪明钱的人工智能机器人，目前拥有理财推荐，投资风险测评、口令红包等功能随着版本升级，小元宝机器人提供的交互功能会更加丰富，智能服务领域将更加全面。
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex'
  export default {

    data() {
      return {
        uid: "",
        user:{},
        birthday:"", //生日
        constellation:"", //星座
        nickname:"", //昵称
        starType: 1, //星座类型,1-白羊座,2-处女座,3-金牛座,4-巨蟹座,5-摩羯座,6-射手座,7-狮子座,8-双鱼座,9-双子座,10-水瓶座,11-天枰座,12-天蝎座
      }
    },
    components:{

    },
    mounted(){
      this.user = JSON.parse(localStorage.getItem('ngStorage-user'))
      this.uid = this.user.member.uid;
      this.getInfo();
    },
    methods:{
      //聚焦
      focusInput:function () {
        this.$refs.input.focus()
      },
      //获取信息
      getInfo:function () {
        let vm = this;
        this.axios.post('/pet/info.dos',{
          uid: this.uid,
          token: this.user.token
        }).then(function(response){
          if(response.data.success){
             console.log(response.data)
             vm.birthday = response.data.map.birthday;
             vm.constellation = response.data.map.constellation;
             vm.nickname = response.data.map.nickname;
          }else {

          }
        })
        .catch(function(error){

        });
      },
      //修改名称
      modName:function () {
        var vm = this
        if(this.nickname == ""){
          this.nickname ="小元宝";
        }
        this.axios.post('/pet/updateNickname.dos',{
          uid: this.uid,
          token: this.user.token,
          nickname: this.nickname
        }).then(function(response){
          if(response.data.success){
            vm.$parent.$parent.getTheName();
            vm.showDialog1(true);
            vm.netWorkError1('修改昵称成功');
          }else {

          }
        })
        .catch(function(error){

        });
      },
      ...mapActions({
        showDialog1: 'showDialog',
        netWorkError1: 'netWorkError'
      })
    }
  }
</script>
<style lang="scss" scoped>
  .bornRecord-warpper{
    text-align: center;
    font-size: 1rem;
    margin-top: 2.5rem;
  }
  .bornRecord{
    background: url("../../assets/bornbg.png") top center no-repeat;
    height: 12rem;
    width: 94%;
    display: inline-block;
    border-radius:2rem 2rem 0 0;
    text-align: center;
    font-size: 1.2rem;
    padding-top:2rem;
    box-sizing:border-box;
    position: relative;
    .star-bg{
      position: absolute;
      width: 16.8rem;
      height: 12rem;
      right:1%;
      top:2%;
      background: url("../../assets/constellation/Aries.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Aries{  //白羊座
      background: url("../../assets/constellation/Aries.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Virgo{  //处女座
      background: url("../../assets/constellation/Virgo.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Taurus{  //金牛座
      background: url("../../assets/constellation/Taurus.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Cancer{  //巨蟹座
      background: url("../../assets/constellation/Cancer.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Capricornus{  //摩羯座
      background: url("../../assets/constellation/Capricornus.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Sagittarius{  //射手座
      background: url("../../assets/constellation/Sagittarius.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Leo{  //狮子座
      background: url("../../assets/constellation/Leo.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Pisces{  //双鱼座
      background: url("../../assets/constellation/Pisces.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Gemini{  //双子座
      background: url("../../assets/constellation/Gemini.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Aquarius{  //水瓶座
      background: url("../../assets/constellation/Aquarius.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Libra{  //天枰座
      background: url("../../assets/constellation/Libra.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .star-bg.Scorpio{  //天蝎座
      background: url("../../assets/constellation/Scorpio.png") top center no-repeat;   //白羊座
      background-size: cover;
    }
    .bornName{
      height:3rem;
      width: 80%;
      border-radius:2rem;
      display: inline-block;
      line-height: 3rem;
      color: #fff;
      background: rgba(0,0,0,0.2) ;
    /*url("../../assets/mod.png") right 1rem center no-repeat*/
      background-size:1.5rem;
      position: relative;
      z-index: 1000;
      .born-img{
        position: absolute;
        top:53%;
        right: 6%;
        transform: translate(0%,-50%);
        -ms-transform:translate(0%,-50%); 	/* IE 9 */
        -moz-transform:translate(0%,-50%); 	/* Firefox */
        -webkit-transform:translate(0%,-50%); /* Safari 和 Chrome */
        -o-transform:translate(0%,-50%);
        img{
          width: 1.12rem;
        }
      }
    }
    input{
      background-color: rgba(0,0,0,0);
      color: #fff;
      height: 3rem;
      margin-left: 2rem;
      width: 50%;
      font-size: 1.2rem;
    }
    .xinzhuo{
      padding: 3.5rem 6rem 0 0;
      color: #fff;
      font-size: 1rem;
      .birthday{
        display: inline-block;
        .birthday-span{
          display: inline-block;
          background: url("../../assets/birthday.png") left center no-repeat;
          width: 1.6rem;
          height: 2rem;
          background-size: cover;
          vertical-align: bottom;
        }
      }
      .xin{
        display: inline-block;
        margin-left: 3rem;
        .xin-span{
          display: inline-block;
          background: url("../../assets/xinzhuo.png") left center no-repeat;
          width: 1.8rem;
          height: 1.6rem;
          background-size: cover;
          vertical-align: bottom;
        }
      }
    }
  }
  .AI-intro{
    height: 12rem;
    width: 94%;
    margin:0 auto;
    // display: inline-block;
    border-radius:0 0 2rem 2rem;
    font-size: 1.1rem;
    padding:2rem 1rem;
    box-sizing:border-box;
    background:#fff;
    text-align: left;
    color: #4d4d4d;
  }
</style>
