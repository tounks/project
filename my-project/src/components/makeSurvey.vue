<template>
  <div class="make-survey">
    <div class="common-head">
      <i @click="back()"></i>
      <span>{{title}}</span>
    </div>
    <div class="surveyQs">
        <div v-for="(survey,index) in surveyList">
<!--           <transition name="bounce">
 -->            <div v-show="index+1 == ranking" class="questionidx">
              <div class="QStitle">{{index+1}}.{{survey.question}}</div>
              <div v-for="(sur,idx) in survey.options" @click="checked(survey.options,idx)" :class="sur.checked?'checked':'check'" class="cek">
                {{sur.opt}}.{{sur.content}}
              </div>
              <h5>{{index+1}}/{{surveyList.length}}</h5>
            </div>
<!--           </transition>
 -->        </div>
        <div class="protocol-button">
          <div class="button-line" >
            <span class="reject-span" v-show="ranking > 1"  @click="lastQS()">上一题</span>
          </div>
          <div class="button-line">
            <span class="agree-span" v-show="next()"  @click="nextQS()">下一题</span>
            <span class="agree-span" v-show="submit()" @click="submitSurvey()">提交评测</span>
          </div>
        </div>
    </div>
    <div class="termination-wrapper" v-show="terminDialog">
      <transition name="bounce">

      <div class="termination" v-show="terminDialog">
          <div class="termination-top">
            本次风险测评未完成，中断后将不保存当前进度，确定终止？
          </div>
          <div class="termination-bot">
            <div class="bot-left" @click="termin()">终止</div>
            <div class="bot-right" @click="goOn()">继续评测</div>
          </div>
      </div>
      </transition>

    </div>

  </div>
</template>
  
  
<script>
  
  export default {
    name: 'make-survey',
    data() {
      return {
        titleShow:true,
        title:'风险测评',
        surveyList:[],
        ranking:1,
        answerArr:[false,false,false,false,false,false,false,false,false,false],
        complete:false,
        terminDialog:false,
      };
    },
    components: {
    },
    computed: {
    },
    mounted(){
      this.getTheSurvey()
    },
    // beforeRouteEnter(to, from, next){
    //   if(from.name == 'riskResult'){
    //     next(vm => {
    //       console.log(from)
    //       // vm.$router.push({ name: 'littleGold'})
    //    })
    //   }else{
    //     next(vm => {
    //       vm.$router.push({ name: 'makeSurvey'})
    //    })
    //   }
    // },
    methods: {
      submit(){
        if( this.ranking == this.surveyList.length && this.answerArr[this.ranking-1] != false){
          return true
        }else{
          return false
        }
      },
      next(){
        if(this.answerArr[this.ranking-1] == false || this.ranking == this.surveyList.length){
          return false
        }else{
          return true
        }
      },
      goOn(){
        this.terminDialog = false
      },
      termin(){
        this.$router.push({ name: 'littleGold'})
      },
      getTheSurvey(){
          var vm = this
        this.axios.post('/risk_evaluation/get_questionnaire.dos',{
          'version':'1.0.0',
          'channel':3
        }).then(function(res){
            console.log(res.data.map)
            vm.surveyList = res.data.map.questionnaire
            _.each(vm.surveyList,function(val){
              _.each(val.options,function(value){
                vm.$set(value,'checked',false)
              })
            })
        }).catch(function(err){
           console.log(err)
        })
      },
      submitSurvey(){
          var vm = this
          _.each(this.answerArr,function(val){
            if(val == false){
              return
            }
          })

          var idstring = this.answerArr.join(",");
          this.axios.post('/risk_evaluation/submit.dos',{
            'version':'1.0.0',
            'channel':3,
            'uid':JSON.parse(localStorage.getItem("ngStorage-user")).member.uid,
            'token':JSON.parse(localStorage.getItem("ngStorage-user")).token,
            'idString':idstring,
          }).then(function(res){
             vm.complete = true
             vm.$router.push({ path: 'riskResult', query: { riskLevel: res.data.map.grade }})

          }).catch(function(err){

          })
      },
      checked(optVal,idx){
        var vm = this
        _.each(optVal,function(value,index){
          if(idx == index){
            vm.$set(value,'checked',true)
            vm.answerArr[vm.ranking-1] = value.id
            vm.nextQS()
            console.log(vm.answerArr)
          }else{
            vm.$set(value,'checked',false)
          }
        })
      },
      nextQS(){
        if(this.ranking < this.surveyList.length && this.answerArr[this.ranking-1]){
          this.ranking += 1
        }else{
          console.log(this.answerArr[this.ranking-1])
        }
      },
     lastQS(){
        this.ranking -= 1
     },
     back(){
        this.terminDialog = true
     },
    }
  };
</script>

<style lang="scss" scoped>
.make-survey{
  height: 100%;
  width: 100%;
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
    background-image: url(../assets/icon_left.png);
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
  .surveyQs{
    width: 100%;
    background: #f5f5f5;
    padding: 1rem;
    height: 100%;
    box-sizing: border-box;
      .questionidx{
        background: #fff;
        border-radius: 1rem;
        padding: 1.5rem;
        div.QStitle{
          height: 4rem;
          padding-top:2rem;
          font-size: 1.2rem;
        }
        .checked{
          background:url(../assets/checked.png) left center no-repeat;
          background-size:1rem;
        }
        .check{
          background:url(../assets/check.png) left center no-repeat;
          background-size:1rem;
        }
        div.cek{
          height: 3rem;
          padding-left:1.5rem;
          margin-left: 0.5rem;
          font-size: 1rem;
          padding-top:1.5rem;
        }
        h5{
          text-align: center;
          color: #cccccc;
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
  .bounce-enter-active {
  animation: bounce-in .5s;
  }
  .bounce-leave-active {
  animation: bounce-out .5s;
  }
  @keyframes bounce-in {
  0% {
  transform: scale(0);
  }
  50% {
  transform: scale(1.5);
  }
  100% {
  transform: scale(1);
  }
  }
  @keyframes bounce-out {
  0% {
  transform: scale(1);
  }
  50% {
  transform: scale(1.5);
  }
  100% {
  transform: scale(0);
  }
  }
  .termination-wrapper{
    position: fixed;
    overflow: auto;
    margin: 0;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .termination{
    position:fixed;
    top: 40%;
    left: 10%;
    width: 80%;
    background:#fff;
    border-radius:2rem;
    border:1px solid #ccc;
    .termination-top{
      height: 6rem;
      line-height: 3rem;
      padding: 2rem 1rem;
      border-bottom:1px solid #ccc;
      font-size: 1.2rem;
      text-align: center;
    }
    .termination-bot{
      display: flex;
      div{
        width: 50%;
        text-align: center;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.2rem;
      }
      .bot-left{
        color: #999999;
        border-right:1px solid #ccc;
      }
      .bot-right{
        color: #ff6937;
      }
    }

  }

</style>
